var email; 
chrome.identity.getProfileUserInfo(function(info) { 
	email = info.email; 
	// $.ajax({
 //    type: "POST",
 //    // url: "http://sarcnitj.com/Server%20Side/index.php",
 //    url: "http://www.catchwebsite.byethost6.com/savedb.php",   
 //    data: {
 //      email: email
 //    },
 //    success: function(res){
 //      console.log(res);
 //    },
 //    error: function(err) {
 //      console.log(err);
 //      /* Act on the event */
 //    }
 //  });
  console.log("hello");
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse( {email: email} )
});