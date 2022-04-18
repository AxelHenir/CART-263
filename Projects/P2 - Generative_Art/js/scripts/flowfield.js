

"use strict";

let c;

let cols, rows;
let zOffset = 0;
let flowfield = [];
let particles = [];
let diagramPalette;
let backgroundFill;

let particleMaxSpeed;
let particleSize;

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

document.getElementById("refreshButton").addEventListener("click",refreshDiagram);
document.getElementById("saveButton").addEventListener("click",saveDiagram);

function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    refreshDiagram();

}

function draw(){

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

function updateFlowfield(){

    let scale = document.getElementById("scale").value;
    let force = int(document.getElementById("force").value);

    let perlinInc = float(document.getElementById("noiseInc").value);
    let zperlinInc = float(document.getElementById("zNoiseInc").value);

    cols = ceil(width/scale);
    rows = ceil(height/scale);

    let yOffset = 0;

    for (let i = 0 ; i < rows; i++){
        let xOffset = 0;
        for(let j = 0; j < cols; j++){
            // Generate a perlin noise value (3rd dimensional perlin noise)
            let angle = noise(xOffset, yOffset, zOffset) * TWO_PI; // Multiply by another value here for additional effects!

            // Make a vector with magnitude (X) at that angle
            let forceVector = p5.Vector.fromAngle(angle);
            forceVector.setMag(force); // Mag = strength of field

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

            // Increment x
            xOffset += perlinInc;

        }

        
        // Increment y and z
        yOffset += perlinInc;
        zOffset += zperlinInc;
    }
}

function refreshDiagram(){

    diagramPalette = random(PALETTES);

    zOffset = random(99999);

    particleMaxSpeed = float(document.getElementById("particleMaxSpeed").value); 
    particleSize = int(document.getElementById("particleSize").value);

    particles = [];
    for(let i = 0; i < document.getElementById("numParticles").value; i++){
        particles.push(new Particle(random(diagramPalette)));
    }

    //console.log(cols,rows,particles,flowfield);

    backgroundFill =random(diagramPalette);
    background(backgroundFill);

}

function Particle(fill){

    this.pos = createVector(random(0,width),random(0,width));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);

    this.fill = fill;

    this.update = function() {

        this.edges(); 
        this.vel.limit(particleMaxSpeed);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

    }

    this.applyForce = function(forceVector){
        this.acc.add(forceVector);
    }

    this.show = function(){
        push();
        stroke(this.fill);
        strokeWeight(particleSize);
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

        let scale = document.getElementById("scale").value;
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
            if(!isLooping()) loop();
            refreshDiagram();
            break;

        case 83:
            saveDiagram();
            break;
    }
}

function saveDiagram(){
    saveCanvas("Flowfield","png");
}