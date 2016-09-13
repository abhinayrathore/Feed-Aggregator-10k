(function (D) {
  var base = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&userip='+ip+'&q=',
    dataAttribute = 'data-u';

  [].forEach.call(D.querySelectorAll("ul[" + dataAttribute + ']'), function(ul, index) {
    var callback = '_' + index;

    window[callback] = function(json){
      var html = [];

      json.responseData.feed.entries.forEach(function(entry){
        var imgRegex = /src="(.*?)"/gi;
          img = imgRegex.exec(entry.content),
          publishedDate = /^(.*?\d{4})/gi.exec(entry.publishedDate);

        html.push('<li>');

        if(img && img[1] && !/feeds\.feedburner\.com/i.test(img[1]) && !/advertisement/i.test(img[1])) {
          html.push('<h3 style="background-image:url(\'', img[1], '\');">');
        } else {
          html.push('<h3>');
        }

        html.push('<a href="', entry.link, '" class=e>', entry.title, '</a></h3><p><a href="', entry.link, '" class=e>', entry.contentSnippet, '</a><time>', publishedDate[1] ? publishedDate[1] : '' , '</time></p></li>');
      });

      if (html.length) {
        ul.innerHTML = html.join('');
      }
    }

    addScript(base + encodeURIComponent(ul.getAttribute(dataAttribute)) + '&callback=' + callback);
  });

  addScript('j/modal.min.js');
  addScript('j/extra.min.js');

  function addScript(src) {
    var script = D.createElement('script');
    script.src = src;
    D.body.appendChild(script);
  }
})(document);