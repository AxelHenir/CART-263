// Enemy class - Makes and governs enemies for the game portion of the program

// Enemies come in two types: Dive and Hover
// Dive enemies attack by diving from the top to the bottom of the screen
// Hover enemies attack by shooting spores downwards

// Enemies use sprites passed to the constructor to display themselves
// Enemies have their own movement patterns

class Enemy{

    constructor(sprites){

        // Randomly choose if this enemy is a dive or hover enemy
        this.type = random(["Dive","Hover"]);

        // Load the sprites into the enemy's data
        this.sprites = sprites;

        // Spawn the enemy according to its type
        switch(this.type){

            case "Dive":

                // Dive enemies spawn offscreen
                this.x = random(0, 1000);
                this.y = random(-100,-10000);

                // Random size
                this.size = random(100,150);

                // Hp is based on size
                this.hp = floor(this.size/3);

                // Dive enemies don't shoot projectiles so no need for a cooldown
                this.cooldown = undefined;

                break;

            case "Hover":

                // Hover enemies spawn on screen
                this.x = random(0, 1000);
                this.y = random(100,500);

                // Random size
                this.size = random(100,150);

                // Hp is based on size
                this.hp = floor(this.size/3);

                // Projectile shooting cooldown
                this.cooldown = random(100,1000);
    
                break;

        }

    }

    // Displays the enemy using the associated sprite
    display(){

        switch(this.type){

            case "Hover":
                push();
                imageMode(CENTER,CENTER);
                image(this.sprites[4],this.x, this.y, this.size, this.size);
                textAlign(CENTER,CENTER);
                fill(0);
                text(this.hp,this.x,this.y);
                pop();
                break;
            
            case "Dive":
                
                // If the enemy is offscreen, draw a warning indicator on the top of the screen
                if(this.y < -100){
                    push();
                    imageMode(CENTER,CENTER);
                    image(this.sprites[5],this.x, 50, 50, 50);
                    pop();
                } else { // Otherwise, draw the enemy itself
                    push();
                    imageMode(CENTER,CENTER);
                    image(this.sprites[3],this.x, this.y, this.size, this.size);

                    // Health
                    textAlign(CENTER,CENTER);
                    fill(0);
                    text(this.hp,this.x,this.y);
                    pop();
                }
                
                break;
            
        }
        

    }

    // Updates the properties of the enemy based on its type
    update(){

        // Check which type the enemy is
        switch(this.type){

            case "Dive":

                // Make the enemy "dive" the player
                this.y += 16;

                // If the enemy has flown down past the bottom of the screen, reset it
                if(this.y > height){
                    this.y = random(-1000,-5000);
                    this.x = random(0,width);
                }

                break;

            case "Hover":

                // Hover enemies just fly randomly on the screen
                this.x += random(-3,3);
                this.y += random(-3,3);

                // Constrain the enemies to the screen (left, right)
                this.x = constrain(this.x,0,width);
                this.y = constrain(this.y,0,height*0.8);
    
                break;

        }
    }



}