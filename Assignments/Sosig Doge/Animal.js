/*
Class Animal
  - Animal objects have a position (x,y), an image, and an angle
  - Animal objects have a method which updates them (redraw, reposition, etc.)
  - Animals can be idle or can be walking, this movement is handled by walking()
  - Animals cannot walk off the screen, handled by checkBoundaries()
  - Animals have a difficulty, it determines their size
*/

class Animal {
    
  // Constructor
  constructor(x, y, image, diff) {

    // Position
    this.x = x;
    this.y = y;

    // Level = the height they spawn at, needed for walking()
    this.level = this.y;

    // What the animal is
    this.image = image;

    // Angle
    this.angle = 0;

    // Spawns walking or idle, can switch at any time in walking()
    this.idle = random([true,false]);

    // 2D direction, an animal will have a combination of left/right and up/down
    this.facing = random(["left","right"]);
    this.heading = random(["up","down"]);

    // Difficulty of the animal - Adjusts size of the animal
    this.difficulty = diff;

  }
  
  // Updates the animal
  update() {

    // Displays the animal using display method
    this.display();

    // Handles movement. Animal can change to and from idle
    this.walking();

    // Check for and rescue escaping animals (boundaries)
    this.checkBoundaries();
  }
  
  // Displays this animal's image
  display() {

    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    if(this.facing == "left"){
      // Reflect the image
      scale(-1*this.difficulty,1*this.difficulty);
    }
    else{
      scale(1*this.difficulty,1*this.difficulty);
    }
    image(this.image, 0, 0);
    pop();

  }

  // Checks if an animal is trying to run off the screen, turns them around if they do
  checkBoundaries(){

    // Too far right?
    if(this.x>=950){
      this.facing = "left";
    }
    // Too far left?
    else if (this.x <=50){
      this.facing = "right";
    }
    // Too far up?
    if(this.y<=50){
      this.heading = "down";
    }
    // Too far down?
    else if(this.y >=950){
      this.heading = "up";
    }
  }

  // Handle "walking" movement
  walking(){

    // Chance to go from "Idle" to walking (or vise-vesa)
    let r = random(0,1);
    if (r>0.995){
      if(this.idle){
        this.idle = false;
      }
      else{
        this.idle = true;
      }
    }

    // If idle, do nothing
    // If walking,
    if(!this.idle){

      // Check which direction
      if(this.facing == "left"){

        // move left
        this.x--;

      }
      else{

        // move right
        this.x++;
      }

      // We want absolute value of sin function
      let y = 25*sin(0.01*this.x);
      if (y>= 0 ){
        this.y = y + this.level;
      }
      else{
        this.y = (y*-1) + this.level;
      }

    }
    

  }

  
  // Checks if given x y is contained within the animal image, returns T/F
  overlap(x, y) {

    // Check if x lies within x bounds and y within y bounds
    if (x > this.x - this.image.width / 2 &&
    x < this.x + this.image.width / 2 &&
    y > this.y - this.image.height / 2 &&
    y < this.y + this.image.height) {

      // If it does, return true
      return true;

    }

    else {

      // Otherwise, return false
      return false;

    }

  }

}