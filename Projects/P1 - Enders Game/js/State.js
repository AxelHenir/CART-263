// State class tracks the state of the program


class State{

    constructor(script){

        this.script = script;

        // Scene counter
        this.sceneCounter = 0;

        // Load the current scene
        this.scene = this.script[this.sceneCounter];

        // Liner counter
        this.lineCounter = 0; 

        // Get current info on the lines in the scene
        this.currentlySpeaking = this.scene.lines[this.lineCounter].speaker;
        this.currentLine = this.scene.lines[this.lineCounter].line;

    }

    // Sets the scene to the next scene
    nextScene(){

        // Increase scene counter
        this.sceneCounter ++ ;

        // Set the new scene
        this.scene = this.script[this.sceneCounter];

        // Set line to 0 (new scene)
        this.lineCounter = 0 ;

        // Play the music for this scene
        audio.playBackgroundMusic(this.scene.music);

        // Enqueue the fx for this line
        audio.playFX(this.scene.lines[this.lineCounter].fx);

        // Update text 
        this.currentlySpeaking = this.scene.lines[this.lineCounter].speaker;
        this.currentLine = this.scene.lines[this.lineCounter].line;

    }

    // Sets the line to the next line
    nextLine(){

        // Enqueue the fx for this line
        audio.playFX(this.scene.lines[this.lineCounter].fx);

        // Increase the line counter
        this.lineCounter++;

        // If there are no more lines, trigger the next scene
        if(this.lineCounter > this.scene.lines.length-1){

            // Next scene
            this.nextScene(); 

        } else {

            // Update text 
            this.currentlySpeaking = this.scene.lines[this.lineCounter].speaker;
            this.currentLine = this.scene.lines[this.lineCounter].line;

        }

    }

}