/*
SAUSAGE DOG NG+
Alex Henri 40108348
January 18th, 2022

To begin, press enter.
Find as many Sausage Dogs as possible before the song ends!
Click the sausage dog on each level to move to the next level.

*/

"use strict";

const NUM_ANIMAL_IMAGES = 10; // Number of unique images
const ANIMAL_IMAGE_PREFIX = `Assets/Images/animal`; // File location as string (to load easier)
const SAUSAGE_DOG_IMAGE = `Assets/Images/sausage-dog.png`; // File location of sausage dog

// Number of images to display
const NUM_ANIMALS = 100;

// Array of the loaded animal images
let animalImages = [];

// Array of animal objects
let animals = [];

// Loaded sausage dog image
let sausageDogImage;

// Sausage dog object
let sausageDog;

// State variable, holds the function for the current state of the program (Title screen, inGame, Finished, etc.)
let state = new State;

// Variable to hold sound file
let music = undefined;

// Load all the animal images and the sausage dog image
function preload() {

  // Loop once for each animal image, starting from 0
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {

    // Load the image with the current number (starting from 0)
    let animalImage = loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`);

    // Add the image to the array for use later when randomly selecting
    animalImages.push(animalImage);

    // Load music
    music = loadSound("Assets/Audio/music.mp3");

  }

  // Load the sausage dog image
  sausageDogImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);

}

// Create all the animal objects and a sausage dog object
function setup() {

  createCanvas(1000, 1000);

  createAnimals();
  createSausageDog();

}

// Creates all the animals at random positions with random animal images
function createAnimals() {

  // Create the correct number of animals
  for (let i = 0; i < NUM_ANIMALS; i++) {

    // Create a random animal
    let animal = createRandomAnimal();

    // Add it to the animals array
    animals.push(animal);

  }

}

// Creates an animal object at a random position with a random image
function createRandomAnimal() {

  // Select a random position for the animal
  let x = random(0, width-50);
  let y = random(0, height-50);

  // Select a random image for the animal
  let animalImage = random(animalImages);

  // Make a new Animal object
  let animal = new Animal(x, y, animalImage);

  // Return the animal object
  return animal;

}

// Creates a sausage dog at a random position
function createSausageDog() {

  // Select a random position for the sausage dog
  let x = random(0, width-50);
  let y = random(0, height-50);

  // Generate new SD object and assign it to the global variable
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

// Checks to see if the music is still playing
function checkMusicPlaying(){

  // Check and return if the music is playing
  return music.isPlaying();

}

// Draws the background then updates all animals and the sausage dog (called 60 times a second)
function draw() {
  state.stage();
}

// Calls the update() method for all animals
function updateAnimals() {

  // Loop through all animals
  for (let i = 0; i < animals.length; i++) {

    // Update the current animal
    animals[i].update();

  }
}

// Calls the update() method of the sausage dog
function updateSausageDog() {

  sausageDog.update();

}

// Handle mouse clicks
function mousePressed() {

  // If the mouse is pressed, check if it was on the sausage dog
  sausageDog.mousePressed();

}

// Handles keyboard input
function keyPressed(){

  switch(keyCode){

    case 13: // 13 = ENTER

      // If it's the title screen,
      if(state.stage == state.title){

        // Change the state to InGame
        state.stage = state.inGame;

        // Start the music..
        music.play();

      }

      break;

    case 82: // 82 = Restart

      // If it's the end of the game,
      if(state.stage == state.finishedGame){

        // Set score back to 0
        state.score = 0;

        // Restart the game
        state.stage = state.title;

      }

      break;

  }
}




