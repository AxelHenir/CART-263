// Spy Profile Generator
// Uses: Darius Kazemi's corpora project: https://github.com/dariusk/corpora/

"use strict";

// URLs to JSON data
const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;

// The key used to save and load the data for this program
const PROFILE_DATA_KEY = `spy-profile-data`;

// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,

  // Some traits of my own..
  height: `**REDACTED**`,
  weight: `**REDACTED**`,
  eyeColor: `**REDACTED**`,

};

// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;
let eyeColorData;


// Loads the JSON data used to generate the profile
function preload() {
  tarotData = loadJSON(TAROT_DATA_URL);
  objectsData = loadJSON(OBJECT_DATA_URL);
  instrumentsData = loadJSON(INSTRUMENT_DATA_URL);
  eyeColorData = loadJSON("assets/json/colors.json");
}


// Creates a canvas then handles loading profile data, checking password,and generating a profile as necessary.
function setup() {

  // Create the canvas
  createCanvas(windowWidth, windowHeight);

  // Try to load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));

  // Check if there was data to load
  if (data) {

    // If so, ask for the password
    let password = prompt("PASSWORD:");

    // Check if the password is correct
    if (password === data.password) {

      // If is is, then setup the spy profile with the data
      setupSpyProfile(data);

    }
  }
  else {

    // If there is no data, generate a spy profile for the user
    generateSpyProfile();

  }
}


// Assigns across the profile properties from the data to the current profile
function setupSpyProfile(data) {

  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
  spyProfile.eyeColor = data.eyeColor;
  spyProfile.height = data.height;
  spyProfile.weight = data.weight;

}


// Generates a spy profile from JSON data
function generateSpyProfile() {

  // Ask for the user's name and store it
  spyProfile.name = prompt("ENTER YOUR NAME");

  // Generate an alias from a random instrument
  spyProfile.alias = `The ${random(instrumentsData.instruments)}`;

  // Generate a secret weapon from a random object
  spyProfile.secretWeapon = random(objectsData.objects);

  // Generate a password from a random keyword for a random tarot card
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  // Generate a random height (in cm)
  spyProfile.height = Math.floor(Math.random() * 110) + 100 + " cm";

  // Generate a random weight (in lbs)
  spyProfile.weight = Math.floor(Math.random() * 160) + 70 + " lbs";

  // Generate a random eye color from my JSON file.
  spyProfile.eyeColor = random(eyeColorData.colors);

  // Save the resulting profile to local storage
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));

}


function draw() {

  background(255);

  // Generate the profile as a string using the data
  let spyText = `** TOP SECRET SPY PROFILE ** 
Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}
Height: ${spyProfile.height}
Weight: ${spyProfile.weight}
Eye Color: ${spyProfile.eyeColor}
`;

  // Display the profile
  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont(`Courier, monospace`);
  fill(0);
  text(spyText, width/2, height/2);
  pop();
}

// Handles keyboard input
function keyPressed(){

  // Check which key was pressed
  switch(keyCode){
    
    case 66: // 66 = B = Burn current profile (clear it from data)
      localStorage.clear();
      break;

  }
}