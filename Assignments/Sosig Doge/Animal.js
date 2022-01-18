/*
Class Animal
  - Animal objects have a position (x,y), an image, and an angle
  - Animal objects have a method which updates them (redraw, reposition, etc.)
*/

class Animal {
    
  // Constructor
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.level = this.y;
    this.image = image;
    this.angle = 0;
    this.idle = random([true,false]);
    this.facing = random(["left","right"]);
    this.heading = random(["up","down"]);
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
      scale(-1,1);
    }
    else{
      scale(1,1);
    }
    image(this.image, 0, 0);
    pop();

  }

  checkBoundaries(){
    if(this.x>=950){
      this.facing = "left";
    }
    else if (this.x <=50){
      this.facing = "right";
    }
    if(this.y<=50){
      this.heading = "down";
    }
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
        // move in that direction
        this.x--;
      }
      else{
        this.x++;
      }

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