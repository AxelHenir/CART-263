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

    for (let i = 0 ; i < rows; i++){

        let xOffset = 0;

        for(let j = 0; j < cols; j++){

            let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 5;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(0.01);
            let index = i + j * cols;
            flowfield[index] = v;

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