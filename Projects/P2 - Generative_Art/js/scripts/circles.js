"use strict";

document.getElementById("generateButton").addEventListener("click",newDiagram);
document.getElementById("saveButton").addEventListener("click",saveDiagram);

let c;

let diagram = [];

const MAX_EXECUTIONS = 175000;
const NUM_CIRCLES = 1500;

const CONSTRAIN_TO_CANVAS = false;

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


function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    newDiagram();
        
}

function newDiagram(){
    diagram = [];
    newCirclePack();
    drawDiagram();
}

function saveDiagram(){
    saveCanvas("Circles","png");
}

function drawDiagram(){

    let palette = random(PALETTES);
    let backgroundColor = random(palette);

    background(backgroundColor);

    let strokeW = int(document.getElementById("strokeWeight").value);

    for( let k = 0 ; k < diagram.length ; k ++){

        push();
        fill(random(palette));
        strokeWeight(strokeW);
        stroke(255);
        ellipseMode(CENTER);
        ellipse(diagram[k].x,diagram[k].y,diagram[k].r*2,diagram[k].r*2);
        pop();

    } 
}



function newCirclePack(){

    let iteration = 0;

    let minR = int(document.getElementById("minRadius").value);
    let maxR = int(document.getElementById("maxRadius").value);

    let numCircles = int(document.getElementById("numCircles").value);
    let maxExecutions = int(document.getElementById("maxExecutions").value);

    while(diagram.length < numCircles){

        let testCircle = {
            x:random(width),
            y:random(height),
            r:random(minR,maxR),
        };

        let outside = false;
        if(document.getElementById("circleFrame").checked){
            let d = dist(testCircle.x,testCircle.y,width/2,height/2) + testCircle.r;
            if(d >= width/2) outside = true;
        }

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

        if(!overlap && !outside){
            diagram.push(testCircle);
        }

        iteration++;
        if(iteration > maxExecutions){
            console.log(maxExecutions,"Max Executions reached.");
            break;
        }

    }

}

function keyPressed(){
    switch(keyCode){
        case 81:
            newDiagram();
            break;

        case 83:
            saveDiagram();
            break;
    }
}