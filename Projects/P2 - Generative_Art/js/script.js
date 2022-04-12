
let cols = 3;
let rows = 3;

let diagram;

const CHANCE_HAS_CHILD = 0.5;

function preload(){

}

function setup(){

    createCanvas(1000,1000);

    let diagram = new Diagram(rows,cols);
    diagram.generate();

}

function draw(){

}

function Diagram(r,c){

    this.base = [];

    this.generate = function(){
        for(let i = 0; i < c; i++){
            for(let j = 0; j < r; j++){

                let r = random();
                if(r > CHANCE_HAS_CHILD){

                    this.base.push(new Cell(width/c, height/r));

                }
                
            }
        }
    };

}

function Cell(){

    this.w = 0;
    this.h = 0;
    this.fill = random(0,255);
    this.content = [];

    this.drawCell = function(){

        push();
        rectMode(CENTER,CENTER);
        fill(this.fill);
        pop();

    }

}