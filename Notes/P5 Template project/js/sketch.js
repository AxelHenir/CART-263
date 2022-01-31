// Standard P5 Project

function preload(){

}

function setup() {

  createCanvas(1000,1000);
  rectMode(CENTER,CENTER);

}

function draw() {
  
    push();
    background(150);
    strokeWeight(3);
    fill(0);
    rect(mouseX,mouseY,100,100);
    pop();

}
