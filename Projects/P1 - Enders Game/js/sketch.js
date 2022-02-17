// CART 263 Project 1 - Ender's Game
// Alex Henri - Concordia University Winter 2022

// State machine to track program state
let state = undefined;

// Script for the game
let script = undefined;
const SCRIPT_LOCATION = "assets/json/script.json";

// A graphics object for all images
let gpu = undefined;

function preload(){

  // Load the script from JSON
  script = loadJSON(SCRIPT_LOCATION);

}

function setup() {

  createCanvas(1000,1000);

  // New state object, pass it the script too.
  state = new State(script.script);

  // New Graphics object, responsible for visuals using images
  gpu = new Graphics();

  // Various display settings
  textAlign(CENTER, CENTER);

}

function draw() {

  gpu.displayScene(state.scene);

}

// Handles keyboard input
function keyPressed(){

  switch(keyCode){

    case 81: // Q = next line

    gpu.next();

    break;

  }
}

