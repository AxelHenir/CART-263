
let cols = 4;
let rows = 4;

let diagram;

const CHANCE_HAS_CHILD = 0.8;
const CHANCE_VARIANT = 0.2;
const MIN_WIDTH = 10;

const PALETTE = [
    "#FBF8CC",
"#FDE4CF",
"#FFCFD2",
"#F1C0E8",
"#CFBAF0",
"#A3C4F3",
"#90DBF4",
"#8EECF5",
"#98F5E1",
"#B9FBC0",
];

/* 
PALLETE Synthwave

"#FFBE0B",
"#FB5607",
"#FF006E",
"#8338EC",
"#3A86FF",

PALLETE Coffee

"#EDE0D4",
"#E6CCB2",
"#DDB892",
"#B08968",
"#7F5539",

PALLETE Pastel

"#FBF8CC",
"#FDE4CF",
"#FFCFD2",
"#F1C0E8",
"#CFBAF0",
"#A3C4F3",
"#90DBF4",
"#8EECF5",
"#98F5E1",
"#B9FBC0",


 */



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

        case 83:
            saveCanvas("Grid","png");
            break;
    }
}

function Cell(rows,cols,width,height){

    this.r = rows;
    this.c = cols;

    this.w = width;
    this.h = height;

    this.newCell = function(){

        if(this.w > MIN_WIDTH){

            push();
            rectMode(CORNER);
            fill(random(PALETTE));
            noStroke();
            rect(0,0,this.w,this.h);
            pop();

            let r = random();
            if(r < CHANCE_VARIANT){
                push();
                ellipseMode(CORNER);
                fill(random(PALETTE));
                noStroke();
                ellipse(0,0,this.w,this.h);
                pop();
            }
            
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
    
                    }
    
                    pop();
    
                }
            }

        }
        
    }

};
