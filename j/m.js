(function(a){function e(c){var d=a.createElement("script");d.src=c;a.body.appendChild(d)}var f="//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&userip="+ip+"&q=";[].forEach.call(a.querySelectorAll("ul[data-u]"),function(c,d){var a="_"+d;window[a]=function(a){var b=[];a.responseData.feed.entries.forEach(function(a){img=/src="https?:(.*?)"/gi.exec(a.content);publishedDate=/^(.*?\d{4})/gi.exec(a.publishedDate);b.push("<li>");img&&img[1]&&!/feeds\.feedburner\.com/i.test(img[1])&&!/advertisement/i.test(img[1])?
b.push("<h3 style=\"background-image:url('",img[1],"');\">"):b.push("<h3>");b.push('<a href="',a.link,'" class=e>',a.title,'</a></h3><p><a href="',a.link,'" class=e>',a.contentSnippet,"</a><time>",publishedDate[1]?publishedDate[1]:"","</time></p></li>")});b.length&&(c.innerHTML=b.join(""))};e(f+encodeURIComponent(c.getAttribute("data-u"))+"&callback="+a)});e("j/modal.min.js");e("j/extra.min.js")})(document);