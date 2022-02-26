
"use strict";

// Our pre-made haiku lines
let haikuLines = {
    fiveSyllables: [
    `O, to be a tree`,
    `The cat does not know`,
    `We are all forests`,
    `You have done your best`,
    `They are all gone now`,
    "spaghetti on the stove",
    "Invest in a vest",
    "You, you're not the best",

    ],
    sevenSyllables: [
    `Say the things left unsaid`,
    `Never believe the wind's lies`,
    `The autumn stretches its legs`,
    `Nothing can satisfy you`,
    `They will not come back again`,
    "Can't stand to me with that chest",
    "Omae wa mo.. shindeiru",

    ]
};

// Add an eventlistener for the button
document.getElementById(`new-poem-button`).addEventListener(`click`, newPoem);

// Add an eventlistener for the haiku background div
document.getElementById(`haiku`).addEventListener(`click`, changeColor);

// Lines array to hold the 3 lines of our haiku
let lines = document.querySelectorAll(`.line`);

// Adds click listeners for each line
lines.forEach(addClickListener);

// Write a new poem
newPoem();


// ========================== FUNCTIONS ============================


// Adds a click listener for a given element
function addClickListener(element) {

    element.addEventListener(`click`, function()
    {
        fadeLine(element);
    });

}

// Triggers a fade out when a line is clicked
function fadeLine(element) {

    // Check if the classList contains the visible class
    if(element.classList.contains("visible")){

        // If it does, remove it and add the hidden class.
        element.classList.remove("visible");
        element.classList.add("hidden");

        // When the transition finishes, change the line's text with setLine and fade back in
        setTimeout(
            function(){
                setNewLine(element);
            }, 
            1000);

    }

}

// Sets the text of the element to a randomly chosen haiku line from the respective array
function setNewLine(element) {

    // Valid verse will track if the new line matched the previous or another line currently in the poem
    let invalidVerse = true;

    // Tracks the current verse
    let currentText = element.innerText;

    
    while(invalidVerse){

        // Check which line we are switching
        switch(element.id){

            case "line-1":

                // Generate a new line
                element.innerText = random(haikuLines.fiveSyllables);

                // Check to see if this new line matches the last and other 5 syllable line
                if(currentText === element.innerText || element.innerText === document.getElementById("line-3").innerText){

                    // If either were true, set the verse to invalid
                    invalidVerse = true;

                } else {

                    // Otherwise, the verse is valid
                    invalidVerse = false;

                }

                break;

            case "line-2":

                // Generate a new line 
                element.innerText = random(haikuLines.sevenSyllables);

                // Check to see if this new line matches the last and other 5 syllable line
                if(currentText === element.innerText){

                    // If it was the same, set the verse to invalid
                    invalidVerse = true;

                } else {

                    // Otherwise, the verse is all good
                    invalidVerse = false;
                }

                break;

            case "line-3":

                // Generate a new line
                element.innerText = random(haikuLines.fiveSyllables);

                // Check to see if this new line matches the last and other 5 syllable line
                if(currentText === element.innerText || element.innerText === document.getElementById("line-1").innerText){

                    // If either were true, set the verse to invalid
                    invalidVerse = true;

                } else {

                    // Otherwise, the verse is valid
                    invalidVerse = false;

                }

                break;

        }

        //invalidVerse = false;

    }

    // Remove the hidden class and add the visible class
    element.classList.remove("hidden");
    element.classList.add("visible");

}

// Returns a random element from a given array
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generates a new poem
function newPoem(){
    lines.forEach(fadeLine);
    changeColor();
}

function changeColor(){

    // Random integer between 0 and 360
    let newHue = Math.floor(Math.random() * 359); 

    // Set the background color to the new color
    document.getElementById("haiku").style.backgroundColor = `hsl(${newHue}, 100%, 50%)`;

}
