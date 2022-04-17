"use strict";

let c;

let cols, rows;
let scale = 50;


let zOffset = 0;


const PARTICLES_AMOUNT = 75;
const FORCE_MAGNITUDE = 5;
const X_Y_PERLIN_INCREMENT = 0.01;
const Z_PERLIN_INCREMENT = 0.005;

let flowfield = [];
let particles = [];



function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    refreshDiagram();

}

function draw(){

    background(255,255,255,20);

    let yOffset = 0;

    // 1: Update flowfield - Each cell contains an updateable vector

    for (let i = 0 ; i < rows; i++){

        let xOffset = 0;

        for(let j = 0; j < cols; j++){

            // Generate a perlin noise value (3rd dimensional perlin noise)
            let angle = noise(xOffset, yOffset, zOffset) * TWO_PI; // Multiply by another value here for additional effects!

            // Make a vector with magnitude (X) at that angle
            let forceVector = p5.Vector.fromAngle(angle);
            forceVector.setMag(FORCE_MAGNITUDE); // Mag = strength of field

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
            let index = i + j * cols;
            flowfield[index] = forceVector;

            // Increment x
            xOffset += 0.01;

        }

        
        // Increment y and z
        yOffset += 0.01;
        zOffset += 0.0005;
    }

    // 2: Update the particles 
    for(let k = 0; k < particles.length; k++){
        particles[k].follow(flowfield);
        particles[k].update();
        particles[k].show();
    }


    
}

function refreshDiagram(){

    cols = floor(width/scale);
    rows = floor(height/scale);

    
    particles = [];
    for(let i = 0; i < PARTICLES_AMOUNT; i++){
        particles.push(new Particle());
    }

    flowfield = [];
    flowfield = new Array(cols * rows);

    //console.log(cols,rows,particles,flowfield);

    push();
    fill(255);
    rectMode(CENTER);
    rect(width/2,height/2, 10000, 10000);
    pop();

}

function Particle(){

    this.pos = createVector(random(0,width),random(0,width));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 0.1;

    this.update = function() {

        this.edges();
        this.vel.limit(this.maxSpeed);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

    }

    this.applyForce = function(forceVector){
        this.acc.add(forceVector);
    }

    this.show = function(){
        push();
        stroke(0,100);
        strokeWeight(random(3,5));
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.edges = function(){
        
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.y < 0) this.pos.y = height;

    }

    this.follow = function(flowfield){
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);

        let index = x + y * cols;

        this.applyForce(flowfield[index]);
    }

}

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
            refreshDiagram();
            break;
    }
}