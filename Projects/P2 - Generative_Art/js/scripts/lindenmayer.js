let c;

let axiom = "F";

let sentence = axiom;
let len = 50;

let rules = [];

rules.push({a: "F", b: "FF+[+F-F-F]-[-F+F+F]"});

function interpret(){

    resetMatrix();
    translate(width/2, height);

    for (let i = 0; i< sentence.length; i++){
        let current = sentence.charAt(i);

        switch(current){

            case "F":
                line(0,0,0,-len);
                translate(0,-len);
                break;

            case "+":
                rotate(PI/6);
                break;

            case "-":
                rotate(-PI/6);
                break;

            case "[":
                push();
                break;

            case "]":
                pop();
                break;

        }

    }
}

function generate(){
   //len *= 0.5;
    let nextSentence = "";
    for (let i = 0; i < sentence.length ; i ++){

        for (let j = 0 ; j < rules.length; j++){

            let current = sentence.charAt(i);

            if(current == rules[j].a){
                nextSentence += rules[j].b;
                foundRule = true;
                break;
            }

        }

    }

    sentence = nextSentence;
    interpret();
}


function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

}

function keyPressed(){
    switch(keyCode){
        case 81:
            generate();
            break;

        case 83:
            saveCanvas("Grid","png");
            break;
    }
}