"use strict";

let c;

let diagram = [];

const MAX_EXECUTIONS = 175000;
const NUM_CIRCLES = 1500;

const MIN_RADIUS = 3;
const MAX_RADIUS = 100;

const CONSTRAIN_TO_CANVAS = false;


function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    newCirclePack();
    drawDiagram();
        
}

function drawDiagram(){

    background(200);

    for( let k = 0 ; k < diagram.length ; k ++){

        push();
        fill(0);
        noStroke();
        ellipseMode(CENTER);
        ellipse(diagram[k].x,diagram[k].y,diagram[k].r*2,diagram[k].r*2);
        pop();

    } 
}

function newCirclePack(){

    let iteration = 0;

    while(diagram.length < NUM_CIRCLES){

        let testCircle = {
            x:random(width),
            y:random(height),
            r:random(MAX_RADIUS,MIN_RADIUS),
        };

        let overlap = false;

        for(let j = 0 ; j < diagram.length ; j ++){
            let goodCircle = diagram[j];
            let d = dist(testCircle.x,testCircle.y,goodCircle.x,goodCircle.y);
            if(d < testCircle.r + goodCircle.r){
                // Overlapping
                overlap = true;
                break;
            }
        }

        if(!overlap){
            diagram.push(testCircle);
        }

        iteration++;
        if(iteration > MAX_EXECUTIONS){
            console.log(MAX_EXECUTIONS,"Max Executions reached.");
            break;
        }

    }
    console.log(diagram.length);

}

function keyPressed(){
    switch(keyCode){
        case 81:
            diagram = [];
            newCirclePack();
            drawDiagram();
            break;

        case 83:
            saveCanvas("Circles","png");
            break;
    }
}