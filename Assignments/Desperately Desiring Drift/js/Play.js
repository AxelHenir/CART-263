// Play: The main game scene
// Allows the user to control the user car
// Cop will chase the user
// User must collect fuel and drift to increase their score
// If the user runs out of fuel or is hit by the cop, the user's run ends and the next scene will be triggered

class Play extends Phaser.Scene {

    //Just sets the scene's key name
    constructor() {

        super({ 
          key: "play"
        });

    }

    preload(){

    }

    create(){

      // Create the sprites for the user, cop and fuel
      this.user = this.physics.add.sprite(500,500,"user");
      this.cop = this.physics.add.sprite(200,100,"cop");
      this.fuel = this.physics.add.sprite(300,100,"fuel");

      // Create animations for the cop car
      this.createAnims();

      // Set collision physics
      this.setCollisionPhysics();

    }

    update(){
      this.handleInput();
    }

    // Responsible for creating the cop animations
    createAnims(){

      // The config object for the cop car siren animation
      let copAnimConfig = {
        key: "sirens",
        frames: this.anims.generateFrameNumbers("cop",{
          start:0,
          end:2,
        }),
        frameRate: 8,
        repeat: -1,
      }

      // Create and play the animation, pass it the config above
      this.anims.create(copAnimConfig);
      this.cop.play("sirens");

      // Create a control scheme to control the user's car
      this.cursors = this.input.keyboard.addKeys({
        up:Phaser.Input.Keyboard.KeyCodes.W, // Re-map arrows to WASD
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D,
        });

    }

    handleInput() {

      if (this.cursors.left.isDown) {
        this.user.setVelocityX(-100);
      }
      else if (this.cursors.right.isDown) {
        this.user.setVelocityX(100);
      }
      else {
        // If neither left or right are pressed, stop moving on x
        this.user.setVelocityX(0);
      }
  
      if (this.cursors.up.isDown) {
        this.user.setVelocityY(-100);
      }
      else if (this.cursors.down.isDown) {
        this.user.setVelocityY(100);
      }
      else {
        // If neither up or down are pressed, stop moving on y
        this.user.setVelocityY(0);
      }

    }

    // Responsible for adding the collision physics to all the game elements
    setCollisionPhysics(){

      // User and cop cannot leave the canvas
      this.user.setCollideWorldBounds(true);
      this.cop.setCollideWorldBounds(true);
      
      // If user and cop overlap, game over
      this.physics.add.overlap(this.user, this.cop, this.gameOver, null, this);
    }

    gameOver(){
      this.scene.start("gameover");
    }

}