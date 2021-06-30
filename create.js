/*global window */
/*property
    addClass, at, attr, change, children, click, console, content, css, each,
    exec, execCommand, getAttribute, hide, href, is, length, location, log, my,
    on, parent, position, prop, removeAttr, removeClass, reset, select,
    serialize, show, siblings, split, text, tooltip, tooltipClass, using, val,
    vertical
*/
"use strict";

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
var html;


//Enable for testing
var testing = true;

if (testing) {
    var user = "tester";
}

//Get Number of Builds User has made
var ref = firebase.database().ref("users/" + user);
ref.once("value").then(function(snapshot) {
    var a = snapshot.child("builds").numChildren();
    var b = snapshot.child("favs").numChildren();
    $("#yourBuildNumber").text(a);
    $("#yourFavNumber").text(b);
  });

var ref = firebase.database().ref("builds");
ref.once("value").then(function(snapshot) {
    var a = snapshot.numChildren();
    $("#allBuildsNumber").text(a);
  });

//Clear code
function clear() {
    $("#form input").removeAttr("checked");
    $("#form input").removeAttr("disabled");
    $("#form label").removeClass("disabled");
    $("#form label").removeClass("used");
    $("#form")[0].reset();
    $("#description_holder, #createTable, #button_holder").hide();
    $("#selectRaceNotice").show();
    var divsToClear = "#firstElite, #firstElite_name, #firstEliteDocsHolder, #firstEliteDoc_name, #secondElite, #secondElite_name, #secondEliteDocsHolder, #secondEliteDoc_name, #thirdElite, #thirdElite_name, #thirdEliteDocsHolder, #thirdEliteDoc_name, #infantry_docs, #vehicle_docs, #structure_docs, #faction_docs";
    $(divsToClear).html("");
}

//Reset Form
$(".clear").click(clear);

//Hide Elite Doctrines
function hideEliteDoctrines(elite, query) {
    $(elite).children().each(function() {
        if ($(this).attr("id") !== query) {
            $(this).hide();
        }
    });
}

//Elite selection code
function disableRadio(x, y, changed) {
    $(x + ' input.single-checkbox').each(function() {
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
    $(y + ' input.single-checkbox').each(function() {
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
    showValues();
}

//Show parameters on page
function showValues() {
    //var str = $("form#form").serialize();
    var values = [];
    var r = $('input[name=r]:checked', '#form').val();
    values.push(r);
    var e1 = $('input[name=e1]:checked', '#form').val();
    values.push(e1);
    var e1d = $('input[name=e1d]:checked', '#form').val();
    values.push(e1d);
    var e2 = $('input[name=e2]:checked', '#form').val();
    values.push(e2);
    var e2d = $('input[name=e2d]:checked', '#form').val();
    values.push(e2d);
    var e3 = $('input[name=e3]:checked', '#form').val();
    values.push(e3);
    var e3d = $('input[name=e3d]:checked', '#form').val();
    values.push(e3d);
    $('#faction_doctrines input:checked').each(function() {
        values.push($(this).attr('value'));
    });

    //Generate URL
    values.clean(undefined);
    var str = "";
    $.each(values, function(ind,val) {
        str = str + val + ",";
    });
    var str = str.slice(0,-1);
    var url = window.location.href; // Returns full URL
    url = url.split('create.html')[0];
    str = url + "build.html?" + str;
    $("#results").val(str);
    //$("#view").attr('href', str);
}

//Notice Code
function notice(type, str) {
    type = "#"+type;
    $(type).html(str);
    $(type).slideDown(500, function() {
        $(type).delay(8000).slideUp(500);
    });
}

//Blink Element
function flash(element) {
    $(element).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
}

//Validate Form
function reportIncomplete() {
    var message = "";
    //alert($("input[type='radio'][name='r']:checked").length);
    if ($("input[type='radio'][name='r']:checked").length !== 1) {
        flash($("input[type='radio'][name='r']").parents("label"));
        message = message + "Race not selected, ";
    }
    if ($("#title").val().length < 5) {
        flash($("#title").parent('p'));
        message = message + "Build Title not long enough, ";
    }
    if ($("input[type='radio'][name='e1']:checked").length !== 1) {
        flash($("#firstEliteHead"));
        message = message + "First Elite not selected, ";
    }
    if ($("input[type='radio'][name='e1d']:checked").length !== 1) {
        flash($("#firstEliteDocHead"));
        message = message + "First Elite Doctrine not selected, ";
    }
    if ($("input[type='radio'][name='e2']:checked").length !== 1) {
        flash($("#secondEliteHead"));
        message = message + "Second Elite not selected, ";
    }
    if ($("input[type='radio'][name='e2d']:checked").length !== 1) {
        flash($("#secondEliteDocHead"));
        message = message + "Second Elite Doctrine not selected, ";
    }
    if ($("input[type='radio'][name='e3']:checked").length !== 1) {
        flash($("#thirdEliteHead"));
        message = message + "Third Elite not selected, ";
    }
    if ($("input[type='radio'][name='e3d']:checked").length !== 1) {
        flash($("#thirdEliteDocHead"));
        message = message + "Third Elite Doctrine not selected, ";
    }
    if ($("input[type='checkbox'][name='doc']:checked").length !== 3) {
        flash($("#doctrineHead"));
        message = message + "Three Faction Doctrines not selected, ";
    }
    if ($("textarea#shortDesc").val().length > 140) {
        flash($("#shortDescHead"));
        message = message + "Short Description is more than 140 characters, "
    }
    message = message.replace(/(,\s*$)/g, ".");
    notice("error", "The following sections are not complete: " + message);
}

//Capitalize First Letter of String
function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Clean elements from array
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

var newPostKey = firebase.database().ref().child('builds').push().key;

//Build Array for Saving
function saveValues(newPostKey) {
    console.log(newPostKey);
    var values = [];
    var r = $('input[name=r]:checked', '#form').val();
    console.log(r);
    values.push(r);
    var e1 = $('input[name=e1]:checked', '#form').val();
    console.log(e1);
    values.push(e1);
    var e1d = $('input[name=e1d]:checked', '#form').val();
    console.log(e1d);
    values.push(e1d);
    var e2 = $('input[name=e2]:checked', '#form').val();
    console.log(e2);
    values.push(e2);
    var e2d = $('input[name=e2d]:checked', '#form').val();
    console.log(e2d);
    values.push(e2d);
    var e3 = $('input[name=e3]:checked', '#form').val();
    console.log(e3);
    values.push(e3);
    var e3d = $('input[name=e3d]:checked', '#form').val();
    console.log(e3d);
    values.push(e3d);
    $('#faction_doctrines input:checked').each(function() {
        console.log($(this).attr('value'));
        values.push($(this).attr('value'));
    });

    //Generate URL
    values.clean(undefined);
    var url = "view.html?";
    $.each(values, function(ind,val) {
        url = url + val + ",";
        console.log(url);
    });
    var url = url.slice(0,-1);
    console.log(url);

    var title = $("input[name='build_title']").val();
    console.log(title);
    values.push(title);
    var shortDesc = $("textarea#shortDesc").val();
    console.log(shortDesc);
    values.push(shortDesc);
    var longDesc = simplemde.value();
    console.log(longDesc);
    values.push(longDesc);
    values.clean(undefined);
    console.log("Values array is: " + values);
    console.log("Length of Values: " + values.length);
    if (shortDesc.length !== 0) {
        var shortDescPresent = true;
        console.log("shortDesc is present");
    } else {
        var shortDescPresent = false;
        //shortDesc = "";
        console.log("shortDesc is not present");
    }
    if (longDesc.length !== 0) {
        var longDescPresent = true;
        console.log("longDesc is present");
    } else {
        var longDescPresent = false;
        //longDesc = "";
        console.log("longDesc is not present");
    }
    if (values.length < 13) {
        console.log("values length is less than 14");
        if (shortDescPresent && longDescPresent) {
            console.log("shortDesc and longDesc are present");
            reportIncomplete();
            return;
        }
        if ((shortDescPresent && !longDescPresent) || (!shortDescPresent && longDescPresent)) {
            console.log("shortDesc or longDesc are missing");
            if (values.length < 12) {
                console.log("values length is less than 12");
                reportIncomplete();
                return;
            }
        }
        if (!shortDescPresent && !longDescPresent) {
            console.log("shortDesc and longDesc are missing");
            if (values.length < 11) {
                console.log("values length is less than 11");
                reportIncomplete();
                return;
            }
        }
    }
    if (title.length < 5) {
        console.log("Title is less than 5 characters");
        reportIncomplete();
        return;
    }
    if (shortDesc.length > 140) {
        console.log("Short Description is more than 140 characters");
        reportIncomplete();
        return;
    }
    
    
    // var url = window.location.href; // Returns full URL
    // url = url.split('create.html')[0];
    // str = url + "build.html?" + str;
    // var r = /[?|&](\w+)=(\w+)+/g;
    // var query = r.exec(window.location.href);
    // var buildId = "";
    // while (query !== null) {
    //     buildId = buildId + query[2];
    //     query = r.exec(window.location.href);
    // }
    // var buildTitle = $("#title").val();
    //writeUserData(values, newPostKey);

}

//Write to database
function writeUserData(values, newPostKey) {
    //Grab key
    //var newPostKey = firebase.database().ref().child('builds').push().key;
    var buildURL = "view.html?id=" + newPostKey;
    console.log(buildURL);

    //Grab Current Date
    var currentdate = Date.now();

    //Check if testing
    if (testing) {
        //Grab firebase "builds" child
        var ref = firebase.database().ref("builds");
        var uid = "tester";

        //Take snapshot of database child
        ref.once("value", function (snapshot) {
            //Check if key is already in database
            if (snapshot.hasChild(newPostKey)) {
                notice("error", "Sorry, this build has already been saved. You can view and edit it <a href=view.html?=" + newPostKey + ">here.</a>");
            } else {
                //Add entry to database
                firebase.database().ref("builds/" + newPostKey).set({
                    buildURL: buildURL,
                    author: uid,
                    votes: 1,
                    favCount: 0,
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
                    d3: values[10],
                    shortDesc: values[11],
                    longDesc: values[12],
                    dateC: currentdate,
                    dateU: currentdate
                });
                firebase.database().ref("users/" + uid + "/builds/" + newPostKey).set({
                    buildURL: buildURL,
                    author: uid,
                    votes: 1,
                    favCount: 0,
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
                    d3: values[10],
                    shortDesc: values[11],
                    longDesc: values[12],
                    dateC: currentdate,
                    dateU: currentdate
                });
                notice("notice", "Build Submitted! You can view and edit it <a href=\"view.html?id=" + newPostKey + "\">here</a>.");
            }
        });
    } else {
        //Check for Authentication
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var uid = user.uid;
                var ref = firebase.database().ref("builds");
                ref.once("value", function (snapshot) {
                    if (snapshot.hasChild(newPostKey)) {
                        notice("error", "Sorry, this build has already been saved. You can view and edit it <a href=view.html?=" + newPostKey + ">here.</a>");
                    } else {
                        //Add entry to database
                        firebase.database().ref("builds/" + newPostKey).set({
                            buildURL: buildURL,
                            author: uid,
                            votes: 1,
                            favCount: 0,
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
                            d3: values[10],
                            shortDesc: values[11],
                            longDesc: values[12],
                            dateC: currentdate,
                            dateU: currentdate
                        });
                        firebase.database().ref("users/" + uid + "/builds/" + newPostKey).set({
                            buildURL: buildURL,
                            author: uid,
                            votes: 1,
                            favCount: 0,
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
                            d3: values[10],
                            shortDesc: values[11],
                            longDesc: values[12],
                            dateC: currentdate,
                            dateU: currentdate
                        });
                        notice("notice", "Build Submitted! You can view and edit it <a href=\"view.html?id=" + newPostKey + "\">here</a>.");
                    }
                });
            }
        });
    }
}

//Save Button
$(document).on('click', '.save', function() {
    saveValues(newPostKey);
})

//Race selection code
function switchRaces(thisObj) {
    clear();
    var race = thisObj.val();
    $("#description_holder, #createTable, #button_holder").show();
    $("#selectRaceNotice").hide();
    if (race === "sm") {
        $("input[value='" + race + "']").prop("checked", true);
        var x;
        jQuery.getJSON("json/spacemarines.json", function(data) {
            for(x=1; x < 4; x += 1) {
                $.each(data.elites, function(cat, val) {
                    var eliteLabel = "<label>" + 
                        "<input class=\"single-checkbox\" type=\"radio\" name=\"e" + x + "\" value=\"" + val.value + "\" alt=\"" + val.title + "\" />" + 
                        "<img title=\"<h2>" + val.title + "</h2><h3>" + val.role + "</h3>" + val.desc + "\" src=\"images/" + race + "/elites/" + val.src + ".png\"/>" + 
                        "</label>";
                    var eliteDocClass = "<div class=\"eliteDocs\" id=\"" + val.value + "\">" +
                        "<label>" +
                            "<input type=\"radio\" name=\"e" + x + "d\" value=\"" + val.docs[0].value + "\" alt=\"" + val.docs[0].name + "\" />" +
                            "<img src=\"images/" + race + "/elitedoctrines/" + val.docs[0].src + ".png\" title=\"<h2>" + val.docs[0].name + "</h2>" + val.docs[0].desc + "\" />" +
                        "</label>" +
                        "<label>" +
                            "<input type=\"radio\" name=\"e" + x + "d\" value=\"" + val.docs[1].value + "\" alt=\"" + val.docs[1].name + "\" />" +
                                "<img src=\"images/" + race + "/elitedoctrines/" + val.docs[1].src + ".png\" title=\"<h2>" + val.docs[1].name + "</h2>" + val.docs[1].desc + "\" />" +
                            "</label>" +
                        "</div>";
                    switch (x) {
                        case 1:
                            $("#firstElite").append(eliteLabel);
                            $("#firstEliteDocsHolder").append(eliteDocClass);
                            break;
                        case 2:
                            $("#secondElite").append(eliteLabel);
                            $("#secondEliteDocsHolder").append(eliteDocClass);
                            break;
                        case 3:
                            $("#thirdElite").append(eliteLabel);
                            $("#thirdEliteDocsHolder").append(eliteDocClass);
                            break;
                    }
                })
            }
            $.each(data.doctrines, function(cat, val) {
                console.log(cat);
                console.log(val);
                $.each(val.infantry, function(cat, val) {
                    var infantryDocs = "<label>" +
                    "<input class=\"doctrines-checkbox\" type=\"checkbox\" name=\"doc\" value=\"" + val.value + "\" alt=\"" + val.name + "\" />" +
                    "<img title=\"<h2>" + val.name + "</h2>" + val.desc + "\" src=\"images/" + race + "/doctrines/" + val.src + ".png\">";
                    $("#infantry_docs").append(infantryDocs);
                });
                $.each(val.vehicle, function(cat, val) {
                    var vehicleDocs = "<label>" +
                    "<input class=\"doctrines-checkbox\" type=\"checkbox\" name=\"doc\" value=\"" + val.value + "\" alt=\"" + val.name + "\" />" +
                    "<img title=\"<h2>" + val.name + "</h2>" + val.desc + "\" src=\"images/" + race + "/doctrines/" + val.src + ".png\">";
                    $("#vehicle_docs").append(vehicleDocs);
                });
                $.each(val.structure, function(cat, val) {
                    var structureDocs = "<label>" +
                    "<input class=\"doctrines-checkbox\" type=\"checkbox\" name=\"doc\" value=\"" + val.value + "\" alt=\"" + val.name + "\" />" +
                    "<img title=\"<h2>" + val.name + "</h2>" + val.desc + "\" src=\"images/" + race + "/doctrines/" + val.src + ".png\">";
                    $("#structure_docs").append(structureDocs);
                });
                $.each(val.faction, function(cat, val) {
                    var factionDocs = "<label>" +
                    "<input class=\"doctrines-checkbox\" type=\"checkbox\" name=\"doc\" value=\"" + val.value + "\" alt=\"" + val.name + "\" />" +
                    "<img title=\"<h2>" + val.name + "</h2>" + val.desc + "\" src=\"images/" + race + "/doctrines/" + val.src + ".png\">";
                    $("#faction_docs").append(factionDocs);
                });
                
            });
        });
        $("#factionEliteSelection").html("<h1>Space Marines Elite Selection</h1>");
    }
    if (race === "ork") {
        $("input[value='" + race + "']").prop("checked", true);
        $("#smSection").hide();
        $("#orkSection").show();
        $("#eldSection").hide();
        $("#factionEliteSelection").html("<h1>Orks Elite Selection</h1>");
    }
    if (race === "eld") {
        $("input[value='" + race + "']").prop("checked", true);
        $("#smSection").hide();
        $("#orkSection").hide();
        $("#eldSection").show();
        $("#factionEliteSelection").html("<h1>Eldar Elite Selection</h1>");
    }
    $("#createTable").show();
    showValues();
}

//url parser
var r = /[?|&](\w+)=(\w+)+/g; //matches against a kv pair a=b
var query = r.exec(window.location.href); //gets the first query from the url

var parser = function() {
    while (query !== null) {
        $("input[type='radio'][name='" + query[1] + "'][value='" + query[2] + "']").attr("checked", true);
        $("input[type='checkbox'][name='" + query[1] + "'][value='" + query[2] + "']").attr("checked", true);
        switch (query[1]) {
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
                firstEliteDocName = $('input[type="radio"][name="' + query[1] + '"][value="' + query[2] + '"]').attr('alt');
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
                secondEliteDocName = $('input[type="radio"][name="' + query[1] + '"][value="' + query[2] + '"]').attr('alt');
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
                thirdEliteDocName = $('input[type="radio"][name="' + query[1] + '"][value="' + query[2] + '"]').attr('alt');
                $("#thirdEliteDoc_name").text(thirdEliteDocName);
                $("#thirdEliteDoc_name").show();
                break;
        }

        showValues();
        //saveValues();
        query = r.exec(window.location.href); //repeats to get next capture
    }
};

parser();

//Greys out other elite doctrine
$(document).on('change', '.eliteDocs input', function() {
    if ($(this).attr("checked", true)) {
        $(this).parent("label").siblings("label").addClass("disabled");
        $(this).parent("label").removeClass("disabled");
    }
    showValues();
});

$("textarea[name='description']").on('change', function() {
    showValues();
});

//Doctrines limitation code
$(document).on('change', 'input.doctrines-checkbox', function() {
    if ($(".doctrines-checkbox:checked").length === 3) {
        $("#faction_doctrines input").each(function() {
            $(this).parent("label").addClass("disabled");
        });
    }
    if ($(".doctrines-checkbox:checked").length >= 4) {
        $(this).prop("checked", false);
    }
    $("#faction_doctrines input").each(function() {
        if ($(this).is(':checked') || $(".doctrines-checkbox:checked").length < 3) {
            $(this).parent("label").removeClass("disabled");
        }
    });
    showValues();
});

if ($(".doctrines-checkbox:checked").length === 3) {
    $("#faction_doctrines input").each(function() {
        $(this).parent("label").addClass("disabled");
    });
}
$("#faction_doctrines input").each(function() {
    if ($(this).is(':checked') || $(".doctrines-checkbox:checked").length < 3) {
        $(this).parent("label").removeClass("disabled");
    }
});

//Check for race switch
$("input[name='r']").change(function() {
    switchRaces($(this));
});

//Greyscale all other elites after three picked
if ($(".elites input.single-checkbox:checked").length === 3) {
    $(".elites label").addClass("disabled");
    $(".elites input.single-checkbox:checked").each(function() {
        $(this).parent("label").removeClass("disabled");
    });
}

//Greyscale all other elites after three picked
$(document).on('change', '.elites input.single-checkbox', function() {
    if ($(".elites input.single-checkbox:checked").length === 3) {
        $(".elites label").addClass("disabled");
        $(".elites input.single-checkbox:checked").each(function() {
            $(this).parent("label").removeClass("disabled");
        });
    }
});

//Disable selected elites in other columns
$(document).on('change', '#firstElite input.single-checkbox', function() {
    changed = $(this).val();
    first_elite = changed;
    firstEliteName = $(this).attr('alt');
    $("#firstElite_name").text(firstEliteName);
    disableRadio("#secondElite", "#thirdElite", first_elite);
    $("#firstEliteDoc_name").html("");
    $('#firstEliteDocsHolder').children().hide();
    e = 'td#firstEliteDocs #' + changed;
    $(e).show();
});

$(document).on('change', '#secondElite input.single-checkbox', function() {
    changed = $(this).val();
    second_elite = changed;
    secondEliteName = $(this).attr('alt');
    $("#secondElite_name").text(secondEliteName);
    disableRadio("#firstElite", "#thirdElite", second_elite);
    $("#secondEliteDoc_name").html("");
    $('#secondEliteDocsHolder').children().hide();
    e = 'td#secondEliteDocs #' + changed;
    $(e).show();
});

$(document).on('change', '#thirdElite input.single-checkbox', function() {
    changed = $(this).val();
    third_elite = changed;
    thirdEliteName = $(this).attr('alt');
    $("#thirdElite_name").text(thirdEliteName);
    disableRadio("#secondElite", "#firstElite", third_elite);
    $("#thirdEliteDoc_name").html("");
    $('#thirdEliteDocsHolder').children().hide();
    e = 'td#thirdEliteDocs #' + changed;
    $(e).show();
});


//Show Elite Doctrine Names
$(document).on('change', '#firstEliteDocs input', function () {
    firstEliteDocName = $(this).attr('alt');
    $("#firstEliteDoc_name").text(firstEliteDocName);
    $("#firstEliteDoc_name").show();
});

$(document).on('change', '#secondEliteDocs input', function () {
    secondEliteDocName = $(this).attr('alt');
    $("#secondEliteDoc_name").text(secondEliteDocName);
    $("#secondEliteDoc_name").show();
});

$(document).on('change', '#thirdEliteDocs input', function () {
    thirdEliteDocName = $(this).attr('alt');
    $("#thirdEliteDoc_name").text(thirdEliteDocName);
    $("#thirdEliteDoc_name").show();
});

//tooltip code
$(function() {
    $(document).tooltip({
        tooltipClass: "tooltips",
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $(this).addClass(feedback.vertical);
            }
        },
        content: function() {
            return this.getAttribute("title");
        }
    });
});

//Copy to Clipboard code
function copyToClipboard() {
    var values = [];
    var r = $('input[name=r]:checked', '#form').val();
    console.log(r);
    values.push(r);
    var e1 = $('input[name=e1]:checked', '#form').val();
    console.log(e1);
    values.push(e1);
    var e1d = $('input[name=e1d]:checked', '#form').val();
    console.log(e1d);
    values.push(e1d);
    var e2 = $('input[name=e2]:checked', '#form').val();
    console.log(e2);
    values.push(e2);
    var e2d = $('input[name=e2d]:checked', '#form').val();
    console.log(e2d);
    values.push(e2d);
    var e3 = $('input[name=e3]:checked', '#form').val();
    console.log(e3);
    values.push(e3);
    var e3d = $('input[name=e3d]:checked', '#form').val();
    console.log(e3d);
    values.push(e3d);
    $('#faction_doctrines input:checked').each(function() {
        console.log($(this).attr('value'));
        values.push($(this).attr('value'));
    });

    //Generate URL
    values.clean(undefined);
    var url = "view.html?";
    $.each(values, function(ind,val) {
        url = url + val + ",";
        console.log(url);
    });
    var url = url.slice(0,-1);
    console.log(url);
    $('#results').val(url);
    $('#results').select();
    document.execCommand("copy");
}

$('a.copy').click(function() {
    copyToClipboard();
});