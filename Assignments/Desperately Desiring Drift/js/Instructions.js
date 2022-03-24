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
        };

        // The text for the screen
        let gameInstructions = "Desperately Desiring Drift!";

        // Create the text object to display and pass the position (x,y), text and style
        this.gameText = this.add.text(100,100,gameInstructions,style);

        // Create keys to advance to the next page/scene
        let keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyEnter.on("down", () => this.scene.start("play"));
    }

    update() {

    }

}