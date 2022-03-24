// Boot: Scene which is repsonsible for booting the game and loading all assets
// Will automatically move to the instructions once the loading is complete

class Boot extends Phaser.Scene {

    // Set the key to boot
    constructor() {
        super({
        key: `boot`
        });
    }

    // Loads assets then switches to the play scene once completed
    preload() {

      // Load images
        this.load.image("user", "assets/images/user.png");
        this.load.image("police", "assets/images/police.png");
        this.load.image("fuel", "assets/images/fuel.png");

      // Switch to the play scene on complete
        this.load.on("complete", () => {
        this.scene.start("instructions");
        });
    }

    create() {

    }

    update() {

    }

}