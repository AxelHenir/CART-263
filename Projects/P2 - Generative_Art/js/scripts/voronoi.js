let c;

const NUM_CELLS = 200;
const JITTER = false; 

let cells = [];

function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    generateVoronoiDiagram();

}

function generateVoronoiDiagram(){

    background(60);

    for ( let i = 0 ; i < NUM_CELLS ; i ++ ){
    
        voronoiSite(random(width), random(height), random(255));
    
    }
    
    voronoi(1000,1000,JITTER);

    voronoiDraw(0,0,1000,1000);

}

function keyPressed(){
    switch(keyCode){
        case 81:
            generateVoronoiDiagram();
            break;

        case 82:
            voronoiClearSites();
            generateVoronoiDiagram();
            break;

        case 83:
            saveCanvas("Voronoi","png");
            break;
    }
}

