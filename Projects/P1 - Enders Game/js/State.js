// State class tracks the state of the program


class State{

    constructor(script){

        this.script = script;

        // Act counter
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
        console.log(this.sceneCounter);

        // Update scene
        this.scene = this.script[this.sceneCounter];
        console.log(this.scene);

        // Set line to 0 (new scene)
        this.lineCounter = 0;

        // Update line
        this.line = this.scene.line[this.lineCounter];
        console.log(this.line);

    }

    // Sets the line to the next line
    nextLine(){

        // Increase the line counter
        this.lineCounter++;

        // If there are no more lines, trigger the next scene
        if(this.lineCounter > this.scene.line.length-1){

            console.log("next scene...");
            // Next scene
            this.nextScene();
        } else {
            // Update the line
            this.line = this.scene.line[this.lineCounter];
        }

        

    }

    getSpeaker(){

    }

    getRecipient(){

    }

    

}