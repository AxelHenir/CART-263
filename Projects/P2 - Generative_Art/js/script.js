window.addEventListener('resize', function(){
    resizeCanvas(windowWidth*0.75,windowWidth*0.75);
});

"use strict";

let carre = {
    w: undefined,
    h: undefined,
    x: undefined,
    y: undefined,

}

function setup(){

    createCanvas(windowWidth*0.75,windowWidth*0.75);

}

function draw(){
    updateCarre(carre);
    drawCarre(carre);
}

function updateCarre(carre){

    carre.x = mouseX;
    carre.y = mouseY;

    carre.w = 50;
    carre.h = 50;
}

function drawCarre(carre){
    push();
    fill(230,100,100);
    noStroke();
    rectMode(CENTER);
    rect(carre.x,carre.y,carre.w,carre.h);
    pop();
}