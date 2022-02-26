// CART 263 Project 1 - Ender's Game
// Alex Henri - Concordia University Winter 2022

// State machine to track program state
let state = undefined;

// Script for the game, (literally the script)
let playbook = undefined;
const SCRIPT_LOCATION = "assets/json/script.json";

// A graphics object for all of our images
let gpu = undefined;

// An audio driver for all of our sounds
let audio = undefined;

// A name to save our data to
const SAVED_DATA = "enders-game-data";

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

// Driver function of the program - calls graphics to display the scene
function draw() {

  // Graphics object will draw our scene
  gpu.displayScene(state.scene);
  
}

// Runs at start of project, checks for saved data in the browser and loads it if found
function loadSavedData(){

  let d = JSON.parse(localStorage.getItem(SAVED_DATA));

        // Check if there was data to load
        if (d) {
          
          state.sceneCounter = d.sceneCounter - 1;

        }

        state.nextScene();

        console.log("LOADED SCENE: ",state.sceneCounter);
}

// Saves the current state of the program in browser storage 
function saveState(){

  // Create the object that holds the data we want to save
  let saveData = {

        // Scene counter
        sceneCounter: state.sceneCounter,

  }

  // Save the data to browser memory 
  localStorage.setItem(SAVED_DATA, JSON.stringify(saveData));

  console.log(`Saved ${JSON.parse(localStorage.getItem(SAVED_DATA)).sceneCounter} to local storage`);

}

// Handles keyboard input
function keyPressed(){

  switch(keyCode){

    case 81: // Q = Next Line

      // Next scene
      gpu.next();

      break;

    case 83: // S = Save data

      // Saves the current state to browser memory
      saveState();

      break;

    case 88: // X = Clear Browser Memory

      // Clears browser memory (DEBUG COMMAND)
      localStorage.clear();
      console.log("SAVE DELETED.");

      break;

    case 87: // W = Load saved data (DEBUG COMMAND)

      // Loads the saved data in browser storage
      loadSavedData();

      break;

  }
}

