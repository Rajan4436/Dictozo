// var para = document.getElementsByTagName('p')[0].innerHTML;

var elements = document.getElementsByTagName('p');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
          var text = node.nodeValue;
					var words = ["information", "their"];
					for (var i = words.length - 1; i >= 0; i--) {
						var regex = new RegExp('('+words[i]+')', 'ig');
						replacedText = text.replace(regex, ' <span class="highlight">&nbsp;'+words[i]+'</span> <img class="annotate-img"  src="https://image.prntscr.com/image/ZShyfCKFTKKmXouhbBQ2Zw.png">'); 
					}

          if (replacedText !== text) {
              element.innerHTML = replacedText;
          }
        }
    }
}

// document.getElementsByTagName('body')[0].innerHTML = position;


