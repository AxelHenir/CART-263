// CART 263 Project 1 - Ender's Game
// Alex Henri - Concordia University Winter 2022

// State machine to track program state
let state = undefined;

// Script for the game
let playbook = undefined;
const SCRIPT_LOCATION = "assets/json/script.json";

// A graphics object for all of our images
let gpu = undefined;

// An audio driver for all of our sounds
let audio = undefined;

function preload(){

  // Load the script from JSON
  playbook = loadJSON(SCRIPT_LOCATION);

  // New Graphics object, responsible for visuals using images
  gpu = new Graphics();

  // New Audio driver, responsible for all audio being played
  audio = new Audio();

}

function setup() {

  createCanvas(1000,1000);

  // New state object, pass it the script too.
  state = new State(playbook.script);

  // Various display settings
  textAlign(CENTER, CENTER);

}

function draw() {

  gpu.displayScene(state.scene);
  audio.play();

}

// Handles keyboard input
function keyPressed(){

  switch(keyCode){

    case 81: // Q = next line

      gpu.next();

      audio.enqueueSound(audio.fx[0]);

      break;

  }
}

