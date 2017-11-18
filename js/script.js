// "use strict";

//########### Function Declarations ######

  function toSentenceCase(term) {
    return term.replace(/(^[a-z])|(\s+[a-z])/g, txt => txt.toUpperCase());
  }

  function ajaxcall(word) {
    $('.home-page').hide();
    $('.app-page').show();

    $.ajax({
      type: "POST",
      // url: "http://localhost/wordosave/server/local.php",
      url: "http://sarcnitj.com/Server%20Side/entries.php",
      // url: "http://sarcnitj.com/Server%20Side/index.php",
      // url: "http://www.catchwebsite.byethost6.com/wordosave.php",  
      data: {
        link: word
        // type: "f" //f => foreground
      }
    })
    .done(function(response) {
      console.log(response);
      
      var authorizationToken = 'nrDQd9sw7Emsh6fA93raF0QZxDITp12Kussjsnn9mqxZZvghSV';

      if (response == 0) {
        $('.home-page').hide();
        $('.app-page').show();

        $.get({
          url: "https://wordsapiv1.p.mashape.com/words/"+word,
          beforeSend: function(request) {
            request.setRequestHeader("X-Mashape-Key", authorizationToken);
            request.setRequestHeader("Accept", "application/json");
          },
          success: function(msg) {
              $('#load').css("display", "none");
              var def = "<strong>" + "Meaning of " + word + " :<br>" + "</strong>";
              var definitions = "";
              for (var i = 0; i < msg.results.length ;i++) {
                  definitions += '<li>&nbsp;<i>'+msg.results[i]["partOfSpeech"]+'</i>&nbsp;&nbsp;'+msg.results[i]["definition"]+'<br></li>';
              }
              $('#meaning').css("display", "block");
              $('#hiddenDef').html(definitions);
              $('#hiddenWord').html(word);
              // console.log(msg)

              //Display result in Blue box
              $("#meaning ol").html(definitions);
              $('#meaning').after("<div id='add' class='add-to-list'><button class='btn btn-blue' style='padding: 10px 0;'>Add to this List</button></div>").addClass('animated bounceIn');
              var height = $("#meaning").innerHeight();
              $("body").css("height",height + 150);

              $.ajax({
                type: "POST",
                // url: "http://localhost/wordosave/server/saveentry.php", 
                url: "http://sarcnitj.com/Server%20Side/saveentry.php", 
                data: {
                  word: word,
                  definition: msg.results
                },
                success: function(res){
                  
                }

              });
          },
          error: function(){
            $('#load').css("display", "none");
            $('.not-found').show().addClass('animated bounceIn');  
          }

        })
      }else{
        $('#load').css("display", "none");
        var msg = JSON.parse(response);
        word = word.toUpperCase();
        // $("#meaning").html(null);
        var def = "<strong>" + "Meaning of " + word + " :<br>" + "</strong>";
        var definitions = "";
        for (var i = 0; i < msg.length ;i++) {
            definitions += '<li>&nbsp;<i>'+msg[i]["wordtype"]+'</i>&nbsp;&nbsp;'+msg[i]["definition"]+'<br></li>';
        }
        $('#meaning').css("display", "block");
        $('#hiddenDef').html(definitions);
        $('#hiddenWord').html(word);
        console.log(definitions)

        //Display result in Blue box
        $("#meaning ol").html(definitions);
        $('#meaning').after("<div id='add' class='add-to-list'><button class='btn btn-blue' style='padding: 10px 0;'>Add to this List</button></div>").addClass('animated bounceIn');
        var height = $("#meaning").innerHeight();
        $("body").css("height",height + 150);
      }
    });
  }

  function save(key, value) {
    // Jquery ADD Click handler to add WORD-MEANING set in storage
    chrome.storage.sync.getBytesInUse(null, function(current_value){
      var max_value = chrome.storage.sync.QUOTA_BYTES;
      if(current_value > max_value){
        $(".meaning-wrapper").html(null);
        $("#add").remove();
        $('#issue').show().find('h3').text("Storage Exceeds! Please delete some items. ");
        return;
      }
      else{
        var obj = {};
        var y;
        obj[key] =  value;
        value = value.toString();
        chrome.storage.sync.get(null, function(all) {
          for(y in all){
            if(key == y)
            { 
              alert(key + " is already in the list.");
              return;
            }
          }
          chrome.storage.sync.set(obj, function(){
            $(".meaning-wrapper").html(null);
            $("#add").remove();
            $("body").css("height",$('#success').height() + 150);
            $('#success').show().addClass('animated bounceIn');
          });
        });
      }
    });  
  } 

  function site(str) {
    if (!str) {
      $('#alert').show().html("No word Selected, select a word first");
    } else {
      chrome.tabs.create({
        'url': "https://en.wiktionary.org/wiki/" + str.toLowerCase()
      }, function(tab) {
        // Tab opened.
      });
    }
  }

  function searchVocab(word) {
    $('#meaning').css("display", "none");
    $('#term').text(toSentenceCase(word));
    $('#load').css("display", "block");
    ajaxcall(word);
  };
//########### Function Declarations End ######


window.addEventListener("load", function() {

  /////// Reminder //////////  
    var i = 0;
    if(localStorage.getItem("alreadydone") == "1")
    {
      // localStorage.removeItem("alreadydone");
    }
    else
    {
      localStorage.setItem("alreadydone","0");
      if(localStorage.getItem("count") == "15"){
        $(".reminder").show();
        localStorage.setItem("count",i);    
      }
      else{
        i = localStorage.getItem("count")?localStorage.getItem("count"):0;
        i = parseInt(i);
        i=i+1;
        console.log(i);    
        localStorage.setItem("count",i);    
      }

      $(".ratepage").click(function(e){
        e.preventDefault();
        chrome.tabs.create({
            'url': "https://chrome.google.com/webstore/detail/word-o-save/amjldpjobjpiflbdejcidlkmhllhnnnm/reviews"
          }, function(tab) {
            // Tab opened.
          });

      });

      $(".enclose h1, .reminder").click(function(n){
        n.stopPropagation();
        $(".reminder").hide();
      });
    }    

    $(".alreadyrated").click(function(e){
      e.preventDefault();
      localStorage.setItem("alreadydone","1");
    });
  /////// Reminder End //////////

  $('#clear').click(function() {
    var r = confirm("Are you sure, whole list will be deleted permanently");
    if (r == true) {
    		chrome.storage.sync.clear();
		    $('#mylist').html(null);
    } else {
        return;
    }
    // localStorage.setItem("count","0");		
  });


  chrome.tabs.query({
    'active': true,
    currentWindow: true
  }, function(tabs) {

    var link = tabs[0].url;
    if (link.includes('www.google')) {

      var bodyHeight = $("body").innerHeight();
      // $("body").css("height",bodyHeight + 128);
      // $('body').css("min-height","300px");
      $('#meaning').css("display", "none");
      $('#load').css("display", "block");

      //####### The set of tested  links ##########//

      // 1. https://www.google.co.in/search?q=grab&oq=grab&aqs=chrome..69i57j0l5.1107j0j9&sourceid=chrome&ie=UTF-8#q=grab+meaning
      // 2. https://www.google.co.in/search?q=grab&oq=grab&aqs=chrome.0.69i59j69i60j69i59j69i65l2j0.1516j0j9&sourceid=chrome&ie=UTF-8#q=grab%20meaning%20in%20hindi
      // 3. https://www.google.co.in/search?espv=2&biw=1366&bih=643&q=define+infuriate&sa=X&ved=0ahUKEwjj5dSF8o7OAhUDQo8KHSWnDBYQ_SoIHzAA#q=enrage
      $('#google-welcome-message').firstVisitPopup({
        cookieName: 'google',
        showAgainSelector: '#show-message'
      });
      //Splitting link on the position of '?', '&' or '#'
      
      if(window.getSelection() == null || window.getSelection() == "")
      {
      	var results = (link.includes('#') ? link.substr(1).split('#') : link.substr(1).split('?'));
	      if (link.includes('&q=')) {
	        var results = link.split('&');
	      }
	      else if (link.includes('#q=' && '&q=')) {
	        var results = link.split('#');
	      }

	      //Decoding function for extracting the WORD
	      var qs = (function(a) {
	        if (a == "") return {};
	        var b = {};
	        for (var i = 0; i < a.length; ++i) {
	          var p = a[i].split('=', 2);
	          if (p.length == 1)
	            b[p[0]] = "";
	          else
	            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	        }
	        return b;
	      })(results);

	      //Further filter of extracted word If it contain '&' or '+' or " "
	      if (qs["q"].includes('&')) {
	        qs["q"] = qs["q"].substr(0, qs["q"].indexOf('&'));
	      }
	      if (qs["q"].includes(' ')) {
	        qs["q"] = qs["q"].substr(0, qs["q"].indexOf(' '));
	      }
	      if (qs["q"].includes('+')) {
	        qs["q"] = qs["q"].substr(0, qs["q"].indexOf('+'));
	      }

	      //Final WORD stored in variable str
	      var str = qs["q"];
	      str = str.toLowerCase();
        $('#term').text(toSentenceCase(str));

	      ajaxcall(str);
      }

      if(window.getSelection() != null || window.getSelection() != "")
      {
		  	//To get selected value from the webpage
			  chrome.tabs.executeScript({
			    code: "window.getSelection().toString();"
			  }, function(selection) {
			    if (selection[0] != '') {
			      $('#meaning').css("display", "none");
			      $('#load').css("display", "block");
			      var word = selection[0];
			      word = word.trim();
			      ajaxcall(word);
			    }
			  });    
		  }
    } 
    else {
      
      var bodyHeight = $("body").innerHeight();
      $("body").css("height",bodyHeight);
      $('#nongoogle-welcome-message').firstVisitPopup({
        cookieName: 'nongoogle',
        showAgainSelector: '#show-message'
      });
      // $('#meaning').html("It is not a Google Search Page, Automatic search will not work but you can see the list by clicking 'Show all' button, or can try manual search");
      $('#p').css("display", "none");
      $("form").css("display", "block");

      $('#reg-form').submit(function() {
        $('#meaning').css("display", "none");
        var str = $('#link').val();
        str = str.replace(/\s+/g, '');
        if (str.search(/^[A-z]+$/) == -1) {
          $('#alert').show().html("Enter Valid Text");
          return false;
        }
        $('#load').css("display", "block");
        $('#alert').hide();
        str = str.toLowerCase();
        $('#term').text(toSentenceCase(str));
        ajaxcall(str);
        return false;
      });

      //To get selected value from the webpage
		  chrome.tabs.executeScript({
		    code: "window.getSelection().toString();"
		  }, function(selection) {
		    if (selection[0] != '') {
		      $('#meaning').css("display", "none");
          $('#load').css("display", "block");
		      var word = selection[0];
		      word = word.trim();
          $('#term').text(toSentenceCase(word));
          ajaxcall(word);
		    }
		  });
    }

    $('.meaning-wrapper').on('click','#add', function(e) {
      var word = $('#hiddenWord').text();
      var msg = $('#hiddenDef').text();
      trackButtonClick($(this));
      save(word, msg);
    });

    $('#site').click(function() {
      var word = $('#hiddenWord').text();
      site(word);
    });

    $('#show').click(function() {
      $(".helper-wrapper").remove();
      // $(".meaning-wrapper").remove();
      chrome.storage.sync.get(null, function(result) {
        if (result == null || result == "" || !result ) {
          $('#alert').show().html("No Item in the list");
          $('#mylist').toggle("linear");
        } else {
          $('#alert').hide();
          $('#mylist').html(null);
          var set = [];
          var x;
          for(x in result){
            set.push(x + " :-  " + result[x]);
          }
          console.log(set);
          var cList = $('#mylist');
          cList.append('<h2>My saved list</h2>');
          cList.css({"padding":"15px 15px 50px"});

          $.each(set, function(i) {
            if (i==10) {
              cList.append('<a class="full-list" href="#">Check Full List</a>');
              return false;
            }else{
              var li = $('<li/>')
                .addClass('ui-menu-item')
                .text(set[i])
                .appendTo(cList);
              // var check = $('<input/>')
              //   .addClass('chkbox')
              //   .attr('type', 'checkbox')
              //   .appendTo(li);
            }
          });

          $('#mylist').toggle("linear");

        } //else
      }); //get
    }); //show
  }); //Tabs Query

  //######## About Page #########
    $("#about").animatedModal({
      animatedIn: "bounceIn",
      animatedOut: "bounceOut",
      color: "#FFF"
    });
  //######## About Page End #########

  //######## Help Page #########
    $('#help').click(function() {
      $('#helpslide').slideToggle();
      $('#helpslide').css("display", "block");
    });
  //######## Help Page End #########

  // Search within the result produced 
  $("#meaning").on("dblclick", function(e) {
    // $('#alert').hide();
    $('#add').remove();
    s = window.getSelection();
    s.modify('extend','backward','word');        
    var b = s.toString();

    s.modify('extend','forward','word');
    var a = s.toString();
    s.modify('move','forward','character');
    var word =  b+a;
    // if(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(word) == true){
    if(/[^A-z]/.test(word) == true){
      word =  word.replace(/[^A-z]/,'');
    }
    word =  word.replace(/\r?\n|\r/,"");
    searchVocab(word);
  });

//##### Google Analytics Trcking ######### 
  var _AnalyticsCode = 'UA-108259889-1';

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', _AnalyticsCode]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  })();

  function trackButtonClick(e) {
    _gaq.push(['_trackEvent', e[0].id, 'clicked']);
  }
//##### Google Analytics Trcking End #########


//######### UpdateCheck #########
  chrome.runtime.onUpdateAvailable.addListener(function(){
    var c = chrome.app.getDetails();
    console.log(c.version);
    chrome.runtime.reload();
  });
//######### UpdateCheck End #########


//########### Getting user Email ######
 
  // var logged_in_user;
  // chrome.extension.sendMessage({}, function(response) {
  //   logged_in_user = response.email
  // });

  chrome.identity.getProfileUserInfo(function(info) { 
    var email;
    email = info.email; 
    console.log(email);
    if (email != null && email != ""){
      $.ajax({
        type: "POST",
        url: "http://sarcnitj.com/Server%20Side/savedb.php",   
        data: {
          email: email
        },
        success: function(res){
          console.log(res);
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });
//########### Getting user Email End ######

}, false);


