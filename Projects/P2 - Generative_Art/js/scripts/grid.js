
document.getElementById("generateButton").addEventListener("click",newDiagram);
document.getElementById("saveButton").addEventListener("click",saveDiagram);

let diagram;
let c;

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

function newDiagram(){

    background(255);
    diagram = new Cell(document.getElementById("cols").value,document.getElementById("rows").value,width,height,random(PALETTES));
    diagram.newCell();

}

function saveDiagram(){
    saveCanvas("Grid","png");
}

function Cell(rows,cols,width,height,pal){

    this.r = rows;
    this.c = cols;

    this.w = width;
    this.h = height;

    this.palette = pal;

    this.newCell = function(){

        if(this.w > document.getElementById("minWidth").value){

            push();
            rectMode(CORNER);
            fill(random(this.palette));

            if(document.getElementById("strokeSize").value == 0){
                noStroke();
            } else {
                stroke(255);
                strokeWeight(document.getElementById("strokeSize").value);
            }

            let offset = document.getElementById("offsetAmount").value;
            
            rect(random(-offset,offset),random(-offset,offset),this.w,this.h,document.getElementById("roundedEdges").value);
            pop();

            let r = random();
            if(r < document.getElementById("chanceVariant").value){
                push();
                ellipseMode(CORNER);
                fill(random(this.palette));

                if(document.getElementById("strokeSize").value == 0){
                    noStroke();
                } else {
                    stroke(255);
                    strokeWeight(document.getElementById("strokeSize").value);
                }

                ellipse(random(-offset,offset),random(-offset,offset),this.w,this.h);
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
    
                        let newCell = new Cell(this.r,this.c,this.h/this.r,this.w/this.c, this.palette);
                        newCell.newCell();
    
                    }
    
                    pop();
    
                }
            }

        }
        
    }

};
