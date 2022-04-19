// CIRCLES.JS - Circle packing generative system
// Generates circles adn places them wihtin the confines of the diagram such that none touch

"use strict";

// Listeners for buttons
document.getElementById("generateButton").addEventListener("click",newDiagram);
document.getElementById("saveButton").addEventListener("click",saveDiagram);

// Canvas variable
let c;

// Variable to hold diagram
let diagram = [];

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

// Creates the canvas and calls for a new diagram to be drawn
function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    newDiagram();
        
}

// Calls appropriate functions to make a new diagram
function newDiagram(){

    // Empty current diagram
    diagram = [];
    // Perform the calculations for new diagram, result will be stored in diagram[] array
    newCirclePack();
    // Draws the contents of diagram[] array
    drawDiagram();
}

// Function that saves the canvas
function saveDiagram(){
    saveCanvas("Circles","png");
}

// Function that draws the contents of diagram[]
function drawDiagram(){

    // Select a color from the palette collection
    let palette = random(PALETTES);
    // Designate a BG color
    let backgroundColor = random(palette);
    background(backgroundColor);

    // Retrieve the stroke setting from slider
    let strokeW = int(document.getElementById("strokeWeight").value);

    // For each circle in the diagram[] array, draw it
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

// Function which calculates the diagram's layout
// Generate a circle, try to place it, if it collides with an existing circle or is outside the diagram, retry
function newCirclePack(){

    // Tracks how many times the function runs (this can be adjusted with a slider to produce heavier work)
    let iteration = 0;

    // Retrieve minimum and maximum circle radii, the number of circ,es desired and the maximum number of executions for the function from sliders
    let minR = int(document.getElementById("minRadius").value);
    let maxR = int(document.getElementById("maxRadius").value);
    let numCircles = int(document.getElementById("numCircles").value);
    let maxExecutions = int(document.getElementById("maxExecutions").value);

    // The big-bad while loop. Will try to place random circles in the diagram
    while(diagram.length < numCircles){
        
        // Generate a circle with random qualities
        let testCircle = {
            x:random(width),
            y:random(height),
            r:random(minR,maxR),
        };

        // If the user wants to make a circular framed diagram, check if this circle is inside that frame
        let outside = false;
        if(document.getElementById("circleFrame").checked){
            let d = dist(testCircle.x,testCircle.y,width/2,height/2) + testCircle.r;
            if(d >= width/2) outside = true; // If it's outside, it will be discarded
        }

        // Check that this circle doesn't overlap existing circles
        let overlap = false;
        for(let j = 0 ; j < diagram.length ; j ++){
            //Check every other circle in diagram[] array
            let goodCircle = diagram[j];
            let d = dist(testCircle.x,testCircle.y,goodCircle.x,goodCircle.y);
            if(d < testCircle.r + goodCircle.r){
                overlap = true; // If it overlaps, it will be discarded
                break;
            }
        }

        // Checks for if the circle is overlapping or outside the frame
        if(!overlap && !outside){
            diagram.push(testCircle); // If it's good, it gets added to diagram[] array
        }

        // i++ , check if we have tried so hard and got so far
        iteration++;
        if(iteration > maxExecutions){
            // If we exceed the max executions, console message to tell the user (for those who care)
            console.log(maxExecutions,"Max Executions reached.");
            break;
        }

    }

}

// Handles keyboard input
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