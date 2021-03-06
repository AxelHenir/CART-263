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
    this.load.spritesheet("cop", "assets/images/police.png", {
      // Cops have flashing lights, 3 frames
      frameWidth:50,
      frameHeight:24,
      endFrame: 2,
    });

    this.load.image("fuel", "assets/images/fuel.png");

    // Load audio files
    this.load.audio("siren", "assets/sounds/siren.mp3");
    this.load.audio("music", "assets/sounds/music.mp3");

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