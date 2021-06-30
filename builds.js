"use strict";

//*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};

//Get Race Name and Description Function
function getRaceData(build) {
    switch (build.r) {
        case "sm":
            build.race = "spacemarines";
            build.rTip = "<h2>Space Marines</h2>The Space Marines or Adeptus Astartes are foremost amongst the defenders of humanity, the greatest of the Emperor of Mankinds warriors. They are barely human at all, but superhuman; having been made superior in all respects to a normal man by a harsh regime of genetic modification, psycho-conditioning and rigorous training. Space Marines are untouched by plague or any natural disease and can suffer wounds that would kill a lesser being several times over, and live to fight again. Clad in ancient Power Armour and wielding the most potent weapons known to Man, the Space Marines are terrifying foes and their devotion to the Emperor and the Imperium of Man is unyielding. They are the God-Emperors Angels of Death, and they know no fear."
            break;
        case "ork":
            build.race = "orks";
            build.rTip = "<h2>Orks</h2>The Orks, also called Greenskins, are a savage, warlike, green-skinned race of humanoids who are spread all across the Milky Way Galaxy. They are seen by their enemies (pretty much everyone else in the universe) as savage, warlike, and crude, but they are the most successful species in the whole galaxy, outnumbering possibly every other intelligent race, even Mankind."
            break;
        case "eld":
            build.race = "eldar";
            build.rTip = "<h2>Eldar</h2>The Eldar or Aeldari as they were known in the Eldar Lexicon before the fall of their lost realm, are an ancient humanoid alien race whose vast empire once extended the width and breadth of the known galaxy. Their empire was without equal, and they counted themselves masters of the stars. But millennia ago, their overweening pride and their fall into hedonistic practices led to a cataclysm that all but eradicated their kind and led to the birth of the Chaos God Slaanesh. Despite their boundless power, the heart of their civilisation was torn out by this catastrophe of their own making, forcing the surviving Eldar to flee upon gigantic, continent-size starships called Craftworlds. Now they cling to survival by a thread, fighting the horrors of the galaxy with ritualised discipline and consummate skill. Though highly advanced and feared across the galaxy, the Eldar are a dying people -- a shadow of their former glory -- and their race teeters on the brink of annihilation."
            break;
    }
}

//Get Elite Name and Description Function
function getEliteData(elite, tip) {
    switch (elite) {
        case "kti":
            elite = "killteamironmaw";
            tip = "<h2>Kill Team Ironmaw</h2><h3>Assassin</h3>Flexible ranged infantry squad that can choose between weapon packages when deployed. Their vortex grenades slow enemies and mark them for death, dealing damage over time and remaining as long as the Deathwatch attack the target.";
            break;
        case "ljo":
            elite = "librarianjonahorion";
            tip = "<h2>Librarian Jonah Orion</h2><h3>Support / Crowd Control</h3>Flexible infantry spellcaster with dual-natured abilities that enhance allies while controlling and damaging enemies. Can summon a ring of stone around himself that absorbs shots and blocks movement.";
            break;
        case "cha":
            elite = "chaplaindiomedes";
            tip = "<h2>Chaplain Diomedes</h2><h3>Support / Tank</h3>Melee infantry unit capable of withstanding conisderable punishment and enhancing allies. Diomedes critical strikes empower his allies and increase in potency the longer he remains in combat.";
            break;
        case "gab":
            elite = "gabrielangelos";
            tip = "<h2>Gabriel Angelos</h2><h3>Nuker / Crowd Control</h3>Melee infantry unit that specializes in high area of effect damage and disruption. Gabriels legendary hammer God-Splitter charges up over time, imbuing his abilities with additional properties.";
            break;
        case "ter":
            elite = "terminators";
            tip = "<h2>Terminators</h2><h3>Nuker</h3>Heavy ranged infatry squad equipped with assault cannons that damage and slow in a line in-front of them. Terminators can teleport into position and bombard an area with cyclone missiles.";
            break;
        case "ast":
            elite = "assaultterminators";
            tip = "<h2>Assault Terminators</h2><h3>Tank / Crowd Control</h3>Heavy melee infatry squad that specializes in killing heavily armoured targets and structures. Can teleport into position and disrupt enemies in a large area.";
            break;
        case "ven":
            elite = "venerabledreadnought";
            tip = "<h2>Venerable Dreadnought</h2><h3>Nuker</h3>Ranged walker effective against heavily armoured targets and structures. Its plasma cannon can unleash a devasting shot that deals high damage and leaves behind a smoldering crater that deals damage over time in an area.";
            break;
        case "imp":
            elite = "imperialknightpaladin";
            tip = "<h2>Imperial Knight Paladin</h2><h3>Tank / Nuker</h3>Super Heavy walker with powerful ranged and melee attacks. The Palidin can project its shield in a direction independent of its own facing, absorbing any shots that would otherwise pass through it.";
            break;
        case "ims":
            elite = "imperialknightsolaria";
            tip = "<h2>Imperial Knight Solaria</h2><h3>Nuker</h3>Super Heavy ranged walker built to deal exceptional area of effect damage to all targets. Sustained attacks will cause her to overheat, reducing movement speed but adding unique properties to her abilities.";
            break;
    }
    return [elite, tip];
}


//Get Elite Doctrine Names and Descriptions Function
function getEliteDocData(eliteD, eliteDtip) {
    switch (eliteD) {
        case "ktic":
            eliteD = "killteam1";
            eliteDtip = "<h2>Death Watch Command - Land Speeder Mark</h2>Land Speeders apply a Debuff to their target. Increases Damage Taken and Reveals the target for a duration. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "ktip":
            eliteD = "killteam2";
            eliteDtip = "<h2>Deathwatch Presence - Death from Above</h2>Deathwatch can be deployed anywhere you have vision. When the Deathwatch are deployed, your other Elites can be deployed around the Deathwatch.";
            break;
        case "ljoc":
            eliteD = "librarian1";
            eliteDtip = "<h2>Jonah Orions Command - Blind Grenade</h2>Scount grenades Blind and Silence the enemy for a duration. The duration increases as you Tier up. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "ljop":
            eliteD = "librarian2";
            eliteDtip = "<h2>Jonah Orions Presence - Standard Stonewall</h2>When Jonah Orion is deployed, the Standard erects a magical barrier in a Circle around itself. Blocks movement and Absorbs shots that pass through it.";
            break;
        case "chac":
            eliteD = "diomedes1";
            eliteDtip = "<h2>Diomedes Command - Final Slam</h2>Instead of dying, the Dreadnought activates Slam and Heals enough to avoid death. Only triggers once. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "chap":
            eliteD = "diomedes2";
            eliteDtip = "<h2>Diomedes Presence - Rosarius</h2>When Diomedes is deployed, elites become temporarirly Invulnerable for a duration instead of dying. Has a long Cooldown between uses.";
            break;
        case "gabc":
            eliteD = "gabriel1";
            eliteDtip = "<h2>Gabriel Angelos Command - Slam Barrier</h2>The Dreadnoughts Slam ability creates a temporary barrier. Absorbs shots and Reflects projectiles. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "gabp":
            eliteD = "gabriel2";
            eliteDtip = "<h2>Gabriel Angelos Presence - Inspiring Drop</h2>When Gabriel is deployed, Drop Pods Heal in a Circle upon landing.";
            break;
        case "terp":
            eliteD = "terminators1";
            eliteDtip = "<h2>Terminators Presence - Devastation</h2>When Terminators are deployed, Devastator Marines with Heavy Bolters no longer have to setup or tear down their weapons.";
            break;
        case "terc":
            eliteD = "terminators2";
            eliteDtip = "<h2>Terminators Command - Focused Shot</h2>Devastors fire a focused lascannon shot at the target vehicle. Causees Silence, Slow and Disables Attacks. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "astp":
            eliteD = "assaultterminators1";
            eliteDtip = "<h2>Assault Terminators Presence - Charging Slam</h2>When the Assault Terminators are deployed, the Dreadnought can charge in the target direction. Causes Damage, Knockback and Vehicle Stuns to units it passes through. At the end of his charge, or when activated during the charge the Dreadnought performs a Slam. They lose the ability to perform Slam without initiating a Charging Slam.";
            break;
        case "astc":
            eliteD = "assaultterminators2";
            eliteDtip = "<h2>Assault Terminators Command - Frag Grenade</h2>Tactical Marines throw a grenade at the target position. Causes Knockback and Damage in a Circle. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "venp":
            eliteD = "venerabledreadnought1";
            eliteDtip = "<h2>Venerable Dreadnoughts Presence - Plasma Storm</h2>When the Venerable Dreadnought is deployed, Tactical Marine Plasma Guns do not overheat.";
            break;
        case "venc":
            eliteD = "venerabledreadnought2";
            eliteDtip = "<h2>Venerable Dreadnoughts Command - Assault Leap</h2>Assault Marines perform a low flying leap in the target direction. Causes Damage to units it passes through. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "impp":
            eliteD = "imperialknightpaladin1";
            eliteDtip = "<h2>Paladins Presence - Piercing Shot</h2>When the Imperial Knight Paladin is deployed, the Predator Destructor can fire a powerful shot in the target direction. The projectile Pierces, doing Damage to units it passes through.";
            break;
        case "impc":
            eliteD = "imperialknightpaladin2";
            eliteDtip = "<h2>Paladins Command - Shield Wall</h2>Devastator Marines gain a Shield if theyve been stationary for a duration. Moving removes the Shield but if it is destroyed or the unit is disabled, it will take time fo rthe Shield to regenerate. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "imsp":
            eliteD = "imperialknightsolaria1";
            eliteDtip = "<h2>Solarias Presence - Inferno Missiles</h2>When Solaria is deployed, Whirlwind rockets leave behind a pool of fire when they explode. Causes Damage over time in a Circle.";
            break;
        case "imsc":
            eliteD = "imperialknightpaladin2";
            eliteDtip = "<h2>Solarias Command - Fire on Move</h2>Tactical Marines equipped with bolters can fire on the move but do so less rapidly than when stationary. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
    }
    return [eliteD, eliteDtip];
}

//Get Doctrine Names and Descriptions Function
function getDocData(doc, docTip) {
    switch (doc) {
        case "blg":
            doc = "blindgrenade";
            docTip = "<h2>Jonah Orions Command - Blind Grenade</h2>Scount grenades Blind and Silence the enemy for a duration. The duration increases as you Tier up. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "fom":
            doc = "fireonmove";
            docTip = "<h2>Solarias Command - Fire on Move</h2>Tactical Marines equipped with bolters can fire on the move but do so less rapidly than when stationary. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "shw":
            doc = "shieldwall";
            docTip = "<h2>Paladins Command - Shield Wall</h2>Devastator Marines gain a Shield if theyve been stationary for a duration. Moving removes the Shield but if it is destroyed or the unit is disabled, it will take time fo rthe Shield to regenerate. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "frg":
            doc = "fraggrenade";
            docTip = "<h2>Assault Terminators Command - Frag Grenade</h2>Tactical Marines throw a grenade at the target position. Causes Knockback and Damage in a Circle. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "pin":
            doc = "pin";
            docTip = "<h2>Pin</h2>Devastators use their heavy bolters to Immobilize the target. The ability is cancelled if the target is Disabled, Jumps, Teleports or is behind a Shot Absorber.";
            break;
        case "hid":
            doc = "hidden";
            docTip = "<h2>Hidden</h2>Snipers that remain stationary in Stealth Cover for a duration gain Stealth that persists even if they leave. Stealth is removed if they attack or get Detected.";
            break;
        case "ove":
            doc = "overwatch";
            docTip = "<h2>Overwatch</h2>Scout Snipers set watch on a Circle around a target position. When an enemy steps into the Circle area, Scout Snipers fire with increased Attack Speed at the target and get a bonus shot for each Charge theyve accumulated. Scout Snipers build up to 10 Charges over time while Overwatch is channeling.";
            break;
        case "tir":
            doc = "tireless";
            docTip = "<h2>Tireless</h2>Tactical Marines increase Speed when not in combat.";
            break;
        case "scs":
            doc = "scoutstrike";
            docTip = "<h2>Scout Strike</h2>When Scouts are Stealthed they do bonus Damage on their initial attack.";
            break;
        case "sld":
            doc = "slowdeath";
            docTip = "<h2>Slow Death</h2>The Tactical Marines Flamer ability Slows Infantry and Immobilizes Vehicles.";
            break;
        case "cvf":
            doc = "coverfire";
            docTip = "<h2>Cover Fire</h2>If Scout Snipers are in Stealth or Heavy Cover their ranged attacks Slow.";
            break;
        case "ims":
            doc = "improvedscope";
            docTip = "<h2>Improved Scope</h2>Devastator Marines have increased weapon range while in Stealth or Heavy Cover.";
            break;
        case "asl":
            doc = "assaultleap";
            docTip = "<h2>Venerable Dreadnoughts Command - Assault Leap</h2>Assault Marines perform a low flying leap in the target direction. Causes Damage to units it passes through. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "fos":
            doc = "focusedshot";
            docTip = "<h2>Terminators Command - Focused Shot</h2>Devastors fire a focused lascannon shot at the target vehicle. Causees Silence, Slow and Disables Attacks. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "thr":
            doc = "thunderhawkredeployment";
            docTip = "<h2>Thunderhawk Re-Deployement</h2>The Whirlwind calls in a Thunderhawk that re-deploys them to the target position after a delay.";
            break;
        case "ded":
            doc = "destructordevastation";
            docTip = "<h2>Destructor Devastation</h2>When a Predator Destructor deals Damage it gains a temporary increase in weapon range and Attack Speed. Can stack multiple times.";
            break;
        case "lwf":
            doc = "lonewolf";
            docTip = "<h2>Lone Wolf</h2>Land Speeders fight harder when they are behind enemy lines. Increases Damage and reduces Damage Taken when not near allies in a Circle.";
            break;
        case "slb":
            doc = "slambarrier";
            docTip = "<h2>Gabriel Angelos Command - Slam Barrier</h2>The Dreadnoughts Slam ability creates a temporary barrier. Absorbs shots and Reflects projectiles. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "lsm":
            doc = "landspeedermark";
            docTip = "<h2>Death Watch Command - Land Speeder Mark</h2>Land Speeders apply a Debuff to their target. Increases Damage Taken and Reveals the target for a duration. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "fis":
            doc = "finalslam";
            docTip = "<h2>Diomedes Command - Final Slam</h2>Instead of dying, the Dreadnought activates Slam and Heals enough to avoid death. Only triggers once. When reaching Level 8, this Doctrine is unlocked to be equipped as an Army Doctrine.";
            break;
        case "aal":
            doc = "ablativearmourlandspeeder";
            docTip = "<h2>Ablative Armour - Landspeeder</h2>Land Speeders gain a Shield that regenerates.";
            break;
        case "ins":
            doc = "invigoratingslam";
            docTip = "<h2>Invigorating Slam</h2>Activating Slam invigorates the Dreadnought. Grants a temporary Shield that increases Speed while active. The bonus is only applied while Invigorating Slam has a Charge.";
            break;
        case "abp":
            doc = "ablativearmourpredator";
            docTip = "<h2>Ablative Armour - Predator</h2>Predators gain a Shield that regenerates.";
            break;
        case "boo":
            doc = "blessingsoftheomnissiah";
            docTip = "<h2>Blessings of the Omnissiah</h2>Production Structures and Listening Posts Heal you and your allies Vehicles in a Circle. Vehicles need to be out of combat for a while before they can Heal this way.";
            break;
        case "tos":
            doc = "tipofthespear";
            docTip = "<h2>Tip of the Spear</h2>Your Listening Posts can be used to Reinforce yours and allied squads as well as Heal Elite Units.";
            break;
        case "ilp":
            doc = "improvedlisteningpost";
            docTip = "<h2>Improved Listening Post</h2>Listening Posts you build have increased Health and do bonus Damage.";
            break;
        case "emi":
            doc = "emperorsinfluence";
            docTip = "<h2>Emperors Influence</h2>Reduces the ability Cooldown of Plant the Standard.";
            break;
        case "ids":
            doc = "improveddeathstorms";
            docTip = "<h2>Improved Deathstorms</h2>Deathstorm Drop Pods remain deployed for a longer period of time.";
            break;
        case "rad":
            doc = "rapiddroppods";
            docTip = "<h2>Rapid Drop Pods</h2>Orbital Relays become available sooner after deploying units from Drop Pods and Thunderhawks.";
            break;
    }
    return [doc, docTip];
}

var user = "tester";

function toggleFav(ref, itemId) {
    ref.transaction(function(item) {
        if (item) {
            if (!item.favCount) {
                item.favCount = 0;
            }
          if (item.favs && item.favs[itemId]) {
            item.favCount--;
            item.favs[itemId] = null;
          } else {
            item.favCount++;
            if (!item.favs) {
              item.favs = {};
            }
            item.favs[itemId] = true;
          }
        }
        return item;
    });
}

// Bind faving action.
var onFavClicked = function(buildId) {
    var globalBuildRef = firebase.database().ref('/builds/' + buildId);
    var userFavCountRef = firebase.database().ref('/users/' + user);
    var userBuildsRef = firebase.database().ref('/users/' + user + '/builds/' + buildId);
    toggleFav(globalBuildRef, user);
    toggleFav(userFavCountRef, buildId);
    toggleFav(userBuildsRef, buildId);
};

function updateFavedByCurrentUser(postElement, faved) {
  if (faved) {
    postElement.getElementsByClassName('faved')[0].style.display = 'inline-block';
    postElement.getElementsByClassName('not-faved')[0].style.display = 'none';
  } else {
    postElement.getElementsByClassName('faved')[0].style.display = 'none';
    postElement.getElementsByClassName('not-faved')[0].style.display = 'inline-block';
  }
}

// $(document).on('click', "a.voteUp", function() {
//     var buildId = $(this).attr("alt");
//     var vote = 1;
//     onVoteClicked(buildId, vote);
//     // addUserVote(buildId, user, vote);
// });

// $(document).on('click', "a.voteDown", function() {
//     var buildId = $(this).attr("alt");
//     var vote = -1;
//     onVoteClicked(buildId, vote);
//     // addUserVote(buildId, user, vote);
// });

$(document).on('click', "a.faved", function() {
    var closestFavNum = $(this).siblings('.favNum');
    var curFavNum = +(closestFavNum.text());
    closestFavNum.text(curFavNum - 1);
    var buildId = $(this).attr("alt");
    onFavClicked(buildId);
});
$(document).on('click', "a.not-faved", function() {
    var closestFavNum = $(this).siblings('.favNum');
    var curFavNum = +(closestFavNum.text());
    closestFavNum.text(curFavNum + 1);
    var buildId = $(this).attr("alt");
    onFavClicked(buildId);
});

var search = "";

$("#searchButton").click( function() {
    search = $("#searchBox").val();
    var searchAlt = $("#searchButton").attr("alt");
    window.location.href = "builds.html?search=" + search + searchAlt;
});

jQuery(document).on('keydown', 'input#searchBox', function(ev) {
    if(ev.which === 13) {
        search = $("#searchBox").val();
        var searchAlt = $("#searchButton").attr("alt");
        window.location.href = "builds.html?search=" + search + searchAlt;

        // Avoid form submit
        return false;
    }
});

var filter = "";
var sort = "";
var sortD;

var r = /(?:\?|&(?:amp;)?)([^=&#]+)(?:=?([^&#]*))/gi; //matches against a kv pair a=b
var query = r.exec(window.location.href); //gets the first query from the url

var parser = function() {
    while (query !== null) {
        var searchAlt = $("#searchButton").attr("alt");

        switch (query[1]) {
            case "filter":
                switch (query[2]) {
                    case "all":
                        $(".sortTitle").attr("href", "builds.html?filter=all&sort=title");
                        $(".sortVotes").attr("href", "builds.html?filter=all&sort=votes");
                        $(".sortFav").attr("href", "builds.html?filter=all&sort=fav");
                        $(".sortDate").attr("href", "builds.html?filter=all&sort=date");
                        $("#searchButton").attr("alt", searchAlt + "&filter=all");
                        $("#filterAll").addClass('selected');
                        filter = "all";
                        break;
                    case "sm":
                        $(".sortTitle").attr("href", "builds.html?filter=sm&sort=title");
                        $(".sortVotes").attr("href", "builds.html?filter=sm&sort=votes");
                        $(".sortFav").attr("href", "builds.html?filter=sm&sort=fav");
                        $(".sortDate").attr("href", "builds.html?filter=sm&sort=date");
                        $("#searchButton").attr("alt", searchAlt + "&filter=sm");
                        $("#filterSm").addClass('selected');
                        filter = "sm";
                        break;
                    case "ork":
                        $(".sortTitle").attr("href", "builds.html?filter=ork&sort=title");
                        $(".sortVotes").attr("href", "builds.html?filter=ork&sort=votes");
                        $(".sortFav").attr("href", "builds.html?filter=ork&sort=fav");
                        $(".sortDate").attr("href", "builds.html?filter=ork&sort=date");
                        $("#searchButton").attr("alt", searchAlt + "&filter=ork");
                        $("#filterOrk").addClass('selected');
                        filter = "ork";
                        break;
                    case "eld":
                        $(".sortTitle").attr("href", "builds.html?filter=eld&sort=title");
                        $(".sortVotes").attr("href", "builds.html?filter=eld&sort=votes");
                        $(".sortFav").attr("href", "builds.html?filter=eld&sort=fav");
                        $(".sortDate").attr("href", "builds.html?filter=eld&sort=date");
                        $("#searchButton").attr("alt", searchAlt + "&filter=eld");
                        $("#filterEld").addClass('selected');
                        filter = "eld";
                        break;
                }
                break;
            case "sort":
                switch (query[2]) {
                    case "title":
                        $(".sortTitle").addClass('selected up').attr("href", "builds.html?sort=titleD");
                        $("#searchButton").attr("alt", searchAlt + "&sort=title");
                        sort = "title";
                        sortD = false;
                        break;
                    case "titleD":
                        $(".sortTitle").addClass('selected down')
                        $("#searchButton").attr("alt", searchAlt + "&sort=titleD");
                        sort = "title";
                        sortD = true;
                        break;
                    case "votes":
                        $(".sortVotes").addClass('selected down').attr("href", "builds.html?sort=votesA");
                        $("#searchButton").attr("alt", searchAlt + "&sort=votes");
                        sort = "votes";
                        sortD = true;
                        break;
                    case "votesA":
                        $(".sortVotes").addClass('selected up');
                        $("#searchButton").attr("alt", searchAlt + "&sort=votesA");
                        sort = "votes";
                        sortD = false;
                        break;
                    case "fav":
                        $(".sortFav").addClass('selected down').attr("href", "builds.html?sort=favD");
                        $("#searchButton").attr("alt", searchAlt + "&sort=favs");
                        sortD = true;
                        sort = "favCount";
                        break;
                    case "favD":
                        $(".sortFav").addClass('selected up');
                        $("#searchButton").attr("alt", searchAlt + "&sort=favD");
                        sortD = false;
                        sort = "favCount";
                        break;
                    case "date":
                        $(".sortDate").addClass('selected up').attr("href", "builds.html?sort=dateD");
                        $("#searchButton").attr("alt", searchAlt + "&sort=dateU");
                        sortD = false;
                        sort = "dateU";
                        break;
                    case "dateD":
                        $(".sortDate").addClass('selected down');
                        $("#searchButton").attr("alt", searchAlt + "&sort=dateU");
                        sortD = true;
                        sort = "dateU";
                        break;

                }
                break;
            case "search":
                search = query[2];
                search = search.toLowerCase().replace("%20", " ");
                $('input#searchBox').text(search);
                break;

        }
        query = r.exec(window.location.href); //repeats to get next capture
    }
}

if (sort === "") {
    sort = "votes";
}

if (filter === "") {
    filter = "all";
}

//Note to self. Try removing entries in the forEach below that don't match the queries above for in-client filtering.

parser();

var ref = firebase.database().ref("builds").orderByChild(sort);
var remove = false;

ref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        remove = false;
        var build = childSnapshot.val();
        if (filter !== "all") {
            if (build.r != filter) {
                remove = true;
            }
        }

        if (!~build.title.toLowerCase().indexOf(search)) {
                remove = true;
            }

        if (!remove) {
            //Get Race Name and Description
            getRaceData(build);

            //Get Elite Name and Description
            var e1 = getEliteData(build.e1);
            build.e1 = e1[0];
            build.e1tip = e1[1];
            var e2 = getEliteData(build.e2);
            build.e2 = e2[0];
            build.e2tip = e2[1];
            var e3 = getEliteData(build.e3);
            build.e3 = e3[0];
            build.e3tip = e3[1];

            //Get Elite Doctrine Names and Descriptions      
            var e1d = getEliteDocData(build.e1d)
            build.e1d = e1d[0];
            build.e1dtip = e1d[1];
            var e2d = getEliteDocData(build.e2d)
            build.e2d = e2d[0];
            build.e2dtip = e2d[1];
            var e3d = getEliteDocData(build.e3d)
            build.e3d = e3d[0];
            build.e3dtip = e3d[1];

            //Get Doctrine Names and Descriptions      
            var d1 = getDocData(build.d1)
            build.d1 = d1[0];
            build.d1tip = d1[1];
            var d2 = getDocData(build.d2)
            build.d2 = d2[0];
            build.d2tip = d2[1];
            var d3 = getDocData(build.d3)
            build.d3 = d3[0];
            build.d3tip = d3[1];

            //Check description lenght and shorten if longer than 141 characters
            if (build.shortDesc.length > 141) {
                build.shortDesc = build.shortDesc.substring(0, 138) + '...';
            } else {
                if (build.shortDesc.length === 0) {
                    build.shortDesc = "None";
                }
            }

            var d = new Date();
            d.setTime(build.dateU);
            d = d.customFormat("#MMM# #DD#th, #YYYY#");

            var row = "<td class='voteTd'>" +
                "<div class='arrowHolder'>" + 
                "<a class='voteUp' alt='" + childSnapshot.key + "' href='#'></a>" + 
                "<a class='voteDown' alt='" + childSnapshot.key + "' href='#'></a>" + 
                "</div>" + 
                "<div class='voteHolder'>" + build.votes + "</div>" + 
                "</td>" + 
                "<td class='favTd'>" + 
                "<a href='#' class='not-faved' alt='" + childSnapshot.key + "'></a>" + 
                "<a href='#' class='faved' alt='" + childSnapshot.key + "'></a>" + 
                "<div class='favNum'>" + build.favCount + "</div>" + 
                "</td>" + 
                "<td>" + 
                "<img class='raceImage' src='images/races/" + build.race + ".png' title='" + build.rTip + "' />" + 
                "</td>" + 
                "<td>" + 
                "<a href='view.html?" + childSnapshot.key + "'>" + build.title + "</a>" + 
                "</td>" + 
                "<td>" + 
                "<a href='user.html?=" + build.author + "'>"+ build.author + "</a>" + 
                "</td>" + 
                "<td>" + 
                d +
                "</td>" + 
                "<td class='eliteTd'>" + 
                "<img src='images/" + build.r + "/elites/" + build.e1 + ".png' title='" + build.e1tip + "'/>" + 
                "<img src='images/" + build.r + "/elitedoctrines/" + build.e1d + ".png' title='" + build.e1dtip + "'/>" + 
                "</td>" + 
                "<td class='eliteTd'>" + 
                "<img src='images/" + build.r + "/elites/" + build.e2 + ".png' title='" + build.e2tip + "'/>" + 
                "<img src='images/" + build.r + "/elitedoctrines/" + build.e2d + ".png' title='" + build.e2dtip + "'/>" + 
                "<td class='eliteTd'>" + 
                "<img src='images/" + build.r + "/elites/" + build.e3 + ".png' title='" + build.e3tip + "'/>" + 
                "<img src='images/" + build.r + "/elitedoctrines/" + build.e3d + ".png' title='" + build.e3dtip + "'/>" + 
                "</td>" + 
                "<td class='docTd'>" + 
                "<img src='images/" + build.r + "/doctrines/" + build.d1 + ".png' title='" + build.d1tip + "'/>" + 
                "<img src='images/" + build.r + "/doctrines/" + build.d2 + ".png' title='" + build.d2tip + "'/>" + 
                "<img src='images/" + build.r + "/doctrines/" + build.d3 + ".png' title='" + build.d3tip + "'/>" + 
                "</td>" + 
                "<td class='desc'>" +
                build.shortDesc +
                "</td>" + 
                "<td>" + 
                "<a href='view.html?" + childSnapshot.key + "'>View</a>" + 
                "</td>";

            var tableRow = document.createElement('tr');
            //Create rows for each build
            if (!sortD) {
                $("#build_list tr#start").before(tableRow);
            } else {
                $("#build_list tr#tHead").after(tableRow);
            }
            
            tableRow.innerHTML = row;
            var postElement = tableRow;
            var fav = postElement.getElementsByClassName('faved')[0];
            var unFav = postElement.getElementsByClassName('not-faved')[0];
            var starredFavedRef = firebase.database().ref('builds/' + childSnapshot.key + '/favs/' + user)
            starredFavedRef.on('value', function(snapshot) {
                updateFavedByCurrentUser(postElement, snapshot.val());
            });

            // unFav.onclick = onFavClicked(childSnapshot.key);
            // fav.onclick = onFavClicked(childSnapshot.key);
        };
    });
});

//tooltip code
$(function() {
    $(document).tooltip({
        // show: {effect: "slideDown", duration: 150},
        // hide: {effect: "slideUp", duration: 150},
        show: 150,
        hide: 150,
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