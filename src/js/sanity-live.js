(function () {
  'use strict';

  var PROJECT_ID = 'c7mgn6k7';
  var DATASET = 'production';
  var API_VER = '2024-01-01';

  // ── Preview mode detection ─────────────────────────────────────────────────
  var _params = new URLSearchParams(window.location.search);
  var IS_PREVIEW = _params.get('preview') === 'true';
  var PREVIEW_TOKEN = _params.get('token') || '';

  if (IS_PREVIEW) {
    document.addEventListener('DOMContentLoaded', function () {
      var banner = document.createElement('div');
      banner.id = 'preview-banner';
      banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;background:#FFC107;color:#121212;text-align:center;padding:6px 16px;font-size:13px;font-weight:700;letter-spacing:.5px;';
      banner.textContent = '⚠ PREVIEW MODE — Showing draft content, not published';
      document.body.prepend(banner);
      document.body.style.paddingTop = (parseInt(document.body.style.paddingTop || '0') + 34) + 'px';
    });
  }

  function sanityFetch(query) {
    // Use api.sanity.io (not CDN) for previewDrafts perspective
    var host = IS_PREVIEW
      ? 'https://' + PROJECT_ID + '.api.sanity.io'
      : 'https://' + PROJECT_ID + '.apicdn.sanity.io';
    var url = host + '/v' + API_VER + '/data/query/' + DATASET + '?query=' + encodeURIComponent(query);
    if (IS_PREVIEW) url += '&perspective=previewDrafts';

    var opts = {};
    if (IS_PREVIEW && PREVIEW_TOKEN) {
      opts.headers = { 'Authorization': 'Bearer ' + PREVIEW_TOKEN };
    }

    return fetch(url, opts)
      .then(function (r) { return r.json(); })
      .then(function (d) { return d.result; });
  }

  function reInitWow() {
    if (typeof WOW !== 'undefined') new WOW({ offset: 0 }).init();
  }

  // ── NEWS LISTING ────────────────────────────────────────────────────────────
  function formatDate(raw) {
    if (!raw) return '';
    var d = new Date(raw);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function initNews() {
    var grid = document.getElementById('sanity-news-grid');
    if (!grid) return;

    grid.innerHTML = '<div class="col-12 text-center py-5"><p style="color:#aaa">Loading articles...</p></div>';

    sanityFetch('*[_type == "article"] | order(date desc) { "slug": slug.current, title, date, "image": image.asset->url, excerpt, tags }')
      .then(function (articles) {
        if (!articles || !articles.length) {
          grid.innerHTML = '<div class="col-12 text-center py-5"><p style="color:#888">No articles published yet.</p></div>';
          return;
        }

        var html = '';

        // ── SECTION 1: Featured + Sidebar (articles 0–3) ─────────────────────
        var feat = articles[0];
        var featHref = '/news/article/?s=' + encodeURIComponent(feat.slug);
        var featTag  = (feat.tags && feat.tags[0]) ? feat.tags[0] : 'News';
        var featImg  = feat.image || '/images/post-1.jpg';
        var featDate = formatDate(feat.date);

        var sidebarHtml = articles.slice(1, 4).map(function (a) {
          var href = '/news/article/?s=' + encodeURIComponent(a.slug);
          var tag  = (a.tags && a.tags[0]) ? a.tags[0] : 'News';
          var img  = a.image || '/images/post-1.jpg';
          var date = formatDate(a.date);
          return '<article class="mag-sidebar-item">' +
            '<div class="mag-sidebar-body">' +
              '<span class="mag-tag mag-tag-sm">' + tag + '</span>' +
              '<h3 class="mag-sidebar-title"><a href="' + href + '">' + (a.title || 'Untitled') + '</a></h3>' +
              (a.excerpt ? '<p class="mag-sidebar-excerpt">' + a.excerpt + '</p>' : '') +
              (date ? '<span class="mag-sidebar-date"><i class="fa-regular fa-calendar"></i> ' + date + '</span>' : '') +
            '</div>' +
            '<a href="' + href + '" class="mag-sidebar-thumb">' +
              '<img src="' + img + '" alt="' + (a.title || '') + '" loading="lazy">' +
            '</a>' +
          '</article>';
        }).join('');

        html += '<div class="col-12">' +
          '<div class="row g-0 mag-top-row">' +
            '<div class="col-lg-7 mag-featured-col">' +
              '<article class="mag-featured">' +
                '<a href="' + featHref + '" class="mag-featured-img">' +
                  '<img src="' + featImg + '" alt="' + (feat.title || '') + '" loading="lazy">' +
                '</a>' +
                '<div class="mag-featured-body">' +
                  '<div class="mag-meta">' +
                    '<span class="mag-tag">' + featTag + '</span>' +
                    (featDate ? '<span class="mag-meta-date"><i class="fa-regular fa-calendar"></i> ' + featDate + '</span>' : '') +
                  '</div>' +
                  '<h2 class="mag-featured-title"><a href="' + featHref + '">' + (feat.title || 'Untitled') + '</a></h2>' +
                  (feat.excerpt ? '<p class="mag-excerpt">' + feat.excerpt + '</p>' : '') +
                  '<a href="' + featHref + '" class="mag-readmore">Read Article <i class="fa-solid fa-arrow-right"></i></a>' +
                '</div>' +
              '</article>' +
            '</div>' +
            '<div class="col-lg-5 mag-sidebar-col">' +
              '<div class="mag-sidebar">' + sidebarHtml + '</div>' +
            '</div>' +
          '</div>' +
        '</div>';

        // ── SECTION 2: Full-bleed overlay cards (articles 4–5) ───────────────
        var overlayItems = articles.slice(4, 6);
        if (overlayItems.length) {
          var overlayHtml = overlayItems.map(function (a) {
            var href = '/news/article/?s=' + encodeURIComponent(a.slug);
            var tag  = (a.tags && a.tags[0]) ? a.tags[0] : 'News';
            var img  = a.image || '/images/post-1.jpg';
            return '<div class="col-lg-6 col-md-6">' +
              '<article class="mag-overlay-card">' +
                '<a href="' + href + '" class="mag-overlay-img">' +
                  '<img src="' + img + '" alt="' + (a.title || '') + '" loading="lazy">' +
                '</a>' +
                '<div class="mag-overlay-body">' +
                  '<span class="mag-tag">' + tag + '</span>' +
                  '<h3 class="mag-overlay-title"><a href="' + href + '">' + (a.title || 'Untitled') + '</a></h3>' +
                  (a.excerpt ? '<p class="mag-overlay-excerpt">' + a.excerpt + '</p>' : '') +
                  '<a href="' + href + '" class="mag-readmore mag-readmore-sm">Read Article <i class="fa-solid fa-arrow-right"></i></a>' +
                '</div>' +
              '</article>' +
            '</div>';
          }).join('');
          html += '<div class="col-12">' +
            '<div class="row g-0 mag-overlay-row">' + overlayHtml + '</div>' +
          '</div>';
        }

        // ── SECTION 3: Latest Articles 4-col grid (articles 6+) ──────────────
        var latestItems = articles.slice(6);
        if (latestItems.length) {
          var latestHtml = latestItems.map(function (a) {
            var href = '/news/article/?s=' + encodeURIComponent(a.slug);
            var tag  = (a.tags && a.tags[0]) ? a.tags[0] : 'News';
            var img  = a.image || '/images/post-1.jpg';
            var date = formatDate(a.date);
            return '<div class="col-lg-3 col-md-6 col-6">' +
              '<article class="mag-latest-item">' +
                '<a href="' + href + '" class="mag-latest-img">' +
                  '<img src="' + img + '" alt="' + (a.title || '') + '" loading="lazy">' +
                '</a>' +
                '<div class="mag-latest-body">' +
                  '<span class="mag-tag mag-tag-sm">' + tag + '</span>' +
                  '<h4 class="mag-latest-title"><a href="' + href + '">' + (a.title || 'Untitled') + '</a></h4>' +
                  (date ? '<span class="mag-latest-date"><i class="fa-regular fa-calendar"></i> ' + date + '</span>' : '') +
                '</div>' +
              '</article>' +
            '</div>';
          }).join('');
          html += '<div class="col-12 mag-latest-section">' +
            '<div class="mag-latest-header"><h2>Latest Articles</h2><div class="mag-latest-line"></div></div>' +
            '<div class="row g-4 mag-latest-row">' + latestHtml + '</div>' +
          '</div>';
        }

        grid.innerHTML = html;
        reInitWow();
      })
      .catch(function () {
        grid.innerHTML = '<div class="col-12 text-center py-5"><p style="color:#888">Could not load articles.</p></div>';
      });
  }

  // ── NEWS ARTICLE (single, client-side) ─────────────────────────────────────
  function initNewsArticle() {
    var container = document.getElementById('sanity-article');
    if (!container) return;

    var slug = new URLSearchParams(window.location.search).get('s');
    if (!slug) {
      container.innerHTML = '<p style="text-align:center;padding:60px 0;color:#888">Article not found.</p>';
      return;
    }

    container.innerHTML = '<div style="text-align:center;padding:80px 0"><p style="color:#aaa">Loading article...</p></div>';

    sanityFetch('*[_type == "article" && slug.current == "' + slug.replace(/"/g, '') + '"][0] { title, date, "image": image.asset->url, excerpt, tags, body }')
      .then(function (article) {
        if (!article) {
          container.innerHTML = '<p style="text-align:center;padding:60px 0;color:#888">Article not found.</p>';
          return;
        }

        document.title = (article.title || 'Article') + ' | Bagani Oil';

        var bodyHtml = '';
        if (article.body && Array.isArray(article.body)) {
          bodyHtml = article.body.map(function (block) {
            if (block._type !== 'block' || !block.children) return '';
            var text = block.children.map(function (c) {
              var t = (c.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
              if (c.marks && c.marks.indexOf('strong') > -1) t = '<strong>' + t + '</strong>';
              if (c.marks && c.marks.indexOf('em') > -1) t = '<em>' + t + '</em>';
              return t;
            }).join('');
            switch (block.style) {
              case 'h1': return '<h1>' + text + '</h1>';
              case 'h2': return '<h2>' + text + '</h2>';
              case 'h3': return '<h3>' + text + '</h3>';
              case 'blockquote': return '<blockquote><p>' + text + '</p></blockquote>';
              default: return text ? '<p class="wow fadeInUp">' + text + '</p>' : '';
            }
          }).join('');
        }

        var tagsHtml = '';
        if (article.tags && article.tags.length) {
          tagsHtml = '<div class="post-tag-links"><div class="post-tags wow fadeInUp"><span class="tag-links">Tags: ' +
            article.tags.map(function (t) { return '<a href="#">' + t + '</a>'; }).join('') +
            '</span></div></div>';
        }

        container.innerHTML =
          (article.image ? '<div class="post-image"><figure><img src="' + article.image + '" alt="' + (article.title || '') + '" style="width:100%;border-radius:12px"></figure></div>' : '') +
          '<div class="post-content"><div class="post-entry">' +
            '<h1 class="wow fadeInUp">' + (article.title || '') + '</h1>' +
            (article.date ? '<p class="post-date wow fadeInUp">' + article.date + '</p>' : '') +
            (article.excerpt ? '<p class="wow fadeInUp"><strong>' + article.excerpt + '</strong></p>' : '') +
            bodyHtml +
          '</div>' + tagsHtml + '</div>';

        reInitWow();
      })
      .catch(function () {
        container.innerHTML = '<p style="text-align:center;padding:60px 0;color:#888">Could not load article.</p>';
      });
  }

  // ── PRODUCTS ───────────────────────────────────────────────────────────────
  function initProducts() {
    var grid = document.querySelector('.project-item-boxes');
    if (!grid) return;

    sanityFetch('*[_type == "product"] | order(line asc, name asc) { "slug": slug.current, name, line, category, spec, shortDesc, "image": image.asset->url }')
      .then(function (products) {
        if (!products || !products.length) return;

        grid.innerHTML = products.map(function (p) {
          return '<div class="col-lg-4 col-md-6 project-item-box ' + (p.category || '') + '">' +
            '<div class="product-card">' +
              '<div class="product-image"><a href="/products/' + p.slug + '/">' +
                '<img src="' + (p.image || '') + '" alt="Bagani ' + p.name + '">' +
              '</a></div>' +
              '<div class="product-body">' +
                '<span class="product-line">' + (p.line || '') + '</span>' +
                '<h3>' + p.name + '</h3>' +
                '<p class="product-spec">' + (p.spec || '') + '</p>' +
                '<p class="product-desc">' + (p.shortDesc || '') + '</p>' +
              '</div>' +
              '<div class="product-footer">' +
                '<a href="/products/' + p.slug + '/">View Details <i class="fa-solid fa-arrow-right"></i></a>' +
              '</div>' +
            '</div></div>';
        }).join('');

        if (typeof $ !== 'undefined' && $.fn && $.fn.isotope) {
          var $g = $(grid).isotope({ itemSelector: '.project-item-box', layoutMode: 'fitRows' });
          // Relayout after each image loads so card heights are correct
          $(grid).find('img').each(function () {
            var img = this;
            if (img.complete) {
              $g.isotope('layout');
            } else {
              img.addEventListener('load', function () { $g.isotope('layout'); });
              img.addEventListener('error', function () { $g.isotope('layout'); });
            }
          });
          $('.product-categories ul li a').off('click.sanity').on('click.sanity', function (e) {
            e.preventDefault();
            $g.isotope({ filter: $(this).attr('data-filter') });
            $('.product-categories ul li a').removeClass('active-btn');
            $(this).addClass('active-btn');
          });
        }
      });
  }

  // ── FAQs ───────────────────────────────────────────────────────────────────
  function initFaqs() {
    var acc1 = document.getElementById('faqaccordion1');
    var acc2 = document.getElementById('faqaccordion2');
    if (!acc1 && !acc2) return;

    sanityFetch('*[_type == "faq"] | order(order asc) { question, answer, category }')
      .then(function (faqs) {
        if (!faqs) return;

        var general = faqs.filter(function (f) { return f.category === 'general'; });
        var other = faqs.filter(function (f) { return f.category === 'product' || f.category === 'dealer'; });

        function buildAccordion(items, prefix, parentId) {
          if (!items.length) return '<p style="color:#888;padding:20px 0">No questions yet.</p>';
          return items.map(function (f, i) {
            return '<div class="accordion-item wow fadeInUp"' + (i > 0 ? ' data-wow-delay="' + (i * 0.2) + 's"' : '') + '>' +
              '<h2 class="accordion-header" id="heading' + prefix + (i + 1) + '">' +
                '<button class="accordion-button ' + (i > 0 ? 'collapsed' : '') + '" type="button" ' +
                  'data-bs-toggle="collapse" data-bs-target="#collapse' + prefix + (i + 1) + '" ' +
                  'aria-expanded="' + (i === 0 ? 'true' : 'false') + '">' +
                  f.question +
                '</button></h2>' +
              '<div id="collapse' + prefix + (i + 1) + '" class="accordion-collapse collapse ' + (i === 0 ? 'show' : '') + '" ' +
                'data-bs-parent="#' + parentId + '">' +
                '<div class="accordion-body"><p>' + f.answer + '</p></div>' +
              '</div></div>';
          }).join('');
        }

        if (acc1) acc1.innerHTML = buildAccordion(general, 'G', 'faqaccordion1');
        if (acc2) acc2.innerHTML = buildAccordion(other, 'P', 'faqaccordion2');
        reInitWow();
      });
  }

  // ── STORES ─────────────────────────────────────────────────────────────────
  function initStores() {
    if (!document.getElementById('store-map')) return;

    sanityFetch('*[_type == "store"] | order(city asc) { "slug": slug.current, name, address, city, phone, lat, lng }')
      .then(function (stores) {
        if (!stores || !stores.length) return;

        var label = document.querySelector('.section-label');
        if (label) label.textContent = stores.length + ' Stores Found';

        var tbody = document.querySelector('.product-specs-table tbody');
        if (tbody) {
          tbody.innerHTML = stores.map(function (s) {
            return '<tr>' +
              '<td><strong>' + s.name + '</strong></td>' +
              '<td>' + (s.address || '') + '</td>' +
              '<td>' + (s.city || '') + '</td>' +
              '<td style="white-space:nowrap">' + (s.phone ? '<a href="tel:' + s.phone + '">' + s.phone + '</a>' : '—') + '</td>' +
            '</tr>';
          }).join('');
        }

        // Refresh map markers if exposed globally
        if (typeof window.baganiRefreshMap === 'function') {
          window.baganiRefreshMap(stores);
        }
      });
  }

  // ── DISPATCH ───────────────────────────────────────────────────────────────
  var page = document.body.getAttribute('data-page');
  if (page === 'news') initNews();
  else if (page === 'news-article') initNewsArticle();
  else if (page === 'products') initProducts();
  else if (page === 'faqs') initFaqs();
  else if (page === 'stores') initStores();

})();
