/*global window */
/*property
    addClass, at, attr, change, children, click, console, content, css, each,
    exec, execCommand, getAttribute, hide, href, is, length, location, log, my,
    on, parent, position, prop, removeAttr, removeClass, reset, select,
    serialize, show, siblings, split, text, tooltip, tooltipClass, using, val,
    vertical
*/
"use strict";

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


function notice(type, str) {
    $(type).text(str);
    $(type).slideDown(500, function() {
        $(type).delay(8000).slideUp(500);
    });
}

function flash(element) {
    $(element).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
}

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