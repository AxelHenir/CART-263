"use strict";

window.addEventListener('resize', function(){
    resizeCanvas(windowWidth*0.75,windowWidth*0.75);
    cols = floor(width/scale);
    rows = floor(height/scale);
});

let cols, rows;
let scale = 50;

const NOISE_INCREMENT = 0.075;
let zOffset = 0;

function setup(){

    createCanvas(windowWidth*0.75,windowWidth*0.75);

    cols = floor(width/scale);
    rows = floor(height/scale);

}

function draw(){

    background (255);

    let yOffset = 0;

    for (let i = 0 ; i < rows; i++){

        let xOffset = 0;

        for(let j = 0; j < cols; j++){

            let angle = noise(xOffset, yOffset, zOffset) * TWO_PI;
            let v = p5.Vector.fromAngle(angle);
            push();
            stroke(0);
            translate(i * scale, j * scale);
            rotate(v.heading());
            line(0,0,scale,0);
            pop();

            xOffset += NOISE_INCREMENT;

        }

        yOffset += NOISE_INCREMENT;
        zOffset += NOISE_INCREMENT*0.0025;
    }
}