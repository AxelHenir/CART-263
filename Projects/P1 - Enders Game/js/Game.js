// Game class

// Handles the logic and gameplay of the game section of the program
// 

class Game{

    constructor(sprites){

        // Sprites for game elements
        this.sprites = sprites;

        // Wave size
        this.WAVE_SIZE = 20;

        // Storage for bullets
        this.bullets = [];

        // Storage for our enemies
        this.enemies = [];

        // Populate it
        for(let i = 0; i< this.WAVE_SIZE; i++ ){

            let enemy = new Enemy(this.sprites);
    
            this.enemies.push(enemy);

        }

        // Player object
        this.player = {

            // Grace period, immunity to dmg after taking dmg (ms)
            GRACE_PERIOD: 200,

            // Time between shots (ms)
            WEAPON_COOLDOWN: 225,

            // Health
            hp:100,

            // How many waves the player has cleared
            level:0,

            // Size of the player's sprite
            size:100,

            // X and Y position of the enemy
            x:0,
            y:0,

            // Trackers for the delays in taking damage and shooting
            lastHit:0,
            lastShot:0,
        }
        
    }

    // Displays the player at its coordinates
    drawPlayer(player){

        push();
        imageMode(CENTER, CENTER);
        image(this.sprites[2],player.x,player.y,player.size,player.size);

        // And his HP
        textAlign(CENTER,CENTER);
        textSize(12);
        fill(255);
        text(player.hp,player.x,player.y+ (player.size*0.75));
        pop();

    }

    // Displays the enemies
    drawEnemies(enemies){
        for(let i = 0; i < enemies.length; i++ ){
            enemies[i].display();
        }
    }

    // Updates the enemies' positions
    updateEnemies(){
        for(let i = 0; i < this.enemies.length ; i++){
            this.enemies[i].update();
        }
    }

    // Checks if any of the enemies contain the player // Returns T/F
    checkCollision(enemies, player){
        for(let i = 0; i < enemies.length; i++ ){

            let d = dist(player.x,player.y,enemies[i].x, enemies[i].y);

            if(d < enemies[i].size/2 + player.size/2){
                
                return true;
            }
        }

        return false;
    }

    // Deals damage to the player and applies a small grace period
    damage(player){

        // Check f the last grace period has finished
        if((millis() - player.lastHit) > player.GRACE_PERIOD){
            
            // Take damage
            player.hp--;

            // Apply new grace period
            player.lastHit = millis();

            // Play the associated audio snippet
            audio.playFX(7);

        }

    }

    // Has the player shoot a bullet
    playerShoot(player){

        // Check if its time to shoot!
        if((millis() - player.lastShot) > player.WEAPON_COOLDOWN){

            // New bullet object
            let bullet = {
                x:player.x,
                y:player.y,
                friendly:true,
            }

            // Push it into the bullet array
            this.bullets.push(bullet);

            // Set a timeout for next bullet
            player.lastShot = millis();

            // Play the associated audio snippet
            audio.playFX(6);

        }
        
    }

    // Draws all bullet in the scene
    drawBullets(bullets){

        // For each bullet,
        for(let i = 0; i < bullets.length; i++){
            let b = bullets[i];
            push();
            imageMode(CENTER, CENTER);

            // Check if it is friendly
            if(b.friendly){

                // Display the bullet using the corresponding sprite
                image(this.sprites[0],b.x+15,b.y,50,50);
                image(this.sprites[0],b.x-15,b.y,50,50);

            } else {

                // Do the same if it's an enemy bullet
                image(this.sprites[1],b.x,b.y,50,50);
            }

            pop();
        }
    }

    // Updates all bullets
    updateBullets(bullets){

        // For each bullet,
        for(let i = 0; i < bullets.length; i++){

            // Friendly bullets go up
            if(bullets[i].friendly){

                // 7 Px / sec
                bullets[i].y -= 7;

            } else { // enemy bullets go down

                // Enemy bullets 5px/sec
                bullets[i].y += 5;
            }
        }
    }

    // Has the bullets do damage
    bulletDamage(){

        // Tracks if the bullet 
        let shot = false;

        // For each bullet,
        for(let i = 0; i< this.bullets.length; i++){

            // To track if it's dealt damage
            let dmgDealt = false;
            let b = this.bullets[i];

            // Off-screen bullets shouldn't exist!
            if(b.y > 1050 || b.y < -50){
                this.bullets.splice(i,1); 
            }

            // If it's a friendly bullet
            if(b.friendly){

                // Check if it collides with an enemy
                for(let j = 0 ; j < this.enemies.length; j++){
                    let e = this.enemies[j];
                    let d = dist(b.x,b.y,e.x,e.y);
                    if(d < e.size/2 + 25){ // Adequate bullet size (25)
                        e.hp -= 11; // Damage
                        dmgDealt = true; 
                    } 

                }

            } else { // If the bullet is an enemy bullet

                // Check distance
                let d = dist(b.x,b.y,this.player.x,this.player.y);
                if(d < this.player.size/2 + 25){ // Adequate bullet size (25)
                    this.player.hp -= 15; // Damage
                    dmgDealt = true; 

                    audio.playFX(7);
                }

            }

            // If the bullet dealt damage, splice it out.
            if(dmgDealt){
                this.bullets.splice(i,1);
            }
            
        }
    }

    // Cleans up the dead enemies
    cleanupDead(){

        // Check each enemy's hp
        for(let i = 0; i < this.enemies.length ; i++ ) {

            // If the enemy has 0 hp or less,
            if(this.enemies[i].hp <= 0){

                // Kill it.
                this.enemies.splice(i,1);

                // Let its deathcry be heard
                audio.playFX(random([2,3,4]));
            }
        }
    }

    // Has the enemies shoot
    enemyShoot(enemies){

        // for each enemy,
        for(let i = 0; i < enemies.length; i++){

            // Check if their shooting cooldown has elapsed
            if(enemies[i].cooldown < 0){

                // If it has, make a new enemy bullet object
                let bullet = {
                    x:enemies[i].x,
                    y:enemies[i].y,
                    friendly:false,
                }

                // Add it ot the bullet array
                this.bullets.push(bullet);

                // Set a new shoot cooldown for the enemy
                enemies[i].cooldown = random(100,1000);

                // Play the associated sound snippet
                audio.playFX(5);
            }

            // Decrement the cooldown timer of the enemy
            enemies[i].cooldown--;
        }
    }

    // Starts a new level
    newLevel(){

        // Check if the game is over..
        if(this.player.level >= 3){ // 3 Waves of attacks

            state.nextScene();

        } else {
            // Increment the player's level
            this.player.level++;

            // Empty bullets
            this.bullets = [];

            // Empty Enemies
            this.enemies = [];

            // re-Populate it
            for(let i = 0; i< (this.WAVE_SIZE + this.player.level*2); i++ ){

                let enemy = new Enemy(this.sprites);
    
                this.enemies.push(enemy);

            }
        }

    }

    // Checks to see if the player has won or lost the game yet
    checkVictory(){

        if(this.enemies.length == 0 ){
            console.log("victory! - Next wave incoming...");
            this.newLevel();
            // CALL VICTORY
        } else if (this.player.hp <= 0 ){
            console.log("defeat!");
            // CALL DEFEAT
        }

    }

    // Updates the game data and draws all elements. 
    updateGame(){

        // Update the player's movement
        this.player.x = mouseX;
        this.player.y = mouseY;

        // Update the enemy's movement
        this.updateEnemies();

        // Check if the player is rough-housing
        if(this.checkCollision(this.enemies, this.player)){
            
            this.damage(this.player);

        }

        // If holding right click, shoot
        if(mouseIsPressed){

            this.playerShoot(this.player);

        }

        // Perhaps have an enemy shoot
        this.enemyShoot(this.enemies);

        // Update the location of the bullets
        this.updateBullets(this.bullets);

        // Make players and enemies take damage from bullets
        this.bulletDamage();

        // Cleanup the dead
        this.cleanupDead();

        // Draw the various elements

        this.drawBullets(this.bullets);
        this.drawEnemies(this.enemies);
        this.drawPlayer(this.player);

        // Check if the player has won or lost
        this.checkVictory();

    }

}