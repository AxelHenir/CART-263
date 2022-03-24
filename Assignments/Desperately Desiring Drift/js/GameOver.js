// GameOver: Scene which plays after the user finishes playing.
// Displays score and prompts user to restart with a keypress

class GameOver extends Phaser.Scene {

    // Set the key to GameOver
    constructor() {
        super({
        key: "gameover"
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
        let endScreenDetails = "Game Over! \nPress ENTER to restart";

        // Create the text object to display and pass the position (x,y), text and style
        this.gameText = this.add.text(100,100,endScreenDetails,style);

        // Create keys to advance to the next page/scene
        let keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyEnter.on("down", () => this.scene.start("play"));
    }

    update() {

    }

}