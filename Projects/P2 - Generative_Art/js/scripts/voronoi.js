let c;

let cells = [];
let palette;

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

document.getElementById("generateButton").addEventListener("click",generateVoronoiDiagram);
document.getElementById("newButton").addEventListener("click",newDiagram);
document.getElementById("saveButton").addEventListener("click",saveDiagram);

function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    newDiagram();

}

function generateVoronoiDiagram(){

    background(random(palette));

    let numCells = int(document.getElementById("numCells").value);

    // Randomly generate all the sites
    for ( let i = 0 ; i < numCells ; i ++ ){
        voronoiSite(random(width), random(height), random(palette));
    }

    // Edge stroke
    if(int(document.getElementById("strokeWeight").value) > 0){
        voronoiCellStroke(255);
        voronoiCellStrokeWeight(int(document.getElementById("strokeWeight").value));
    } else {
        voronoiCellStroke(255);
        voronoiCellStrokeWeight(0);
    }

    // Site Stroke 
    if(int(document.getElementById("siteStrokeWeight").value) > 0){
        voronoiSiteStroke(255);
        voronoiSiteStrokeWeight(int(document.getElementById("siteStrokeWeight").value));
    } else {
        voronoiSiteStroke(255);
        voronoiSiteStrokeWeight(0);
    }

    // Jitter amount
    if(int(document.getElementById("jitterAmount").value) > 0){

        voronoiJitterStepMax(30);
        voronoiJitterStepMin(10);
        voronoiJitterFactor(document.getElementById("jitterAmount").value);

        voronoi(1000,1000,true);
    } else {
        voronoi(1000,1000,false);
    }
    
    // Draw the diagram
    voronoiDraw(0,0,1000,1000);

}

function newDiagram(){
    palette = random(PALETTES);
    voronoiClearSites();
    generateVoronoiDiagram();
}

function saveDiagram(){
    saveCanvas("Voronoi","png");
}

function keyPressed(){
    switch(keyCode){
        case 81:
            generateVoronoiDiagram();
            break;

        case 82:
            newDiagram();
            break;

        case 83:
            saveDiagram();
            break;
    }
}

