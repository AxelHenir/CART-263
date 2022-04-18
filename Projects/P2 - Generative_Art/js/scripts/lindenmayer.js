let c;

let sentence;
let len, angle, startingPt;

let rules = [];

let RULESETS;

function setup(){

    c = createCanvas(1000,1000);
    c.parent("canvasContainer");

    RULESETS = [
        [{axiom: "F", angle: 25, start: {x: width/2, y: height}},{a: "F", b: "FF+[+F-F-F]-[-F+F+F]"}], // Tree1 (25 deg)
        [{axiom: "G", angle: 25, start: {x: width/2, y: height}},{a: "G", b: "F+[[G]-G]-F[-FG]+G"}, {a: "F", b:"FF"}], // Tree2 (25 deg)
        [{axiom: "F", angle: 90, start: {x: width/2, y: height/2}},{a: "F", b: "F+G"}, {a: "G", b:"F-G"}], // Dragon curve (90 deg)
        [{axiom: "F", angle: 60, start: {x: width/2, y: height}},{a: "F", b: "G-F-G"}, {a: "G", b: "F+G+F"}], // Sierpinsky hexagon (60 deg)
        [{axiom: "F-G-G", angle: 120, start: {x: width, y: height}},{a: "F", b: "F-G+F+G-F"}, {a: "G", b: "GG"}], // Sierpinsky triangle (120 deg)
        [{axiom: "A", angle: 90, start: {x: 0, y: height}},{a: "A", b: "+BF-AFA-FB+"}, {a: "B", b: "-AF+BFB+FA-"}] // Hilbert Curve (90 deg)
    ];

    newDiagram();

}

// Generates a new diagram by selecting new rules and resetting all parameters
function newDiagram(){

    selectRules();

    len = document.getElementById("length").value;

    drawSentence();

}

function selectRules(){
    rules = [];
    let temp = random(RULESETS);
    temp.forEach(rule => rules.push(rule));
    
    let config = rules[0];
    rules.splice(0,1);

    sentence = config.axiom;
    angle = config.angle;
    startingPt = config.start;
}

// Reads the sentence and draws it according to a set of instructions
function drawSentence(){

    background(255);

    resetMatrix();
    translate(startingPt.x, startingPt.y);

    // For each character in the sentence, do its associated instruction
    for (let i = 0; i< sentence.length; i++){

        let current = sentence.charAt(i);

        switch(current){

            case "F":
                line(0,0,0,-len);
                translate(0,-len);
                break;

            case "G":
                line(0,0,0,-len);
                translate(0,-len);
                break;

            case "+":
                angleMode(DEGREES);
                rotate(angle);
                break;

            case "-":
                angleMode(DEGREES);
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

    //angle = document.getElementById("angle").value;

    // Decrease length of branches
    len *= document.getElementById("truncation").value;

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
    console.log(sentence);

    // Illustrate the sentence
    drawSentence();
}

function keyPressed(){
    switch(keyCode){
        case 81: // Q - grow
            generateSentence();
            break;

        case 82: // R - restart 
            newDiagram();
            break;

        case 83: // S - Save
            saveCanvas("Grid","png");
            break;
    }
}