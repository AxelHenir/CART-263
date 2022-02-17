// CART 263 Project 1 - Ender's Game
// Alex Henri - Concordia University Winter 2022

// State machine to track program state
let state = undefined;

// Typewriter for typing effects on screen
let typeWriter = undefined;
const TYPEWRITER_SPEED = 25;

// Script for the game
let script = undefined;
const SCRIPT_LOCATION = "assets/json/script.json";

function preload(){

  // Load the script from JSON
  script = loadJSON(SCRIPT_LOCATION);

}

function setup() {

  createCanvas(1000,1000);

  // New state object, pass it the script too.
  state = new State(script.script);

  // New typewriter object, it requires a speed (delay between characters (ms))
  typeWriter = new Typewriter(TYPEWRITER_SPEED);

  // Various display settings
  textAlign(CENTER, CENTER);

}

function draw() {

  background(200);
  
  // Updates the typewriter's clock
  typeWriter.updateTypewriter();

  // Print the text
  push();
  fill(0);
  text(typeWriter.typedText(state.line),width/2,height/2);
  pop();

  // Draw the scene

}

// Handles keyboard input
function keyPressed(){

  switch(keyCode){

    case 81: // Q = next line
    state.nextLine();
    typeWriter.index = 0;
    break;

  }
}

