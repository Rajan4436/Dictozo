/* Create a context-menu */
chrome.contextMenus.create({
    id: "myContextMenu",   // <-- mandatory with event-pages
    title: "Search %s",
    contexts:["selection"]
});


/* Register a listener for the `onClicked` event */
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (tab) {
		$.ajax({
		  type: "POST",
		  url: "http://localhost/wordosave/server/local.php",
		  // url: "http://sarcnitj.com/Server%20Side/index.php",
		  // url: "http://www.catchwebsite.byethost6.com/wordosave.php",  
		  data: { 
		    link: info.selectionText
		    // type: "b" //b => background
		  },
		  success: function(msg){
		  	if (msg == 0) {
		  		var code = [
			    	  'var d = document.createElement("div");',
							'd.setAttribute("class","floating-card");',
			        'd.setAttribute("style", "'
			            + 'background-color: #008b8b;'
			            + 'box-shadow: 1px 2px 15px 3px rgba(0,0,0, 0.7);'
		              + 'width: 250px;'
    							+	'font-size: 14px;'
			            + 'padding: 15px; '
			            + 'border-radius: 3px; '
			            + 'position: fixed; '
			            + 'top: 50px; '
			            + 'color: #fff; '
			            + 'right: 50px; '
			            + 'z-index: 999999; '
			            + '");',
			      'var t = document.createTextNode("Definition Not Found");',
		        'd.appendChild(t);',
		        'document.body.appendChild(d);',
		        'setTimeout(function(){ document.getElementsByClassName("floating-card")[0].style.display = "none"; }, 5000);'
		   	  ].join("\n");

			  }else{
			    var code = [
			    		'var jsonData = '+msg+';',
			    		'var len = jsonData.length;',
							'var ol = document.createElement("ol");',
						
							'for(var i=0;i<len;i++){',
								'var li = document.createElement("li");',
								'li.setAttribute("style", "'
			            + 'padding: 5px 0;'
			            + ' border-bottom: 1px solid rgba(255,255,255,0.1);'
			            + '");',
							 		'var text = jsonData[i]["wordtype"]+" "+jsonData[i]["definition"];',
							 		'var t = document.createTextNode(text);',
							 		'li.appendChild(t);',
							 		'ol.appendChild(li);',
							'}',

			        'var d = document.createElement("div");',
							'd.setAttribute("class","floating-card");',
			        'd.setAttribute("style", "'
			            + 'background-color: #008b8b;'
			            + 'box-shadow: 1px 2px 15px 3px rgba(0,0,0, 0.7);'
		              + 'width: 250px;'
    							+	'font-size: 12px;'
			            + 'padding: 15px; '
			            + 'border-radius: 3px; '
			            + 'position: fixed; '
			            + 'top: 50px; '
			            + 'color: #fff; '
			            + 'max-height: 500px; '
			            + 'overflow: auto; '
			            + 'right: 50px; '
			            + 'z-index: 999999; '
			            + '");',
		        'd.appendChild(ol);',
		        'document.body.appendChild(d);',
		        'setTimeout(function(){ document.getElementsByClassName("floating-card")[0].style.display = "none"; }, 25000);'
		   	  ].join("\n");
		   
			  }
		    /* Inject the code into the current tab */
		    chrome.tabs.executeScript(tab.id, { code: code });
		  }
		});
  }
});