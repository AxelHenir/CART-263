// Raving Redactionist ++ Exercise 6
// Alex Henri - 40108348
"use strict";

// Chnces that specific partyers become criminals upon investigation
const PARTYER_BECOMES_CRIMINAL_CHANCE = 0.05;
const TROUBLE_MAKER_BECOMES_CRIMINAL_CHANCE = 0.85;
const PARTYER_BECOMES_TROUBLE_MAKER_CHANCE = 0.15;

// Chance that every update, the partyer wants to change its text
const CHAT_CHANCE = 1;

// How often a chat check is rolled to change the dialogue of a random crowd member
const CHAT_INTERVAL = 100;

// How often to update the spans (potentially revealing them)
const TROUBLE_MAKER_INTERVAL = 500;

// How often the dancers change appearance
const DANCE_SPEED = 500;

// The sounds of the jungle
const PARTYING_LINES = ["Party Animal ", "Raver ", "WOOOHOOOO ", "Superfan ", "Vibing ", "Carefree", "HELLL YEAH", "Hahahahaha!"];
const TROUBLE_MAKER_LINES = ["Cm'ere baby.. ","What're you lookin at? ", "suspicious crowd ", "HELP ME!! ", "What if we.. ", "Hey man, watch it! ", "lookin' to buy? "];
const INNOCENT_LINES = ["Hey man, what gives?! ","You're ruining the vibe dude. ","Cmon bro ","I'm innocent dude, back off. ","I've done nothing wrong! "];
const CRIMINAL_LINES = ["switchblade ","sexual harasser "," narcotics ","SHIT, IT'S THE FUZZ! ","knife ", "gun ","drugs ","extrotion ","too close, bud. ","illegal substance "]; 

// A place to store the jQuery selection of all partyers and investigatees
let $ravers, $partying, $investigatees;

let firstTime = true;

setup();

// begin playing music once the document has loaded
$("#dancefloor").click(function(){

    if(firstTime){

        firstTime =false;
        
        let t = document.getElementById("introTrack");

        t.volume = 0.30;
    
        t.loop = false;
        
        t.play();
    
        // after intro track (14700 ms), start looping main song
        setTimeout(function(){
    
            let l = document.getElementById("loopingTrack");
    
            l.volume = 0.50;
    
            l.loop = true;
    
            l.play();
    
            setTimeout(function(){
                setInterval(changeRaverAppearance,DANCE_SPEED);
            },800);
            
    
        }, 14700);
    }

});

//Sets the click handler and starts the time loop
function setup() {

    // Add a crowd of partyers to the dancefloor
    addRavers(500);

    $ravers = $(".partyer");

    // Set a click handler and callback function (redact) on the secrets
    $ravers.on("click", investigate);

    // Set an interval to check if a raver becomes unlawful
    setInterval(testLawfulness, TROUBLE_MAKER_INTERVAL);

    // Set an interval to check if the chats change
    setInterval(updateChat, CHAT_INTERVAL);

};

// Adds the amount of partyers to the dancefloor
function addRavers(amount){

    // Make all new partyers
    for (let i = 0 ; i < amount ; i ++){

        let $newPartyer = $("<span></span>");
        $newPartyer.addClass("partyer").addClass("partying");
        let newText = PARTYING_LINES[Math.floor(Math.random()*PARTYING_LINES.length)];
        $newPartyer.text(newText);
        $($newPartyer).appendTo("#dancefloor");

    }

    // Reselect all partying
    $partying = $(".partying");

}


// Investigates a partyer. Removes partying class, adds being-investiagted class
function investigate() {

    // If it's a partyer, turn it to criminal (low chance) or innocent
    if($(this).hasClass("partying")){

        $(this).removeClass("partying");
        let r = Math.random();
        if(r < PARTYER_BECOMES_CRIMINAL_CHANCE){
            $(this).addClass("criminal");
            let newText = CRIMINAL_LINES[Math.floor(Math.random()*CRIMINAL_LINES.length)];
            $(this).text(newText);
        } else {
            $(this).addClass("innocent");
            let newText = INNOCENT_LINES[Math.floor(Math.random()*INNOCENT_LINES.length)];
            $(this).text(newText);
        }
        $(this).addClass("being-investigated");

    // If it's a troublemaker, turn it to criminal or innocent (low chance)
    } else if($(this).hasClass("trouble-maker")){

        $(this).removeClass("trouble-maker");
        let r = Math.random();
        if(r < TROUBLE_MAKER_BECOMES_CRIMINAL_CHANCE){
            $(this).addClass("criminal");
            let newText = CRIMINAL_LINES[Math.floor(Math.random()*CRIMINAL_LINES.length)];
            $(this).text(newText);
        } else {
            $(this).addClass("innocent");
            let newText = INNOCENT_LINES[Math.floor(Math.random()*INNOCENT_LINES.length)];
            $(this).text(newText);
        }
        $(this).addClass("being-investigated");

    // If it's an innocent, turn it to partyer
    } else if($(this).hasClass("innocent")){

        $(this).removeClass("innocent");
        $(this).addClass("partying");
        let newText = PARTYING_LINES[Math.floor(Math.random()*PARTYING_LINES.length)];
        $(this).text(newText);
        $(this).removeClass("being-investigated");
        

    // If it's a criminal, turn it back into partyer and add a point to the counter
    } else if($(this).hasClass("criminal")){

        $(this).removeClass("criminal");
        $(this).addClass("partying");
        let newText = PARTYING_LINES[Math.floor(Math.random()*PARTYING_LINES.length)];
        $(this).text(newText);
        $(this).removeClass("being-investigated");

    }

    // Reselect investigatees and partying
    $partying = $(".partying");
    $investigatees = $(".being-investigated");

}

// Tests to see if a random partying wants to change what it's saying
function updateChat(){
    
    let rng = Math.random();

    if(rng < CHAT_CHANCE){

        let r = Math.floor(Math.random() * $partying.length);
        let $p = $($partying[r]);

        if($p.hasClass("partying")){

            let newText = PARTYING_LINES[Math.floor(Math.random()*PARTYING_LINES.length)];
            $p.text(newText);

        } else if($p.hasClass("trouble-maker")){

            let newText = TROUBLE_MAKER_LINES[Math.floor(Math.random()*TROUBLE_MAKER_LINES.length)];
            $p.text(newText);

        } else if($p.hasClass("innocent")){

            let newText = INNOCENT_LINES[Math.floor(Math.random()*INNOCENT_LINES.length)];
            $p.text(newText);

        } else {

            let newText = CRIMINAL_LINES[Math.floor(Math.random()*CRIMINAL_LINES.length)];
            $p.text(newText);

        }

    }

}

// Tests the willpower of the partyer to not become a trouble maker (random chance to become trouble maker)
function testLawfulness() {

    let r = Math.random();

    if (r < PARTYER_BECOMES_TROUBLE_MAKER_CHANCE) {

        let m = Math.floor(Math.random() * $partying.length);

        let $p = $($partying[m]);

        $p.removeClass("partying");
        $p.addClass("trouble-maker");

        let newText = TROUBLE_MAKER_LINES[Math.floor(Math.random()*TROUBLE_MAKER_LINES.length)];
        $p.text(newText);

    }

}

function changeRaverAppearance(){

    let colors = ["#5ee7ff","#2793db","#00d6ab","#e91fff","#1cff4d"];

    let dangerous = ["#ff144b","#b50000","#ffad14","#ff6314"];

    $partying.each(function(){

        if($(this).hasClass("trouble-maker")){
            let c = dangerous[Math.floor(Math.random()*dangerous.length)];
            $(this).css("color",c);
        } else {
            let c = colors[Math.floor(Math.random()*colors.length)];
            $(this).css("color",c);
        }
        
    });

    let backgrounds = ["#000000","#17d1ff","#ff17c9","#17ff36"]
    let c = backgrounds[Math.floor(Math.random()*backgrounds.length)]
    $("#dancefloor").css("background-color",c);
}

