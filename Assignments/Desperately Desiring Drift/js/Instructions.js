// Instructions: Scene which is displayed after boot is comeplete.
// Displays the instructions and controls for the game and prompts the user to begin with a keypress

class Instructions extends Phaser.Scene {

    // Set the key to instrucitons
    constructor() {
        super({
        key: "instructions"
        });
    }

    preload() {

    }

    create() {

        // Style object which contains the attributes of my text
        let style = {
            fontFamily: "sans-serif",
            fontSize: "40px",
            fill: "#ffffff",
            align: "center",
        };

        // The text for the screen
        let gameInstructions = "Desperately Desiring Drift \n\nUse WASD to control your car\nCollect fuel to keep drifting!\nAvoid the cops!\nShow the world what it means to drift!\n\n Press ENTER to Drift";

        // Create the text object to display and pass the position (x,y), text and style
        this.gameText = this.add.text(170,300,gameInstructions,style);

        // Create keys to advance to the next page/scene
        let keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyEnter.on("down", () => this.scene.start("play"));
    }

    update() {

    }

}