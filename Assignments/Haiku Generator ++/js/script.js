
"use strict";

// Our pre-made haiku lines
let haikuLines = {
    fiveSyllables: [
    `O, to be a tree`,
    `The cat does not know`,
    `We are all forests`,
    `You have done your best`,
    `They are all gone now`
    ],
    sevenSyllables: [
    `Say the things left unsaid`,
    `Never believe the wind's lies`,
    `The autumn stretches its legs`,
    `Nothing can satisfy you`,
    `They will not come back again`
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

    // Check if the line needs 5 or 7 syllables
    if(element.id === `line-2`){

        element.innerText = random(haikuLines.sevenSyllables);

    } else {

        element.innerText = random(haikuLines.fiveSyllables);

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
