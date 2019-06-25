var $ = this.$, document = this.document, console = this.console, alert = this.alert, data = this.data;
function search() {
    "use strict";
    var search_word = $('#search_words').val(),
        wiki_url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + search_word + "&format=json&callback=?",
        i = 0,
        tagName,
        title,
        content,
        link,
        vDiv,
        vNode,
        container = document.getElementById('search-result'),
        arrDiv = [];

    $.ajax({
        type: "GET",
        url: wiki_url,
        async: false,
        dataType: "json",
        data: data,
        success: function (data) {
            vNode = document.getElementById("search-result");
            while (vNode.firstChild) {
              vNode.removeChild(vNode.firstChild);
            }
            for (i = 0; i <= data[1].length - 1; i++) {
                tagName = i;
                vDiv = document.createElement('div');
                vDiv.setAttribute('id', tagName);
                vDiv.setAttribute('class', 'container-fluid search_panel');
                title = '<h3><a href="' + data[3][i] + '" target="_blank">' + data[1][i] + '</a></h3>' ;
                content = data[2][i];
                link = '<h4><a href="' + data[3][i] + '" target="_blank">' + data[3][i] + '</a></h4>';
                vDiv.innerHTML = title + '<br>' + content + '<br>' + link;
                arrDiv[i] = vDiv;
                container.appendChild(arrDiv[i]);
            }
        }
    });
}
function random_article() {
    "use strict";
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}
function pressed(e){
  if(e.which === 13 || e.keyCode === 13){
    search();
  }
}
$(document).ready(function () {
    "use strict";
    $('#random').on('click', random_article);
    $('#search').on('click', search);
    $('#search_words').on('keypress', pressed);
});
