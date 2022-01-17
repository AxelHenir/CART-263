class State{

    // constructor
    constructor(){

        // Stage = the stage of the game (title, ingame, finished, etc.)
        this.stage = this.title;

        // Score = amount of sausage dogs found in this game
        this.score = 0;
    }

    // Restarts the game
    restartGame(){

        // Back to the title screen
        this.stage = this.title;

        // Reset score to 0
        this.score = 0;

        // Make new animal search
        animals = [];
        sausageDog = undefined;

        createAnimals();
        createSausageDog();

    }

    // State function for when the game is complete
    finishedGame(){

        push();
        background(150);
        textAlign(CENTER);
        textSize(24);
        fill(255);
        text(`You found ${this.score}`,width/2,height*0.4);
        imageMode(CENTER);
        image(sausageDogImage,width/2,height/2);
        text("Press R to restart",width/2,height*0.6);
        pop();

    }

    // State function for when the game is in progress
    inGame(){

        // Background
        background(205);

        // Update the animals
        updateAnimals();

        // Update the SD
        updateSausageDog();

        // If the SD was found, end game
        if(sausageDog.found){
            this.score++;
            this.stage = this.finishedGame;

        }
        

    }

    // State function for the beginning of the game (title screen / instructions)
    title(){

        push();
        background(150);
        textAlign(CENTER);
        textSize(24);
        fill(255);
        text("Find as many",width/2,height*0.4);
        imageMode(CENTER);
        image(sausageDogImage,width/2,height/2);
        text("before time runs out!",width/2,height*0.6);
        text("Press ENTER to begin",width/2,height*0.9);
        pop();

    }
}