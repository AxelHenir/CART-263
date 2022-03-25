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

    this.cops = [];

    // Create audio objects for the cop siren, background music and user's car engine
    this.sirenSFX = this.sound.add("siren", {mute: false, volume: 0.5, rate: 1, loop: true});
    this.musicSFX = this.sound.add("music", {mute: false, volume: 0.5, rate: 1, loop: true});

    // Start playing the BG music and the cop siren
    this.musicSFX.play();
    this.sirenSFX.play();

    // Create the sprites for the user, cop and fuel
    this.user = this.physics.add.sprite(500,500,"user");
    //this.cop = this.physics.add.sprite(200,100,"cop");
    this.fuel = this.physics.add.sprite(300,100,"fuel");

    // Style object which contains the attributes of text
    this.style = { fontFamily: "sans-serif", fontSize: "20px", fill: "#ffffff"};

    // Create a variable which tracks how much fuel the user has
    this.fuelRemaining = 100;
    this.fuelRemainingText = this.add.text(825,25,"FUEL: " + this.fuelRemaining + "%", this.style);

    // Create a variable which tracks the user's score
    this.score = 0;
    this.scoreText = this.add.text(25,25,"DRIFT SCORE: " + this.score, this.style);

    // Create animations for the cop car object
    this.createAnims();

    // Set collision physics
    this.setCollisionPhysics();

    // Set drag for the user so they decelerate naturally
    this.user.setDrag(65);

    // Set the max speed of the user so they dont go too fast 
    this.user.body.setMaxSpeed(125);

    // Re-position the fuel randomly
    this.respawnfuel();

    // Spawn our first cop
    this.spawnCop();

  }

  // Create a cop spawning function to sequentially add cop objects to the cop array
  spawnCop = () => {

    // Create a protocop object to add physics colliders and such to
    let protoCop = this.physics.add.sprite(500,-50, "cop");

    // Cops spawn offscreen so we must allow them to pass through the world border
    protoCop.setCollideWorldBounds(false);

    // If user and cop overlap, game over
    this.physics.add.overlap(this.user, protoCop, this.gameOver, null, this);

    // Add a collider between all other cops
    this.cops.forEach(cop => this.physics.add.collider(protoCop, cop));

    // The config object for the cop car siren animation
    let copAnimConfig = {
      key: "flashingLights",
      frames: this.anims.generateFrameNumbers("cop",{
        start:0,
        end:2,
      }),
      frameRate: 8,
      repeat: -1,
  }

    // Create and play the animation, pass it the config above
    this.anims.create(copAnimConfig);
    protoCop.play("flashingLights");

    // Add the protocop to the array of cops
    this.cops.push(protoCop);

  }

  // Takes care of user input, cop movement and displays score and fuel.
  update(){

    // Handle the user's input
    this.handleDrift();

    // Make the cops face n' chase the user
    this.cops.forEach(cop => {

      // Make each cop face the user
      cop.setRotation(Phaser.Math.Angle.Between(cop.x,cop.y,this.user.x,this.user.y));

      // make each cop move toward the user
      this.physics.moveToObject(cop, this.user, 110);

    });

  }

  // Handles user input
  handleDrift(){

    // Checks for which direction the user is steering
    if (this.cursors.left.isDown) {

      // Left
      this.user.setAngularVelocity(-100);

    } else if (this.cursors.right.isDown) {

      // Right
      this.user.setAngularVelocity(100);

    } else {

      // If neither, set angular acc. to zero
      this.user.setAngularVelocity(0);

    }

    // Check if user is accelerating or braking
    if (this.cursors.up.isDown && this.fuelRemaining > 0) {

      // Increase the player's score (survival time)
      this.score ++;

      // Update the player's score in the text object
      this.scoreText.setText("DRIFT SCORE: " + this.score);

      // If the user is pressing W/up, accelerate
      this.physics.velocityFromRotation(this.user.rotation, 84, this.user.body.acceleration);

      // Acceleration consumes fuel
      this.fuelRemaining -= 0.01;

      // Round the fuel remaining to 2 decomal places for readability
      this.fuelRemaining = this.fuelRemaining.toFixed(2);

      // Update the fuelRemainingText to reflect the change
      this.fuelRemainingText.setText("FUEL: " + this.fuelRemaining + "%");

    } else if (this.cursors.down.isDown && this.fuelRemaining > 0) {

      // If the user is pressing S/down, brake (accelerate in the opposite direction)
      this.physics.velocityFromRotation(this.user.rotation, -44, this.user.body.acceleration);

    } else {

      // If the user is not accelerating or decelerating, set the acceleration to zero
      this.user.setAcceleration(0);

    }

  }

  // Responsible for creating the cop animations
  createAnims(){

    

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

    // If the user and fuel overlap, add fuel
    this.physics.add.overlap(this.user, this.fuel, this.collectFuel, null, this);

  }

  // Collects the fuel, adding fuel to the user's tank and respawns fuel somewhere else
  // Also spawns another cop to chase the user
  collectFuel(){

    // Respawn the fuel
    this.respawnfuel();

    // Add fuel to fuel tank
    this.fuelRemaining = 100;

    // User cannot have more than 100 fuel, cap if exceeds
    if(this.fuelRemaining > 100) this.fuelRemaining = 100;

    // Update the fuelRemainingText to reflect the change
    this.fuelRemainingText.setText("FUEL: " + this.fuelRemaining + "%");

    // Spawn new cop
    this.spawnCop();

  }

  // Respawns the fuel randomly within a circle centered on the screen
  respawnfuel(){

    // Describe the circle
    const fuelSpawnCircle = new Phaser.Geom.Circle(500,500,500); // located at 500,500 with r: 500

    // Re-position the fuel randomly
    Phaser.Actions.RandomCircle([this.fuel], fuelSpawnCircle);

  }

  // Sets the next scene to game over
  gameOver(){

    // Stops the music and SFX
    this.musicSFX.stop();
    this.sirenSFX.stop();

    // Starts gameover scene and passes the user's score.
    this.scene.start("gameover", {score: this.score});

  }

}