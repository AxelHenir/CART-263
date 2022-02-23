
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

// Set up the starting lines
setupLines();

// Listen for clicks on each element and respond by changing them
addListeners();

// Inserts text into the 3 lines of the haiku from haikuLines
function setupLines() {

    document.getElementById(`line-1`).innerText = random(haikuLines.fiveSyllables);
    document.getElementById(`line-2`).innerText = random(haikuLines.sevenSyllables);
    document.getElementById(`line-3`).innerText = random(haikuLines.fiveSyllables);

}

// Adds event listeners for changing each line of the poem
function addListeners() {

    document.getElementById(`line-1`).addEventListener(`click`, changeLine);
    document.getElementById(`line-2`).addEventListener(`click`, changeLine);
    document.getElementById(`line-3`).addEventListener(`click`, changeLine);
    
    document.getElementById(`new-poem-button`).addEventListener(`click`, newPoem);

}

// Triggers a fade out when a line is clicked
function changeLine(event) {

    // Check if the classList contains the visible class
    if(event.target.classList.contains("visible")){

        // If it does, remove it and add the hidden class.
        event.target.classList.remove("visible");
        event.target.classList.add("hidden");

        // When the transition finishes, change the line and fade back in
        setTimeout(
            function(){
                setNewLine(event.target);
            }, 
            1000);

    }

}

// Sets the text of the element to a randomly chosen haiku line from the respective array
function setNewLine(element) {

    if (element === document.getElementById(`line-1`) || element === document.getElementById(`line-3`)) {

        // If the element is line1 or line3, use five syllables
        element.innerText = random(haikuLines.fiveSyllables);

    } else {

        // If the element is line2 use seven
        element.innerText = random(haikuLines.sevenSyllables);

    }

    // Remove the hidden class and add the visible class
    element.classList.remove("hidden");
    element.classList.add("visible");

}

// Returns a random element from a given array
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function newPoem(){
    
}

