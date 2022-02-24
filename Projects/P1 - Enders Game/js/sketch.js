// CART 263 Project 1 - Ender's Game
// Alex Henri - Concordia University Winter 2022

// State machine to track program state
let state = undefined;

// Script for the game
let script = undefined;
const SCRIPT_LOCATION = "assets/json/script.json";

// A graphics object for all of our images
let gpu = undefined;

// An audio driver for all of our sounds
let audio = undefined;

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

  // New Audio driver, responsible for all audio being played
  audio = new Audio();

  // Various display settings
  textAlign(CENTER, CENTER);

}

function draw() {

  gpu.displayScene(state.scene);
  //audio.play();

}

// Handles keyboard input
function keyPressed(){

  switch(keyCode){

    case 81: // Q = next line

      gpu.next();

      break;

  }
}

