/* Create a context-menu */
chrome.contextMenus.create({
    id: "myContextMenu",   // <-- mandatory with event-pages
    title: "Search %s",
    contexts:["selection"]
});


/* Register a listener for the `onClicked` event */
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (tab) {

  	var code = [
    	  'var d = document.createElement("div");',
				'd.setAttribute("class","dict-load");',
        'd.setAttribute("style", "'
            + 'background-color: #008b8b;'
            + 'box-shadow: 1px 2px 15px 3px rgba(0,0,0, 0.7);'
            + 'width: 250px;'
						+	'font-size: 14px;'
            + 'padding: 15px;'
            + 'border-radius: 3px;'
            + 'position: fixed;'
          	+ 'box-sizing: border-box !important;'
            + 'top: 50px;'
            + 'color: #fff;'
            + 'right: 50px;'
            + 'z-index: 999999;'
            + '");',
      'var t = document.createTextNode("Loading...");',
      'd.appendChild(t);',
      'document.body.appendChild(d);'
 	  ].join("\n");

    chrome.tabs.executeScript(tab.id, { code: code });

		$.ajax({
		  type: "POST",
		  url: "http://sarcnitj.com/Server%20Side/entries.php",
		  data: { 
		    link: info.selectionText
		  },
		  success: function(msg){
		  	if (msg == 0) {
		  		var code = [
		  	  		'document.querySelectorAll(".dict-floating-card, .dict-load").forEach(function(ele) { ele.style.display = "none"; });',

							// Close Button
			    	  'var span = document.createElement("span");',
      				'var x = document.createTextNode("X");',
							'span.setAttribute("class","dict-close");',
			    	  'span.setAttribute("style", "'
			            + 'background-color: #008b8b !important;'
			          	+ 'border-radius: 100% !important;'
			          	+ 'height: 35px !important;'
			          	+ 'box-sizing: border-box !important;'
			          	+	'text-align: center !important;'
								  + 'line-height: 25px !important;'
								  + 'cursor: pointer !important;'
			          	+ 'width: 35px !important;'
			          	+ 'padding: 5px !important;'
			          	+	'top: 5px; !important'
			          	+ 'font-size: 18px !important;'
			          	+ 'border: 1px solid #fff !important;'
			            + 'right: 20px !important;'
			            + 'float: right !important;'
			            + '");',
      				'span.appendChild(x);',
			      
			    	  // Floating Div containing result
			    	  'var d = document.createElement("div");',
							'd.setAttribute("class","dict-floating-card");',
			        'd.setAttribute("style", "'
			            + 'background-color: #008b8b !important;'
			            + 'box-shadow: 1px 2px 15px 3px rgba(0,0,0, 0.7) !important;'
			          	+ 'box-sizing: border-box !important;'
		              + 'width: 300px !important;'
    							+	'font-size: 14px !important;'
			            + 'padding: 15px; '
			            + 'border-radius: 3px !important;'
			            + 'position: fixed !important;'
			            + 'top: 50px !important;'
			            + 'color: #fff !important;'
			            + 'right: 50px !important;'
			            + 'z-index: 999999 !important;'
			            + '");',
			      'var t = document.createTextNode("Definition Not Found.. Try Searching from app");',
		        'd.appendChild(span);',
		        'd.appendChild(t);',
		        'document.body.appendChild(d);',

		        'document.querySelectorAll(".dict-close").forEach( function(el){ el.addEventListener("click", function() { this.parentNode.style.display = "none"; }); });',

		        'setTimeout(function(){ document.getElementsByClassName ("dict-floating-card")[0].style.display = "none"; }, 5000);'
		   	  ].join("\n");

			  }else{
			    var code = [
		  	  		'document.querySelectorAll(".dict-floating-card, .dict-load").forEach(function(ele) { ele.style.display = "none"; });',

							// Close Button
			    	  'var span = document.createElement("span");',
      				'var x = document.createTextNode("X");',
							'span.setAttribute("class","dict-close");',
			    	  'span.setAttribute("style", "'
			            + 'background-color: #008b8b !important;'
			          	+ 'border-radius: 100% !important;'
			          	+ 'height: 35px !important;'
			          	+ 'box-sizing: border-box !important;'
			          	+	'text-align: center !important;'
								  + 'line-height: 25px !important;'
								  + 'cursor: pointer !important;'
			          	+ 'width: 35px !important;'
			          	+ 'padding: 5px !important;'
			          	+ 'font-size: 18px !important;'
			          	+ 'border: 1px solid #fff !important;'
			            + 'right: 20px !important;'
			            + 'position: absolute !important;'
			            + '")',
      				'span.appendChild(x);',

      				'var jsonData = '+msg+';',
			    		'var len = jsonData.length;',
							'var ol = document.createElement("ol");',
							'var h3 = document.createElement("h3");',
							'h3.setAttribute("style", "'
									+ 'text-align: center !important;'
									+ 'color: #fff !important;'
			          	+ 'box-sizing: border-box !important;'
									+ 'font-weight: bold !important;'
    							+	'margin: 20px 0 !important;'
			            + '");',

			      	'var t = document.createTextNode("'+info.selectionText.toUpperCase()+'");',
		        	'h3.appendChild(t);',

			        'ol.setAttribute("style", "'
			          	+ 'box-sizing: border-box !important;'
									+ 'margin: 0px !important;'
									+ 'padding-left: 10px !important;'
			            + '");',

							'for(var i=0;i<len;i++){',
								'var li = document.createElement("li");',
								'li.setAttribute("style", "'
			            + 'padding: 5px 0;'
			            + 'font-size: 12px !important;'
			            + ' border-bottom: 1px solid rgba(255,255,255,0.1) !important;'
			            + '");',
						 		'var text = jsonData[i]["wordtype"]+" "+jsonData[i]["definition"];',
						 		'var t = document.createTextNode(text);',
						 		'li.appendChild(t);',
						 		'ol.appendChild(li);',
							'}',

			    	  // Floading Div containing result
			        'var d = document.createElement("div");',
							'd.setAttribute("class","dict-floating-card");',
			        'd.setAttribute("style", "'
			            + 'background-color: #008b8b !important;'
			            + 'box-shadow: 1px 2px 15px 3px rgba(0,0,0, 0.7) !important;'
		              + 'width: 300px !important;'
    							+	'font-size: 12px !important;'
			            + 'padding: 15px !important;'
			            + 'padding-left: 25px !important;'
			          	+ 'box-sizing: border-box !important;'
			            + 'border-radius: 3px !important;'
			            + 'position: fixed !important;'
			            + 'top: 50px !important;'
			            + 'color: #fff !important;'
			            + 'max-height: 500px !important;'
			            + 'overflow: auto !important;'
			            + 'right: 50px !important;'
			            + 'z-index: 999999 !important;'
			            + '");',

		        'd.appendChild(span);',
		        'd.appendChild(h3);',
		        'd.appendChild(ol);',
		        'document.body.appendChild(d);',

		        'document.querySelectorAll(".dict-close").forEach( function(el){ el.addEventListener("click", function() { this.parentNode.style.display = "none"; }); });',

		        'setTimeout(function(){ document.getElementsByClassName("dict-floating-card")[0].style.display = "none"; }, 25000);'
		   	  ].join("\n");
		   
			  }
		    /* Inject the code into the current tab */
		    chrome.tabs.executeScript(tab.id, { code: code });
		  }
		});
  }
});