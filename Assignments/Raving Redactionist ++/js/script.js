// Raving Redactionist ++ Exercise 6
// Alex Henri - 40108348
"use strict";


// The chance a span will be revealed per update
const REVEAL_PROBABILITY = 0.1;

// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;

// A place to store the jQuery selection of all secrets
let $secrets;

setup();

// begin playing music once the document has loaded
$("document").ready(function(){

    let t = document.getElementById("introTrack");

    t.volume = 0.50;

    t.loop = false;
    
    t.play();

    // after intro track (14700 ms), start looping main song and start start the actual game
    setTimeout(function(){

        let l = document.getElementById("loopingTrack");

        l.volume = 0.50;

        l.loop = true;

        l.play();

        gameStart();

    }, 14700); 

});

//Sets the click handler and starts the time loop
function setup() {

    // Save the selection of all secrets
    $secrets = $(`.secret`);

    // Set a click handler and callback function (redact) on the secrets
    $secrets.on(`click`, redact);

    // Set an interval of 500 milliseconds to attempt the revelation of secrets
    setInterval(revelation, UPDATE_FREQUENCY);

};

// Starts the game
function gameStart(){


    // Change the scene to 

}

// Redaction = removing revealed class and adding redacted class
function redact() {
    $(this).removeClass(`revealed`);
    $(this).addClass(`redacted`);
}

/**
Update is called every 500 milliseconds and it updates all the secrets on the page
using jQuery`s each() function which calls the specified function on _each_ of the
elements in the selection
*/
function revelation() {
    $secrets.each(attemptReveal);
}

/**
With random chance it unblanks the current secret by removing the
redacted class and adding the revealed class. Because this function is called
by each(), "this" refers to the current element that each has selected.
*/
function attemptReveal() {

    let r = Math.random();

    if (r < REVEAL_PROBABILITY) {

        $(this).removeClass(`redacted`);
        $(this).addClass(`revealed`);

    }

}