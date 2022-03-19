"use strict";

let cols, rows;
let scale = 20;

const NOISE_INCREMENT = 0.075;
let zOffset = 0;

let particles = [];
let PARTICLES_AMOUNT = 50;

let flowfield = [];

function setup(){

    createCanvas(1000,1000);

    cols = floor(width/scale);
    rows = floor(height/scale);

    for(let i = 0; i < PARTICLES_AMOUNT; i++){
        particles.push(new Particle());
    }

    flowfield = new Array(cols * rows);
}

function draw(){

    background(255,255,255,2);

    let yOffset = 0;

    // For each row,
    for (let i = 0 ; i < rows; i++){

        let xOffset = 0;

        // For each column,
        for(let j = 0; j < cols; j++){

            // Generate a perlin noise value based on 3 parameters: x,y and z.
            // This value will determine an angle between 0 and 2pi.
            let angle = noise(xOffset, yOffset, zOffset) * TWO_PI;

            // Make a vector with magnitude (X) at that angle
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1);

            // This vector is stored in an array to be looked up later
            let index = i + j * cols;
            flowfield[index] = v;

            // Increment x
            xOffset += NOISE_INCREMENT;

        }

        
        for(let k = 0; k < particles.length; k++){
            particles[k].follow(flowfield);
            particles[k].update();
            particles[k].show();
        }

        yOffset += NOISE_INCREMENT;
        zOffset += NOISE_INCREMENT*0.0025;
    }
}