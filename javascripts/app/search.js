!function(t){"use strict";function e(){$("h1, h2").each(function(){var t=$(this),e=t.nextUntil("h1, h2");u.add({id:t.prop("id"),title:t.text(),body:e.text()})})}function i(){r=$(".content"),a=$(".dark-box"),h=$(".search-results"),$("#input-search").on("keyup",n)}function n(t){if(s(),h.addClass("visible"),27===t.keyCode&&(this.value=""),this.value){var e=u.search(this.value).filter(function(t){return t.score>1e-4});e.length?(h.empty(),$.each(e,function(t,e){var i=document.getElementById(e.ref);h.append("<li><a href='#"+e.ref+"'>"+$(i).text()+"</a></li>")}),o.call(this)):(h.html("<li></li>"),$(".search-results li").text('No Results Found for "'+this.value+'"'))}else s(),h.removeClass("visible")}function o(){this.value&&r.highlight(this.value,l)}function s(){r.unhighlight(l)}var r,a,h,l=($(t),{element:"span",className:"search-highlight"}),u=new lunr.Index;u.ref("id"),u.field("title",{boost:10}),u.field("body"),u.pipeline.add(lunr.trimmer,lunr.stopWordFilter),$(e),$(i)}(window);