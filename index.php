<?
require_once('blogs.php');

$defaultCategory = 'Dev';
$category = $defaultCategory;

// Get category from URL parameter
if (isset($_REQUEST['c']) && !empty($_REQUEST['c'])) {
	$category = $_REQUEST['c'];
}

// Get list of all available categories
$categories = array_keys($BLOGS);

// If not a valid category, set it to default
if (!in_array($category, $categories)) {
	$category = $defaultCategory;
}

// Get the list of blogs based on category key
$blogs = $BLOGS[$category];

// Initial blog items limit to be rendered by the server
$initialLimit = 10;

// Base URL path to Google api server
$baseUrl = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=${initialLimit}&q=";

// Cache time limit
$cacheTime = 60*60*1; // 1hr

// Get blog feed HTML from cache or by calling Google api
function getBlogFeedHtml($site, $url) {
	global $baseUrl;
	global $cacheTime;
	
	$cache = "cache/${site}.html";
	$html = '';

	if (file_exists($cache) && time() - filemtime($cache) <= $cacheTime) {
		$html = @file_get_contents($cache);
	} else {
		$googleApiUrl = $baseUrl . rawurlencode($url);
		$feedData = @file_get_contents($googleApiUrl);
		$jsonFeed = json_decode($feedData);
	
		$html .= "<div class=f><h2>${site}</h2>";
		$html .= "<ul data-u=\"${url}\">";
		foreach ($jsonFeed->responseData->feed->entries as $entry) {
			$title = trim($entry->title);
			$content = trim(str_replace("\n", '', $entry->contentSnippet));
			if ($title != '') {
				$html .= "<li><h3><a href=\"". $entry->link ."\">${title}</a></h3><p>". $content ."</p></li>";
			}
		}
		$html .= '</ul></div>';
		@file_put_contents($cache, $html);
	}
	
	return $html;
}
?><!doctype html><html><head><title>Feed Aggregator</title><link rel="stylesheet" href="c/m.css"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><?
echo "<nav><ul>";
foreach ($categories as $c) {
	if ($c == $category) { // if current category, don't provide the link
		echo "<li>${c}</li>";
	} else {
		echo "<li><a href=\"?c=" . $c . "\">" . $c . "</a></li>";
	}
}
echo "</ul></nav>";

echo "<h1><span>${category} Blogs</span></h1>";

echo "<main>";
foreach ($blogs as $site => $url) {
	echo getBlogFeedHtml($site, $url);
	flush();
}
echo "</main>";
?><script>ip='<?=$_SERVER['REMOTE_ADDR'];?>';</script><script src="j/m.js"></script></body></html>
