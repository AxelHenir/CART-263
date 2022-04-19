// FLOWFIELD.JS - Flowfield physics simulator with particles
// Generates a grid where each cell contains a force vector
// Force vectors will change direction based on perlin noise
// Force vectors act upon particles which "draw" a scene as they get pushed around
// Control the behavior of the particles and of the force vectors with sliders

"use strict";

// Canvas variable
let c;

// Flowfield variables
let cols, rows;
let zOffset = 0;
let flowfield = [];
let diagramPalette;
let backgroundFill;

// Particle variables
let particles = [];
let particleMaxSpeed;
let particleSize;

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

// Listeners for buttons
document.getElementById("refreshButton").addEventListener("click",refreshDiagram);
document.getElementById("saveButton").addEventListener("click",saveDiagram);

// Creates the canvas and calls for the diagram to be refreshed
function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    refreshDiagram();

}

// Main loop responsible for drawing the diagram
function draw(){

    // Check if the user wants the background to be redrawn each frame (checkbox)
    if(document.getElementById("drawBackground").checked)background(backgroundFill);

    // 1: Update the flowfield
    updateFlowfield();

    // 2: Update the particles 
    for(let k = 0; k < particles.length; k++){
        particles[k].follow(flowfield);
        particles[k].update();
        particles[k].show();
    }

}

// Updates the underlying flowfield by making a grid of vectors adn storing them in order in the flowfield[] array
function updateFlowfield(){

    // Retrieve scale, vector force and perlin noise increment values from sliders
    let scale = document.getElementById("scale").value;
    let force = int(document.getElementById("force").value);
    let perlinInc = float(document.getElementById("noiseInc").value);
    let zperlinInc = float(document.getElementById("zNoiseInc").value);

    // Detemrine number of rows and cols based on desired scale
    cols = ceil(width/scale);
    rows = ceil(height/scale);

    // Reset the y dimension perlin noise offset
    let yOffset = 0;

    // Double for loop - iterate across all rows and columns
    for (let i = 0 ; i < rows; i++){
        let xOffset = 0;
        for(let j = 0; j < cols; j++){
            // Generate a perlin noise value (3rd dimensional perlin noise)
            let angle = noise(xOffset, yOffset, zOffset) * TWO_PI; // Multiply by another value here for additional effects!

            // Make a vector with magnitude force at that angle
            let forceVector = p5.Vector.fromAngle(angle);
            forceVector.setMag(force);

            // Draw the flowfield indicators if the associated checkbox is checked
            if(document.getElementById("flowIndicators").checked){
                push();
                stroke(0);
                translate(i*scale + scale/2,j*scale + scale/2);
                rotate(forceVector.heading());
                line(0,0,25,0);
                pop();
            }
            

            // This vector is stored in an array to be looked up later
            flowfield[i + j * cols] = forceVector;

            // Increment perlin noise x
            xOffset += perlinInc;
        }

        
        // Increment perlin noise y and z
        yOffset += perlinInc;
        zOffset += zperlinInc;
    }
}

// Deletes all particles and re-adds the desired amount, changes z offset for a new diagram 
function refreshDiagram(){

    // Choose a new color palette
    diagramPalette = random(PALETTES);

    // Randomly choose a new offset for Z
    zOffset = random(99999);

    // Retrieve the particle behaviors from sliders
    particleMaxSpeed = float(document.getElementById("particleMaxSpeed").value); 
    particleSize = int(document.getElementById("particleSize").value);

    // Empty and then re-populate particles
    particles = [];
    for(let i = 0; i < document.getElementById("numParticles").value; i++){
        particles.push(new Particle(random(diagramPalette)));
    }

    // Designate a BG color from selected palette
    backgroundFill =random(diagramPalette);
    background(backgroundFill);

}

// Particle "class". Has a position, velocity and acceleration. Has functions which allow the flowfield to act on the particles
function Particle(fill){

    // Position, velocity and acceleration vectors, spawn them randomly on the screen 
    this.pos = createVector(random(0,width),random(0,width));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);

    this.fill = fill;

    // Main update function to update the behavior of each particle
    this.update = function() {

        // Check if the particle is offscreen
        this.edges(); 
        // Limit the speed
        this.vel.limit(particleMaxSpeed);
        // Adjust the volocity and position
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        // Reset acceleration
        this.acc.mult(0);

    }

    // Function applies a force to the particle
    this.applyForce = function(forceVector){
        // Add the force to the particle's acceleration
        this.acc.add(forceVector);
    }

    // Function which draws the particle
    this.show = function(){
        push();
        stroke(this.fill);
        strokeWeight(particleSize);
        point(this.pos.x, this.pos.y);
        pop();
    }

    // Function which checks to see if the particle has gone off canvas and resets it if it has
    this.edges = function(){
        
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.y < 0) this.pos.y = height;

    }

    // Function which assigns a forcevector to the particle based on its locationin the diagram
    this.follow = function(flowfield){

        // Find which vector is acting on the particle
        let scale = document.getElementById("scale").value;
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);

        // The ith, jth vector can be found in the flowfield[] array at this index
        let index = x + y * cols;

        // Call for the force to be applied to the particle
        this.applyForce(flowfield[index]);
    }

}

// Handles keyboard input
function keyPressed(){
    switch(keyCode){
        case 32: // 32 = space , Pause/Unpause
            if(isLooping()){
                noLoop();
            } else {
                loop();
            }
            break;

        case 81: // 81 = Q = refresh diagram
            if(!isLooping()) loop();
            refreshDiagram();
            break;

        case 83: // S = Save Diagram
            saveDiagram();
            break;
    }
}

// Function that saves the diagram
function saveDiagram(){
    saveCanvas("Flowfield","png");
}