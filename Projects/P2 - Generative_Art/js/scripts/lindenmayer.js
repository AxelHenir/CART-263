let c;

let sentence = "F";
let len = 100;
let angle;

let rules = [];

rules.push({a: "F", b: "FF+[+F-F-F]-[-F+F+F]"});

function setup(){

    angle = radians(25);

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    drawSentence();

}

// Reads the sentence and draws it according to a set of instructions
function drawSentence(){

    background(255);

    resetMatrix();
    translate(width/2, height);

    //console.log(sentence);

    // For each character in the sentence, do its associated instruction
    for (let i = 0; i< sentence.length; i++){

        let current = sentence.charAt(i);

        switch(current){

            case "F":
                line(0,0,0,-len);
                translate(0,-len);
                break;

            case "+":
                rotate(angle);
                break;

            case "-":
                rotate(-angle);
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

// Analyzes current sentence and generates a new one based on the rules, calls to draw the sentence afterwards
function generateSentence(){

    // Decrease length of branches
    len *= 0.60;

    // Empty temporary sentence
    let nextSentence = "";

    // For each character in the current sentence, check it against all rules
    for (let i = 0; i < sentence.length ; i ++){

        let current = sentence.charAt(i);
        let foundCharWithRule = false;

        for (let j = 0 ; j < rules.length; j++){

            // If a character matches a rule, add the result of the rule to the temp
            if(current == rules[j].a){
                nextSentence += rules[j].b;
                foundCharWithRule = true;
                break;
            }

        }

        if(!foundCharWithRule){

            // Otherwise, if no rule is associated with the character, simply add the character to temp
            nextSentence += current;
        }

    }

    // Set the sentence to the temp
    sentence = nextSentence;

    // Illustrate the sentence
    drawSentence();
}

function keyPressed(){
    switch(keyCode){
        case 81:
            generate();
            break;

        case 82:
            sentence="F";
            len=100;
            drawSentence();
            break;

        case 83:
            saveCanvas("Grid","png");
            break;
    }
}