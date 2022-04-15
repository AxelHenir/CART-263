"use strict";

let c;

let iteration = 0;

let diagram = [];

const MAX_EXECUTIONS = 50000;
const NUM_CIRCLES = 700;


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

    iteration = 0;

    while(diagram.length < NUM_CIRCLES){

        let testCircle = {
            x:random(width),
            y:random(height),
            r:random(100,5),
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