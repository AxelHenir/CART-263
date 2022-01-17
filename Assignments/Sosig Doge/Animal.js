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
    this.image = image;
    this.angle = 0;
  }
  
  // Updates the animal
  update() {

    // Displays the animal using display method
    this.display();
  }
  
  // Displays this animal's image
  display() {

    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();

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