// State class tracks the state of the program


class State{

    constructor(script){

        this.script = script;

        // Act counter
        this.act = 0;

        // Scene counter
        this.sceneCounter = 0;
        this.scene = this.script.scene[this.sceneCounter];

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
        this.scene = this.script.scene[this.sceneCounter];

        // Set line to 0 (new scene)
        this.lineCounter = 0;

        // Update line
        this.line = this.scene.line[this.lineCounter];

    }

    // Sets the line to the next line
    nextLine(){

        // Increase the line counter
        this.lineCounter++;

        // Update the line
        this.line = this.scene.line[this.lineCounter];

        
    }

    getSpeaker(){

    }

    getRecipient(){

    }

    

}