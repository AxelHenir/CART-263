// Spy Profile Generator
// Uses: Darius Kazemi's corpora project: https://github.com/dariusk/corpora/

"use strict";

// URLs to JSON data
const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;

// The key used to save and load the data for this program
const PROFILE_DATA_KEY = `spy-profile-data`;

// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;
let eyeColorData;

// State and Profile variables to hodl their respective objects
let state = undefined;
let profile = undefined;

// Loads the JSON data used to generate the profile
function preload() {
  tarotData = loadJSON(TAROT_DATA_URL);
  objectsData = loadJSON(OBJECT_DATA_URL);
  instrumentsData = loadJSON(INSTRUMENT_DATA_URL);
  eyeColorData = loadJSON("assets/json/colors.json");
}

// Setup function. Creates state and profile objects. Creates the p5.js canvas
function setup() {

  // Create a new state object to track what the program is doing at a given point in time
  state = new State();

  // Create new profile object to hold the current profile
  profile = new SpyProfile();

  // Create the canvas
  createCanvas(windowWidth, windowHeight);

}

// Enacts the state function
function draw() {

  state.stage();

}

// Handles keyboard input
function keyPressed(){

  // Check which key was pressed
  switch(keyCode){
    
    case 66: // 66 = B = Burn current profile (clear it from data)
      localStorage.clear();
      state.stage = state.homescreen;
      break;

    case 49: // 49 = 1 = Generate random profile
      break;

    case 50: // 50 = 2 = Genrate custom profile
      break;

  }
}