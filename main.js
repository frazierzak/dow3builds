/*global window */
/*property
    addClass, at, attr, change, children, click, console, content, css, each,
    exec, execCommand, getAttribute, hide, href, is, length, location, log, my,
    on, parent, position, prop, removeAttr, removeClass, reset, select,
    serialize, show, siblings, split, text, tooltip, tooltipClass, using, val,
    vertical
*/

initApp = function() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var uid = user.uid;
    var providerData = user.providerData;
    user.getToken().then(function(accessToken) {
      document.getElementById('sign-in-status').textContent = 'Signed in with ' + email;
      document.getElementById('sign-in').textContent = 'Sign out';
      // document.getElementById('account-details').textContent = JSON.stringify({
      //   displayName: displayName,
      //   email: email,
      //   emailVerified: emailVerified,
      //   photoURL: photoURL,
      //   uid: uid,
      //   accessToken: accessToken,
      //   providerData: providerData
      // }, null, '  ');
    });
  } else {
    // $(".logged_in").hide();
    // User is signed out.
    document.getElementById('sign-in-status').textContent = 'Currently not logged in!';
    document.getElementById('sign-in').textContent = 'Sign in';
    // document.getElementById('account-details').textContent = 'null';
  }
}, function(error) {
  console.log(error);
});
};

window.addEventListener('load', function() {
  initApp()
});


//Variables
var first_elite;
var second_elite;
var third_elite;
var changed;
var firstEliteName;
var secondEliteName;
var thirdEliteName;
var e;
var firstEliteDocName;
var secondEliteDocName;
var thirdEliteDocName;

//Clear code
function clear() {
    "use strict";
    $("#form input").removeAttr("checked");
    $("#form input").removeAttr("disabled");
    $("#form label").removeClass("disabled");
    $("#form label").removeClass("used");
    $("#form")[0].reset();
    $("#smSection").hide();
    $("#orkSection").hide();
    $("#eldSection").hide();
}

$("#clear").click(clear);

function hideEliteDoctrines(elite, query) {
    "use strict";
    $(elite).children().each(function () {
        if ($(this).attr("id") !== query) {
            $(this).hide();
        }
    });
}

//Elite selection code
function disableRadio(x, y, changed) {
    "use strict";
    $(x + ' input.single-checkbox').each(function () {
        if ($(this).val() === changed) {
            $(this).attr("disabled", true);
            $(this).parent().addClass("used");
        } else {
            if ($(this).val() !== first_elite && $(this).val() !== second_elite && $(this).val() !== third_elite) {
                $(this).parent().removeClass("used");
                $(this).attr("disabled", false);
            }
        }
    });
    $(y + ' input.single-checkbox').each(function () {
        if ($(this).val() === changed) {
            $(this).attr("disabled", true);
            $(this).parent().addClass("used");
        } else {
            if ($(this).val() !== first_elite && $(this).val() !== second_elite && $(this).val() !== third_elite) {
                $(this).parent().removeClass("used");
                $(this).attr("disabled", false);
            }
        }
    });
    
}

//Show parameters on page
function showValues() {
    "use strict";
    var str = $("form").serialize();
    var url = window.location.href; // Returns full URL
    url = url.split('create.html')[0];
    str = url + "build.html?" + str;
    $("#results").val(str);
    $("#view").attr('href', str);
}

//Show parameters on page
function saveValues() {
    "use strict";
    var values = [];
    var str = $("#form").serialize();
    var r = /(\w+)=(\w+)+/g;
    var buildQ = r.exec(str);
    while (buildQ !== null) {
      // alert(buildQ[1]);
      // alert(buildQ[2]);
      values.push(buildQ[2]);
      buildQ = r.exec(str);
    }
    var url = window.location.href; // Returns full URL
    url = url.split('create.html')[0];
    str = url + "build.html?" + str;
    var r = /[?|&](\w+)=(\w+)+/g;
    var query = r.exec(window.location.href);
    var buildId = "";
    while (query !== null) {
      buildId = buildId + query[2];
      query = r.exec(window.location.href);
    }
    var buildTitle = $("#title").val();
    writeUserData(buildTitle, buildId, str, values);
}

var newPostKey = firebase.database().ref().child('builds').push().key;
//Write to database
function writeUserData(buildTitle, buildId, buildURL, values) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;
      var ref = firebase.database().ref("builds");
      ref.once('value', function(snapshot) {
        if (snapshot.hasChild(newPostKey)) {
            $("#error").html("Sorry, this build has already been submitted. You can view it <a href=" + buildURL + ">here.</a>");
            $("#error").slideDown("slow");
        } else {
          firebase.database().ref('builds/' + newPostKey).set({
            buildURL: buildURL,
            author: uid,
            desc: "example description",
            votes: 0,
            r: values[0],
            title: values[1],
            e1: values[2],
            e1d: values[3],
            e2: values[4],
            e2d: values[5],
            e3: values[6],
            e3d: values[7],
            d1: values[8],
            d2: values[9],
            d3: values[10]
          });
        }
      }); 
    }
  }); 
}

$("#save").click( function(){
  saveValues();
})

//Race selection code
function switchRaces(thisObj) {
    "use strict";
    var race = thisObj.val();
    $("input").removeAttr("checked");
    $("input").removeAttr("disabled");
    $("label").removeClass("disabled");
    $("label").removeClass("used");
    $("#form")[0].reset();
    if (race === "sm") {
        $("input[value='" + race + "']").prop("checked", true);
        $("#smSection").show();
        $("#orkSection").hide();
        $("#eldSection").hide();
    }
    if (race === "ork") {
        $("input[value='" + race + "']").prop("checked", true);
        $("#smSection").hide();
        $("#orkSection").show();
        $("#eldSection").hide();
    }
    if (race === "eld") {
        $("input[value='" + race + "']").prop("checked", true);
        $("#smSection").hide();
        $("#orkSection").hide();
        $("#eldSection").show();
    }
    showValues();
}

//url parser
var r = /[?|&](\w+)=(\w+)+/g;  //matches against a kv pair a=b
var query = r.exec(window.location.href);  //gets the first query from the url

var parser = function() {
    "use strict";
    while (query !== null) {
        $("input[type='radio'][name='" + query[1] + "'][value='" + query[2] + "']").attr("checked", true);
        $("input[type='checkbox'][name='" + query[1] + "'][value='" + query[2] + "']").attr("checked", true);
        switch(query[1]){
            case "r":
                switchRaces($("input[value='" + query[2] + "']"));
                break;
            case "e1":
                first_elite = query[2];
                disableRadio("#secondElite", "#thirdElite", first_elite);
                firstEliteName = $("input[type='radio'][name='" + query[1] + "'][value='" + query[2] + "']").attr("alt");
                $("#firstElite_name").text(firstEliteName);
                hideEliteDoctrines("#firstEliteDocs", query[2]);
                $('td#firstEliteDocs').children().hide();
                e = 'td#firstEliteDocs #' + query[2];
                $(e).show();
                break;
            case "e1d":
                firstEliteDocName = $('input[type="radio"][name="'+query[1]+'"][value="'+query[2]+'"]').attr('alt');
                $("#firstEliteDoc_name").text(firstEliteDocName);
                $("#firstEliteDoc_name").show();
                break;
            case "e2":
                second_elite = query[2];
                disableRadio("#firstElite", "#thirdElite", second_elite);
                secondEliteName = $("input[type='radio'][name='" + query[1] + "'][value='" + query[2] + "']").attr("alt");
                $("#secondElite_name").text(secondEliteName);
                hideEliteDoctrines("#secondEliteDocs", query[2]);
                $('td#secondEliteDocs').children().hide();
                e = 'td#secondEliteDocs #' + query[2];
                $(e).show();
                break;
            case "e2d":
                secondEliteDocName = $('input[type="radio"][name="'+query[1]+'"][value="'+query[2]+'"]').attr('alt');
                $("#secondEliteDoc_name").text(secondEliteDocName);
                $("#secondEliteDoc_name").show();
                break;
            case "e3":
                third_elite = query[2];
                disableRadio("#firstElite", "#secondElite", third_elite);
                thirdEliteName = $("input[type='radio'][name='" + query[1] + "'][value='" + query[2] + "']").attr("alt");
                $("#thirdElite_name").text(thirdEliteName);
                hideEliteDoctrines("#thirdEliteDocs", query[2]);
                $('td#thirdEliteDocs').children().hide();
                e = 'td#thirdEliteDocs #' + query[2];
                $(e).show();
                break;
            case "e3d":
                thirdEliteDocName = $('input[type="radio"][name="'+query[1]+'"][value="'+query[2]+'"]').attr('alt');
                $("#thirdEliteDoc_name").text(thirdEliteDocName);
                $("#thirdEliteDoc_name").show();
                break;
        }
       
        showValues();
        //saveValues();
        query = r.exec(window.location.href);  //repeats to get next capture
    }
};

parser();

//Greys out other elite doctrine
$('.eliteDocs input').on('change', function() {
  "use strict";
  if ($(this).attr("checked", true)) {
    $(this).parent("label").siblings("label").addClass("disabled");
    $(this).parent("label").removeClass("disabled");
  }
  showValues();
});

//Doctrines limitation code
$('input.doctrines-checkbox').on('change', function() {
  "use strict";
  if ($(".doctrines-checkbox:checked").length === 3) {
    $("#faction_doctrines input").each(function() {
      $(this).parent("label").addClass("disabled");
    });
  }
  if ($(".doctrines-checkbox:checked").length >= 4) {
    $(this).prop("checked", false);
  }
  $("#faction_doctrines input").each(function() {
    if($(this).is(':checked') || $(".doctrines-checkbox:checked").length < 3) {
      $(this).parent("label").removeClass("disabled");
    }
  });
  showValues();
});

if ($(".doctrines-checkbox:checked").length === 3) {
  $("#faction_doctrines input").each(function() {
    "use strict";
    $(this).parent("label").addClass("disabled");
  });
}
$("#faction_doctrines input").each(function() {
  "use strict";
  if($(this).is(':checked') || $(".doctrines-checkbox:checked").length < 3) {
    $(this).parent("label").removeClass("disabled");
  }
});

//Check for race switch
$("input[name='r']").change(function() {
  "use strict";
  switchRaces($(this));
});

//Greyscale all other elites after three picked
if ($(".elites input.single-checkbox:checked").length === 3) {
  $(".elites label").addClass("disabled");
  $(".elites input.single-checkbox:checked").each(function() {
    "use strict";
    $(this).parent("label").removeClass("disabled");
  });
}

//Greyscale all other elites after three picked
$('.elites input.single-checkbox').change(function() {
  "use strict";
  if ($(".elites input.single-checkbox:checked").length === 3) {
    $(".elites label").addClass("disabled");
    $(".elites input.single-checkbox:checked").each(function() {
      $(this).parent("label").removeClass("disabled");
    });
  }
});

//Disable selected elites in other columns
$('#firstElite input.single-checkbox').change(function() {
  "use strict";
  changed = $(this).val();
  first_elite = changed;
  firstEliteName = $(this).attr('alt');
  $("#firstElite_name").text(firstEliteName);
  disableRadio("#secondElite", "#thirdElite", first_elite);
  $('td#firstEliteDocs').children().hide();
  e = 'td#firstEliteDocs #' + changed;
  $(e).show();
});
$('#secondElite input.single-checkbox').change(function() {
  "use strict";
  changed = $(this).val();
  second_elite = changed;
  secondEliteName = $(this).attr('alt');
  $("#secondElite_name").text(secondEliteName);
  disableRadio("#firstElite", "#thirdElite", second_elite);
  $('td#secondEliteDocs').children().hide();
  e = 'td#secondEliteDocs #' + changed;
  $(e).show();
});
$('#thirdElite input.single-checkbox').change(function() {
  "use strict";
  changed = $(this).val();
  third_elite = changed;
  thirdEliteName = $(this).attr('alt');
  $("#thirdElite_name").text(thirdEliteName);
  disableRadio("#secondElite", "#firstElite", third_elite);
  $('td#thirdEliteDocs').children().hide();
  e = 'td#thirdEliteDocs #' + changed;
  $(e).show();
});


//Show Elite Doctrine Names
$('#firstEliteDocs input').change(function() {
  "use strict";
  firstEliteDocName = $(this).attr('alt');
  $("#firstEliteDoc_name").text(firstEliteDocName);
  $("#firstEliteDoc_name").show();
});

$('#secondEliteDocs input').change(function() {
  "use strict";
  secondEliteDocName = $(this).attr('alt');
  $("#secondEliteDoc_name").text(secondEliteDocName);
  $("#secondEliteDoc_name").show();
});

$('#thirdEliteDocs input').change(function() {
  "use strict";
  thirdEliteDocName = $(this).attr('alt');
  $("#thirdEliteDoc_name").text(thirdEliteDocName);
  $("#thirdEliteDoc_name").show();
});

//tooltip code
$( function() {
  "use strict";
  $( document ).tooltip({
    tooltipClass: "tooltips",
    position: {
      my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
                $( this ).css( position );
                $( this ).addClass( feedback.vertical );
            }
      },
    content: function () {
      return this.getAttribute("title");
    }
  });
} );

//Copy to Clipboard code
function copyToClipboard() {
  "use strict";
  $('#results').select();
  document.execCommand("copy");
}

$('a#copy').click(function() {
  "use strict";
  copyToClipboard();
});