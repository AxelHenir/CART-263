
let diagram;
let c;

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

function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    diagram = new Cell(document.getElementById("cols").value,document.getElementById("rows").value,width,height);
    diagram.newCell();

}

function keyPressed(){
    switch(keyCode){
        case 81:
            diagram = new Cell(document.getElementById("cols").value,document.getElementById("rows").value,width,height);
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

        if(this.w > document.getElementById("minWidth").value){

            push();
            rectMode(CORNER);
            fill(random(PALETTE));
            noStroke();
            rect(0,0,this.w,this.h);
            pop();

            let r = random();
            if(r < document.getElementById("chanceVariant").value){
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
    
                    if(r < document.getElementById("chanceHasChild").value){
    
                        let newCell = new Cell(this.r,this.c,this.h/this.r,this.w/this.c);
                        newCell.newCell();
    
                    }
    
                    pop();
    
                }
            }

        }
        
    }

};
