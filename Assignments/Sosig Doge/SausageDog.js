/*
Class Sausage Dog
  - Sausage Dog objects have a position (x,y), an image, and an angle
  - Sausage Dog objects have a method which updates them (redraw, reposition, etc.)
  - Sausage Dog is like the "goal" and therefore has extra methods to handle this.
  - Sausage Dog can be "found" if it's clicked on. It will spin when this happens.
*/

class SausageDog extends Animal {
    
  // Constructor
  constructor(x, y, image, diff) {

    // Use the animal constructor to make the base of the object
    super(x, y, image, diff);
  
    // New property: found = SD is found or not
    this.found = false;

    // New property: rotation speed = how fast image rotates when found
    this.rotationSpeed = 0.25;

  }
  
  // Updates the SD
  update() {

      // Use the animal update method
      super.update();

      // Additionally, check if found
      if (this.found) {

        // Spin if found
        this.angle += this.rotationSpeed;

      }

  }
  
  // Checks if this sausage dog was clicked and handles it if it's found
  mousePressed() {

    // Use overlap method from animal class
    if (!this.found && this.overlap(mouseX, mouseY)) {

      // Set to found if clicked
      this.found = true;

    }

  }

}