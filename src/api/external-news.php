<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=1800'); // 30 min cache

$feeds = [
  'https://data.gmanews.tv/gno/rss/news/feed.xml',
  'https://www.philstar.com/rss/headlines',
  'https://www.philstar.com/rss/business'
];

$keywords = ['oil', 'fuel', 'petroleum', 'lubricant', 'diesel', 'gasoline', 'energy', 'motor'];
$articles = [];

foreach ($feeds as $feedUrl) {
  $ctx = stream_context_create(['http' => ['timeout' => 5]]);
  $xml = @simplexml_load_file($feedUrl, 'SimpleXMLElement', 0, null, false);
  if (!$xml) continue;

  $items = isset($xml->channel->item) ? $xml->channel->item : [];
  foreach ($items as $item) {
    $title = (string)($item->title ?? '');
    $desc  = strip_tags((string)($item->description ?? ''));
    $link  = (string)($item->link ?? '');
    $date  = (string)($item->pubDate ?? '');

    $matched = false;
    foreach ($keywords as $kw) {
      if (stripos($title, $kw) !== false || stripos($desc, $kw) !== false) {
        $matched = true;
        break;
      }
    }
    if ($matched && $link) {
      $articles[] = [
        'title'       => $title,
        'link'        => $link,
        'pubDate'     => $date,
        'description' => mb_substr($desc, 0, 200),
        'source'      => parse_url($feedUrl, PHP_URL_HOST)
      ];
    }
  }
}

usort($articles, function($a, $b) {
  return strtotime($b['pubDate']) - strtotime($a['pubDate']);
});

echo json_encode(['items' => array_slice($articles, 0, 20)]);
