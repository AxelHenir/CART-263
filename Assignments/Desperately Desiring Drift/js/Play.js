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

    // Set drag for the user so they decelerate naturally
    this.user.setDrag(65);

    // Set the max speed of the user so they dont go too fast 
    this.user.body.setMaxSpeed(120);

  }

  update(){

    this.handleDrift();

  }

  // Handles user input
  handleDrift(){

    console.log(this.user.body.speed);

    if (this.cursors.left.isDown) {

      this.user.setAngularVelocity(-100);

    } else if (this.cursors.right.isDown) {

      this.user.setAngularVelocity(100);

    } else {

      this.user.setAngularVelocity(0);

    }

    // Check if user is accelerating or braking
    if (this.cursors.up.isDown) {

      // If the user is pressing W/up, accelerate
      this.physics.velocityFromRotation(this.user.rotation, 75, this.user.body.acceleration);

    } else if (this.cursors.down.isDown) {

      // If the user is pressing S/down, brake (accelerate in the opposite direction)
      this.physics.velocityFromRotation(this.user.rotation, -44, this.user.body.acceleration);

    } else {

      // If the user is not accelerating or decelerating, set the acceleration to zero
      this.user.setAcceleration(0);

    }

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