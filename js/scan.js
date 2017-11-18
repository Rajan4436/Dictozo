var elements = document.getElementsByTagName('p');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    // for (var j = 0; j < element.childNodes.length; j++) {
        // var node = element.childNodes[j];

        // if (node.nodeType === 3) {
          var text = element.innerHTML;
          console.log(element)
          var words = ["have", "the"];
          // regex = '/(\b)'+words[1]+'(\b)/gi';
          for (var k = words.length - 1; k >= 0; k--) {
            var regex = new RegExp('(\\b)'+words[k]+'(\\b)', 'ig');
            text = text.replace(regex, '<span class="dict-highlight">&nbsp;'+words[k]+'</span> <div class="dict-tooltip">  <span class="dict-tooltiptext">'+words[k]+'</span>  <img class="annotate-img" data-word="'+words[k]+'" src="https://image.prntscr.com/image/ZShyfCKFTKKmXouhbBQ2Zw.png"></div>'); 
					}

          if (element.innerHTML !== text) {
              element.innerHTML = text;
              console.log(text);
          }
        // }
    // }
}

