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
    });
  } else {
    // User is signed out.
    document.getElementById('sign-in-status').textContent = 'Currently not logged in!';
    document.getElementById('sign-in').textContent = 'Sign in';
  }
}, function(error) {
  console.log(error);
});
};

window.addEventListener('load', function() {
  initApp()
});

function getMetadata(build) {
  switch (build.r) {
    case "sm":
      build.race = "spacemarines";
      switch (build.e1) {
        case "kti":
          build.e1 = "killteamironmaw";
          build.e1tip = "<h2>Kill Team Ironmaw</h2><h3>Assassin</h3>Flexible ranged infantry squad that can choose between weapon packages when deployed. Their vortex grenades slow enemies and mark them for death, dealing damage over time and remaining as long as the Deathwatch attack the target.";
          break;
      }
      
      switch (build.e1d) {
        case "ktic":
          build.e1d = "killteam1";
          build.e1dtip = "<h2>Death Watch Command - Land Speeder Mark</h2>Land Speeders apply a Debuff to their target. Increases Damage Taken and Reveals the target for a duration. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
          break;
      }
      break;
  }
}

var ref = firebase.database().ref("builds");

ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var build = childSnapshot.val();
      getMetadata(build);
      
      
      $("#build_list").append(
        "<tr><td>"+ build.votes + "</td><td><img src='images/races/"+ build.race + ".png' /></td><td>"+ build.title +"</td><td>"+ build.author + "</td><td>"+ build.favs + "</td><td><img src='images/"+ build.r + "/elites/"+ build.e1 + ".png' title='"+ build.e1tip +"'/><img src='images/"+ build.r + "/elitedoctrines/"+ build.e1d + ".png' title='"+ build.e1dtip + "'/></td><td><img src='images/"+ build.r + "/elites/"+ build.e2 + ".png' title='"+ build.e2tip +"'/><img src='images/"+ build.r + "/elitedoctrines/"+ build.e2d + ".png' title='"+ build.e2dtip + "'/><td><img src='images/"+ build.r + "/elites/"+ build.e3 + ".png' title='"+ build.e3tip +"'/><img src='images/"+ build.r + "/elitedoctrines/"+ build.e3d + ".png' title='"+ build.e3dtip + "'/></td></td><td><img src='images/"+ build.r +"/doctrines/"+build.d1+".png'/><img src='images/"+ build.r +"/doctrines/"+build.d2+".png'/><img src='images/"+ build.r +"/doctrines/"+build.d3+".png'/></td><td><a href='view.html?"+ childSnapshot.key +"'>View</a></td></tr>"
      );
    });
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