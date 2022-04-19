// LINDENMAYER.JS - L-System generative system
// Uses known L systems and randomness to generate art

"use strict";

// Canvas variable
let c;

// Holds the current result after iteration
let sentence;
// Variable for drawing the diagram
let len, angle, startingPt, palette, backgroundColor;
// Holds the rules of the L system
let rules = [];

// Will hold all rulesets (see setup)
let RULESETS;

// Listeners for buttons
document.getElementById("growButton").addEventListener("click",generateSentence);
document.getElementById("restartButton").addEventListener("click",newDiagram);
document.getElementById("saveButton").addEventListener("click",saveDiagram);

// Some colors stored in arrays
const PALETTES = [

    // Pastel
    ["#FBF8CC","#FDE4CF","#FFCFD2","#F1C0E8","#CFBAF0","#A3C4F3","#90DBF4","#8EECF5","#98F5E1","#B9FBC0",],
    // Synthwave
    ["#FFBE0B","#FB5607","#FF006E","#8338EC","#3A86FF",],
    // Coffee
    ["#EDE0D4","#E6CCB2","#DDB892","#B08968","#7F5539",],
    // Red n Blue
    ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
    // Forest
    ["#e9f5db", "#cfe1b9", "#b5c99a", "#97a97c", "#87986a", "#718355"],
    // Heatwave
    ["#ff7b00", "#ff8800", "#ff9500", "#ffa200", "#ffaa00", "#ffb700", "#ffc300", "#ffd000", "#ffdd00", "#ffea00"],
    // Reptile
    ["#05668d","#028090","#00a896","#02c39a","#f0f3bd"],
    // Purp
    ["#240046","#3c096c","#5a189a","#7b2cbf","#9d4edd","#c77dff","#e0aaff"],

];

// Creates the canvas, the rules and calls for a new diagram to be drawn 
function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    // Rulesets contain a config rule and various transform rules
    // Config: Axiom = starting state, Angle = preferred angle for best results, starting point = where to draw from
    // Rule: If the current state is A, turn it into B.
    RULESETS = [
        [{axiom: "F", angle: 25, start: {x: width/2, y: height}},{a: "F", b: "FF+[+F-F-F]-[-F+F+F]"}], // Tree1 (25 deg)
        [{axiom: "G", angle: 25, start: {x: width/2, y: height}},{a: "G", b: "F+[[G]-G]-F[-FG]+G"}, {a: "F", b:"FF"}], // Tree2 (25 deg)
        [{axiom: "F", angle: 90, start: {x: width/2, y: height/2}},{a: "F", b: "F+G"}, {a: "G", b:"F-G"}], // Dragon curve (90 deg)
        [{axiom: "F", angle: 60, start: {x: width/2, y: height}},{a: "F", b: "G-F-G"}, {a: "G", b: "F+G+F"}], // Sierpinsky hexagon (60 deg)
        [{axiom: "F-G-G", angle: 120, start: {x: width, y: height}},{a: "F", b: "F-G+F+G-F"}, {a: "G", b: "GG"}], // Sierpinsky triangle (120 deg)
        [{axiom: "A", angle: 90, start: {x: 0, y: height}},{a: "A", b: "+BF-AFA-FB+"}, {a: "B", b: "-AF+BFB+FA-"}] // Hilbert Curve (90 deg)
    ];

    newDiagram();

}

// Generates a new diagram by selecting new rules and resetting all parameters
function newDiagram(){

    // Select a new L system to generate
    selectRules();

    // reset the length of the elementary unit
    len = document.getElementById("length").value;

    // Select a new color palette
    palette = random(PALETTES);
    backgroundColor = random(palette);

    // Draw the current state
    drawSentence();

}

// Function which selects and stores a new ruleset for the diagram to obey
function selectRules(){

    // Empty current ruleset
    rules = [];

    // Select a new ruleset and push it into the rules[] array
    let temp = random(RULESETS);
    temp.forEach(rule => rules.push(rule));
    
    // The first rule is the config rule, remove it from rules
    let config = rules[0];
    rules.splice(0,1);

    // Set the parameters according to config
    sentence = config.axiom;
    angle = config.angle;
    startingPt = config.start;

}

// Reads the sentence and draws it according to the set of rules
function drawSentence(){

    // Draw the BG
    background(backgroundColor);

    // Return the transform matrix to default
    resetMatrix();

    // Move ot the starting point of this diagram
    translate(startingPt.x, startingPt.y);

    // Retrieve angle offset and stroke from sliders
    let angleOffset = document.getElementById("angleOffset").value;
    let strokeW = document.getElementById("strokeWeight").value;

    // For each character in the sentence, do its associated instruction
    for (let i = 0; i< sentence.length; i++){

        let current = sentence.charAt(i);
        // Find what to do for any given char
        switch(current){

            case "F": // F = line
                stroke(random(palette));
                strokeWeight(strokeW);
                line(0,0,0,-len);
                translate(0,-len);
                break;

            case "G": // G = line
                stroke(random(palette));
                strokeWeight(strokeW);
                line(0,0,0,-len);
                translate(0,-len);
                break;

            case "+": // + = rotation left
                angleMode(DEGREES);
                rotate(angle + random(-angleOffset, angleOffset));
                break;

            case "-": // - = rotation right
                angleMode(DEGREES);
                rotate(-angle + random(-angleOffset, angleOffset));
                break;

            case "[": // [ = push
                push();
                break;

            case "]": // ] = pop
                pop();
                break;

        }

    }
}

// Analyzes current sentence and generates a new one based on the rules, calls to draw the sentence afterwards
function generateSentence(){

    // Decrease length of branches in subsequent calls
    len *= document.getElementById("truncation").value;

    // Empty temporary sentence
    let nextSentence = "";

    // For each character in the current sentence, check it against all rules
    for (let i = 0; i < sentence.length ; i ++){

        let current = sentence.charAt(i);
        let foundCharWithRule = false;

        for (let j = 0 ; j < rules.length; j++){
            // If a character matches a rule, add the result of the rule to the temp
            if(current == rules[j].a){
                nextSentence += rules[j].b;
                foundCharWithRule = true;
                break;
            }
        }

        if(!foundCharWithRule){
            // Otherwise, if no rule is associated with the character, simply add the character to temp
            nextSentence += current;
        }
    }

    // Set the sentence to the temp
    sentence = nextSentence;
    //console.log(sentence);

    // Illustrate the sentence
    drawSentence();
}

// Handles keyboard input
function keyPressed(){
    switch(keyCode){
        case 81: // Q - grow
            generateSentence();
            break;

        case 82: // R - restart 
            newDiagram();
            break;

        case 83: // S - Save
            saveCanvas("Grid","png");
            break;
    }
}

// Function that saves the diagram
function saveDiagram(){
    saveCanvas("Lindenmayer","png");
}