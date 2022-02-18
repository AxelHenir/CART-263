// State class tracks the state of the program


class State{

    constructor(script){

        this.script = script;

        // Act counter - story mode or game?
        this.act = 0;

        // Scene counter
        this.sceneCounter = 0;
        this.scene = this.script[this.sceneCounter];

        // Line counter
        this.lineCounter = 0; 
        this.line = this.scene.line[this.lineCounter];

        // Scenes in this program are treated as the serialized: Act A, Scene B, Line C.
    }

    // Sets the scene to the next scene
    nextScene(){

        // Increase scene counter
        this.sceneCounter++;

        // Update scene
        this.scene = this.script[this.sceneCounter];
        console.log(this.scene); // ABRUPT END FIX THIS

        // Set line to 0 (new scene)
        this.lineCounter = 0;

        // Update line
        this.line = this.scene.line[this.lineCounter];

    }

    // Sets the line to the next line
    nextLine(){

        // Increase the line counter
        this.lineCounter++;

        // If there are no more lines, trigger the next scene
        if(this.lineCounter > this.scene.line.length-1){

            // Next scene
            this.nextScene();

        } else {

            // Update the line
            this.line = this.scene.line[this.lineCounter];

        }

    }

    // Sets the act, can change the gamemode from story to game
    nextAct(){

        // Increase the act counter
        this.act++;

    }

}