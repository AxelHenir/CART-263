
let cols = 3;
let rows = 3;

let diagram;

const CHANCE_HAS_CHILD = 0.5;

function preload(){

}

function setup(){

    createCanvas(1000,1000);

}

function draw(){

}

function Cell(x,y,rows,cols,width,height){

    this.x = x;
    this.y = y;

    this.r = rows;
    this.c = cols;

    this.fill = random(0,255);

    this.w = width;
    this.h = height;

    this.newCell = function(){

        push();
        rectMode(CENTER,CENTER);
        fill(this.fill);
        noStroke();
        rect(0,0,this.w,this.h);

        for(let i = 0 ; i < rows ; i ++){
            for(let j = 0 ; j < cols ; j ++){

                let l = i*(width/rows) + 0.5(width/rows);
                let k = j*(height/cols) + 0.5(height/cols);

                // l,k = center x,y of ith,jth cell

                

                
                let newCell = new Cell();
                newCell.newCell();

            }
        }


        pop();

    }

};
