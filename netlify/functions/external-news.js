const OIL_KEYWORDS = [
  'oil', 'petroleum', 'petron', 'shell', 'caltex', 'seaoil', 'jetti', 'phoenix',
  'fuel', 'gasoline', 'diesel', 'lubricant', 'crude', 'kerosene', 'lng', 'lpg',
  'department of energy', 'doe energy', 'fuel price', 'oil price', 'pump price'
];

const SOURCES = [
  { url: 'https://data.gmanews.tv/gno/rss/news/feed.xml', source: 'GMA News' },
  { url: 'https://www.philstar.com/rss/headlines', source: 'Philstar' },
  { url: 'https://www.philstar.com/rss/business', source: 'Philstar Business' }
];

function absolutizeUrl(rawUrl, baseUrl) {
  if (!rawUrl) return '';
  var cleaned = decodeEntities(String(rawUrl)).trim();
  if (!cleaned) return '';

  if (cleaned.startsWith('//')) {
    return 'https:' + cleaned;
  }

  try {
    return new URL(cleaned, baseUrl || undefined).toString();
  } catch {
    return '';
  }
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#160;/g, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&ldquo;/gi, '\u201C')
    .replace(/&rdquo;/gi, '\u201D')
    .replace(/&lsquo;/gi, '\u2018')
    .replace(/&rsquo;/gi, '\u2019')
    .replace(/&mdash;/gi, '\u2014')
    .replace(/&ndash;/gi, '\u2013')
    .replace(/&hellip;/gi, '\u2026')
    .replace(/&trade;/gi, '\u2122')
    .replace(/&reg;/gi, '\u00AE')
    .replace(/&copy;/gi, '\u00A9')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function stripHtml(input) {
  return decodeEntities((input || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function stripHtmlKeepBreaks(input) {
  return decodeEntities(
    (input || '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6|tr)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

const EXTERNAL_EXCERPT_MAX_CHARS = 520;

function createNewsSummary(input, maxChars = 260) {
  const text = stripHtml(input || '');
  if (!text) return '';
  const minSentenceLen = Math.floor(maxChars * 0.55);
  const hasTerminalPunctuation = /[.!?]["')\]]?$/.test(text);

  if (text.length <= maxChars) {
    if (hasTerminalPunctuation) return text;

    const shortSentenceCut = text.lastIndexOf('. ');
    if (shortSentenceCut >= Math.floor(text.length * 0.45)) {
      return text.slice(0, shortSentenceCut + 1).trim();
    }

    const shortWordCut = text.lastIndexOf(' ');
    if (shortWordCut > 40) {
      return text.slice(0, shortWordCut).trim().replace(/[,:;\-]+$/, '') + '...';
    }
    return text;
  }

  let sentenceCut = -1;
  for (let i = minSentenceLen; i < Math.min(text.length, maxChars + 40); i++) {
    const ch = text[i];
    if ((ch === '.' || ch === '!' || ch === '?') && (i === text.length - 1 || text[i + 1] === ' ')) {
      sentenceCut = i + 1;
    }
  }

  if (sentenceCut > 0) {
    return text.slice(0, sentenceCut).trim();
  }

  let wordCut = text.lastIndexOf(' ', maxChars);
  if (wordCut < minSentenceLen) wordCut = maxChars;
  return text.slice(0, wordCut).trim().replace(/[,:;\-]+$/, '') + '...';
}

function extractArticleParagraphSummary(html, maxChars = 380) {
  if (!html) return '';

  var cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');

  var paragraphs = [];
  var pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  var match;

  while ((match = pRegex.exec(cleaned)) !== null) {
    var text = stripHtmlKeepBreaks(match[1]);
    if (!text) continue;

    var lower = text.toLowerCase();
    if (lower.indexOf('copyright') > -1 || lower.indexOf('all rights reserved') > -1 || lower.indexOf('advertisement') > -1) {
      continue;
    }

    if (text.length >= 60) paragraphs.push(text);
    if (paragraphs.length >= 3) break;
  }

  if (!paragraphs.length) return '';

  var joined = paragraphs.join(' ');
  if (joined.length > maxChars) joined = joined.slice(0, maxChars);
  return joined.trim();
}

function extractTag(block, tag) {
  const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'));
  if (cdata) return cdata[1].trim();

  const normal = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return normal ? normal[1].trim() : '';
}

function extractImageFromBlock(block, descriptionRaw) {
  var match;

  // Common RSS image tags that keep URL in attributes.
  match = block.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (match) return match[1];

  match = block.match(/<media:thumbnail[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (match) return match[1];

  match = block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image\//i);
  if (match) return match[1];

  // Fallback to embedded image inside description HTML.
  match = (descriptionRaw || '').match(/<img[^>]+(?:src|data-src|data-original)=["']([^"']+)["']/i);
  if (match) return match[1];

  // Some feeds place media URL in <content:encoded>.
  var encoded = extractTag(block, 'content:encoded');
  match = (encoded || '').match(/<img[^>]+(?:src|data-src|data-original)=["']([^"']+)["']/i);
  if (match) return match[1];

  return '';
}

function parseRssItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = stripHtml(extractTag(block, 'title'));
    const link = stripHtml(extractTag(block, 'link'));
    const guid = stripHtml(extractTag(block, 'guid'));
    const descriptionRaw = extractTag(block, 'description');
    const pubDate = stripHtml(extractTag(block, 'pubDate') || extractTag(block, 'dc:date'));

    const description = stripHtmlKeepBreaks(descriptionRaw);
    const imageRaw = extractImageFromBlock(block, descriptionRaw);
    const url = link || (guid.startsWith('http') ? guid : '');
    const image = absolutizeUrl(imageRaw, url);

    if (url && title) {
      items.push({ title, url, description, image, pubDate });
    }
  }

  return items;
}

function isOilRelated(item) {
  const text = `${item.title} ${item.description}`.toLowerCase();
  return OIL_KEYWORDS.some((kw) => text.includes(kw));
}

function normalizeYoutubeEmbed(url) {
  if (!url) return null;
  const idMatch = url.match(/(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/i);
  if (!idMatch || !idMatch[1]) return null;
  return `https://www.youtube.com/embed/${idMatch[1]}?rel=0`;
}

async function fetchArticleMedia(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
    });

    if (!response.ok) return { image: null, videoEmbed: null };

    const html = await response.text();

    const youtubeMatch = html.match(/(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/i);
    if (youtubeMatch && youtubeMatch[1]) {
      return {
        image: `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`,
        videoEmbed: `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0`,
      };
    }

    // Parse generic OpenGraph/Twitter media tags.
    const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    const ogImageSecure = html.match(/<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image:secure_url["']/i);
    const ogVideo = html.match(/<meta[^>]+property=["']og:video(?::url)?["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:video(?::url)?["']/i);
    const twImage = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
    const itemPropImage = html.match(/<meta[^>]+itemprop=["']image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+itemprop=["']image["']/i);
    const linkImage = html.match(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i)
      || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']image_src["']/i);
    const ogDescription = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i);
    const twDescription = html.match(/<meta[^>]+name=["']twitter:description["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:description["']/i);
    const metaDescription = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);

    const embed = normalizeYoutubeEmbed(ogVideo && ogVideo[1] ? ogVideo[1] : null);
    const bestDescription = stripHtmlKeepBreaks(
      (ogDescription && ogDescription[1])
      || (twDescription && twDescription[1])
      || (metaDescription && metaDescription[1])
      || ''
    );
    const paragraphSummary = extractArticleParagraphSummary(html);

    const resolvedImage = absolutizeUrl(
      (ogImage && ogImage[1])
      || (ogImageSecure && ogImageSecure[1])
      || (twImage && twImage[1])
      || (itemPropImage && itemPropImage[1])
      || (linkImage && linkImage[1])
      || '',
      url
    );

    return {
      image: resolvedImage || null,
      videoEmbed: embed,
      description: paragraphSummary || bestDescription || null,
    };
  } catch {
    return { image: null, videoEmbed: null, description: null };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRssWithRetry(url, attempts = 2) {
  let lastResult = null;
  for (let i = 0; i < attempts; i++) {
    const timeoutMs = 15000 + (i * 5000);
    lastResult = await fetchWithTimeout(url, timeoutMs);
    if (lastResult) return lastResult;

    if (i < attempts - 1) {
      const backoffMs = 600 + (i * 600);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
    }
  }
  return lastResult;
}

exports.handler = async function handler() {
  const all = [];

  const rssResults = await Promise.allSettled(
    SOURCES.map(async (source) => {
      const xml = await fetchRssWithRetry(source.url, 2);
      if (!xml) return [];

      return parseRssItems(xml)
        .filter(isOilRelated)
        .map((item) => ({
          slug: null,
          title: item.title,
          date: item.pubDate ? new Date(item.pubDate).toISOString() : null,
          image: item.image || null,
          videoEmbed: null,
          excerpt: createNewsSummary(item.description || '', EXTERNAL_EXCERPT_MAX_CHARS),
          tags: ['Oil & Gas'],
          isExternal: true,
          url: item.url,
          source: source.source,
        }));
    })
  );

  for (const result of rssResults) {
    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
      all.push(...result.value);
    }
  }

  all.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  const seen = new Set();
  const deduped = all.filter((item) => {
    const key = `${item.title}|${item.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 24);

  // Enrich entries with actual article media so the UI can show playable videos in modal.
  await Promise.all(deduped.map(async (item) => {
    if (!item.url) return;
    const media = await fetchArticleMedia(item.url);
    if (media.videoEmbed) item.videoEmbed = media.videoEmbed;
    if (media.image) item.image = media.image;
    const summarySource = media.description || item.excerpt || '';
    item.excerpt = createNewsSummary(summarySource, EXTERNAL_EXCERPT_MAX_CHARS);
  }));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600'
    },
    body: JSON.stringify({
      refreshedAt: new Date().toISOString(),
      count: deduped.length,
      items: deduped,
    }),
  };
};
