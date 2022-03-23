"use strict";

let cols, rows;
let scale = 25;
let $vectorMag, $noiseAmp, $noiseInc, $scale, $zOffsetSpeed;

let zOffset = 0;

let particles = [];
const PARTICLES_AMOUNT = 50;

let flowfield = [];



function setup(){

    $("#controlPannel").append("<div class = 'slider' id = 'vectorMagDiv'> <input type='range' id = 'vectorMag' min = '0.01' max = '5' value = '0.5' step = '0.01'> <label for='vectorMag'> Force Vector Magnitude </label> </div>");
    $("#controlPannel").append("<div class = 'slider' id = 'noiseAmpDiv'> <input type='range' id = 'noiseAmp' min = '0.1' max = '200' value = '20' step = '0.1'> <label for='noiseAmp'> Noise Amplification </label> </div>");
    $("#controlPannel").append("<div class = 'slider' id = 'noiseIncDiv'> <input type='range' id = 'noiseInc' min = '0.005' max = '1.5' value = '0.075' step = '0.001'> <label for='noiseInc'> Noise Evolution Speed </label> </div>");
    //$("#controlPannel").append("<div class = 'slider' id = 'scaleDiv'> <input type = 'range' id = 'scale' min = '2' max = '1000' value = '100' > <label for='scale'> Grid Scale </label> </div>");
    $("#controlPannel").append("<div class = 'slider' id = 'zOffsetSpeedDiv'> <input type='range' id = 'zOffsetSpeed' min = '0.0005' max = '0.01' value = '0.0025' step = '0.0001'> <label for='zOffsetSpeed'> Z Dimension Noise Amplification </label> </div>");
    
    $vectorMag = $("#vectorMag");
    $noiseAmp = $("#noiseAmp");
    $noiseInc = $("#noiseInc");
    // $scale = $("#scale");
    $zOffsetSpeed = $("#zOffsetSpeed");

    createCanvas(1000,1000);

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
            let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * $noiseAmp.val();

            // Make a vector with magnitude (X) at that angle
            let forceVector = p5.Vector.fromAngle(angle);
            forceVector.setMag(parseFloat($vectorMag.val()));

            // This vector is stored in an array to be looked up later
            let index = i + j * cols;
            flowfield[index] = forceVector;

            // Increment x
            xOffset += parseFloat($noiseInc.val());

        }

        
        // Increment y and z
        yOffset += parseFloat($noiseInc.val());
        zOffset += parseFloat($noiseInc.val())*parseFloat($zOffsetSpeed.val());
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

function keyPressed(){
    switch(keyCode){
        case 32: // 32 = space , Pause/Unpause
            if(isLooping()){
                noLoop();
                console.log("Paused.");
            } else {
                loop();
                console.log("Unpaused.");
            }
            break;

        case 81: // 81 = Q = refresh diagram
            refreshDiagram();
            console.log("Refreshed.");
            break;
    }
}