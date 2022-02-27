// State class tracks the state of the program (Scene #, Line #)

// Contains methods to move to the next scene or next line within the scene.
// Contains variables which other classes will access to learn about what to do for this scene.


class State{

    constructor(script){

        // Variable holds the script JSON
        this.script = script;

        // Scene counter to track which scene we are on
        this.sceneCounter = 0;

        // Load the current scene into memory
        this.scene = this.script[this.sceneCounter];

        // Liner counter to track which line we are on.
        this.lineCounter = 0; 

        // Get the current speaker, stored in the scene's properties
        this.currentlySpeaking = this.scene.lines[this.lineCounter].speaker;

        // Get the current line (the text), stored in the scene's properties
        this.currentLine = this.scene.lines[this.lineCounter].line;

    }

    // Sets the scene to the next scene
    nextScene(){

        // Increase scene counter
        this.sceneCounter ++ ;

        // Set the scene variable to the new scene
        this.scene = this.script[this.sceneCounter];

        // Set current line to 0 (new scene)
        this.lineCounter = 0 ;

        // Play the music for this scene
        audio.playBackgroundMusic(this.scene.music);

        // Play any sound effects associated with the line
        audio.playFX(this.scene.lines[this.lineCounter].fx);

        // Update current speaker
        this.currentlySpeaking = this.scene.lines[this.lineCounter].speaker;

        // Update current line (text)
        this.currentLine = this.scene.lines[this.lineCounter].line;

    }

    // Sets the line to the next line
    nextLine(){

        // Increase the line counter
        this.lineCounter++;

        // If there are no more lines, trigger the next scene
        if(this.lineCounter > this.scene.lines.length-1){

            // Next scene
            this.nextScene(); 

        } else {

            // Play any sound effects associated with the new line
            audio.playFX(this.scene.lines[this.lineCounter].fx);

            // Update current speaker
            this.currentlySpeaking = this.scene.lines[this.lineCounter].speaker;

            // Update the text for the line
            this.currentLine = this.scene.lines[this.lineCounter].line;

        }

    }

}