
let cols = 2;
let rows = 3;

let diagram;

const CHANCE_HAS_CHILD = 0.65;
const MIN_WIDTH = 15;

function preload(){

}

function setup(){

    createCanvas(1000,1000);

    diagram = new Cell(cols,rows,width,height);
    diagram.newCell();

}

function draw(){

}

function keyPressed(){
    switch(keyCode){
        case 81:
            diagram = new Cell(rows,cols,width,height);
            diagram.newCell();
            break;
    }
}

function Cell(rows,cols,width,height){

    this.r = rows;
    this.c = cols;

    this.fill = random(0,255);

    this.w = width;
    this.h = height;

    this.newCell = function(){

        console.log(this.w)

        if(this.w > MIN_WIDTH){

            push();
            rectMode(CORNER);
            fill(this.fill);
            noStroke();
            rect(0,0,this.w,this.h);
            pop();
    
            for(let i = 0 ; i < this.r ; i ++){
                for(let j = 0 ; j < this.c ; j ++){
    
                    let l = i*(this.h/this.r);
                    let k = j*(this.w/this.c);
    
                    push();
                    //console.log(l,k);
                    translate(l,k);
    
                    let r = random();
    
                    if(r < CHANCE_HAS_CHILD){
    
                        let newCell = new Cell(this.r,this.c,this.h/this.r,this.w/this.c);
                        newCell.newCell();
    
                    } else {
    
                    }
    
                    pop();
    
                }
            }

        } else {

        }
        

    }

};
