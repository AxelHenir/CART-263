
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

}


// Triggers a fade out when a line is clicked
function changeLine(event) {

    fadeOut(event.target, 1);

}

// Reduces the opacity of the provided element until it reaches zero then changes its line and triggers a fade in
function fadeOut(element, opacity) {
    // Change the opacity of the line
    opacity -= 0.01;
    element.style[`opacity`] = opacity;
    // Check if the opacity is greater than 0...
    if (opacity > 0) {
    // If so, keep fading on the next frame
    // Note the use of an anonymous function here so we can pass
    // arguments to fadeOut()
    requestAnimationFrame(function() {
        fadeOut(element, opacity);
        });
    }
    else {
    // If not, we can switch lines and fade in...
    // Set a new line of poem for the element
    setNewLine(element);
    // Trigger a fade in
    fadeIn(element, 0);
    }
}

// Increases the opacity of the provided element until it reaches 1 and then stops.
function fadeIn(element, opacity) {
  // Increase the opacity
    opacity += 0.01;
    element.style[`opacity`] = opacity;
  // Check if opacity is still less than 1
    if (opacity < 1) {
    // Keep fading. Note the use of an anonymous function here so we
    // can pass arguments to fadeIn()
    requestAnimationFrame(function() {
        fadeIn(element, opacity);
        });
    }
    else {
    // Do nothing - we're done!
    }
}


// Sets the text of the element to a randomly chosen haiku line, accounting for syllables
function setNewLine(element) {
    if (element === document.getElementById(`line-1`) || element === document.getElementById(`line-3`)) {
    // If the element is line1 or line3, use five syllables
    element.innerText = random(haikuLines.fiveSyllables);
    }
    else {
    // If the element is line2 use seven
    element.innerText = random(haikuLines.sevenSyllables);
    }
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}