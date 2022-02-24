class Game{

    constructor(){

        // Wave size
        this.WAVE_SIZE = 30;

        // Storage for bullets
        this.bullets = [];

        // Storage for our enemies
        this.enemies = [];

        // Populate it
        for(let i = 0; i< this.WAVE_SIZE; i++ ){

            let enemy = new Enemy();
    
            this.enemies.push(enemy);

        }

        this.player = {

            // Grace period, immunity to dmg after taking dmg (ms)
            GRACE_PERIOD: 200,

            // Time between shots (ms)
            WEAPON_COOLDOWN: 100,

            hp:100,
            level:0,
            size:50,
            x:0,
            y:0,
            lastHit:0,
            lastShot:0,
        }
        
    }

    // Displays the player at its coordinates
    drawPlayer(player){

        push();
        ellipseMode(CENTER);
        textAlign(CENTER,CENTER);
        fill(0);
        ellipse(player.x,player.y,player.size,player.size);

        // And his HP
        textSize(12);
        fill(255);
        text(player.hp,player.x,player.y);
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

    // Checks if any of the enemies contain the player) // Returns T/F
    checkCollision(enemies, player){
        for(let i = 0; i < enemies.length; i++ ){

            let d = dist(player.x,player.y,enemies[i].x, enemies[i].y);

            if(d < enemies[i].size/2 + player.size/2){
                
                return true;
            }
        }

        return false;
    }

    // Deals 1 damage to the player and applies a small grace period
    damage(player){

        if((millis() - player.lastHit) > player.GRACE_PERIOD){
            
            player.hp--;
            player.lastHit = millis();
            //console.log("Ow!", player.hp);
        }

    }

    // 
    playerShoot(player){

        if((millis() - player.lastShot) > player.WEAPON_COOLDOWN){

            let bullet = {
                x:player.x,
                y:player.y,
                friendly:true,
            }
            this.bullets.push(bullet);
            player.lastShot = millis();
            //console.log("BANG!!");
        }
        
    }

    // Draws all bullet in the scene
    drawBullets(bullets){
        for(let i = 0; i < bullets.length; i++){
            push();
            fill(100,255,50);
            translate(bullets[i].x,bullets[i].y);
            ellipse(10,0,10,50);
            ellipse(-10,0,10,50);
            pop();
        }
    }

    // Updates all bullets
    updateBullets(bullets){
        for(let i = 0; i < bullets.length; i++){

            // Friendly bullets go up
            if(bullets[i].friendly){

                // 7 Px / sec
                bullets[i].y -= 7;

            } else {

                // Enemy bullets 5px/sec
                bullets[i].y += 5;
            }
        }
    }

    // Has the bullets do damage
    bulletDamage(){

        // Tracks 
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

            } else {

                let d = dist(b.x,b.y,this.player.x,this.player.y);
                if(d < this.player.size/2 + 25){ // Adequate bullet size (25)
                    this.player.hp -= 15; // Damage
                    dmgDealt = true; 
                }

            }

            if(dmgDealt){
                this.bullets.splice(i,1);
            }
            
        }
    }

    // Cleans up the dead enemies
    cleanupDead(){
        for(let i = 0; i < this.enemies.length ; i++ ) {
            if(this.enemies[i].hp <= 0){
                this.enemies.splice(i,1);
            }
        }
    }

    // Has the enemies shoot
    enemyShoot(enemies){

        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].cooldown < 0){
                let bullet = {
                    x:enemies[i].x,
                    y:enemies[i].y,
                    friendly:false,
                }
                this.bullets.push(bullet);
                enemies[i].cooldown = random(100,1000);
            }
            enemies[i].cooldown--;
        }
    }

    // Starts a new level
    newLevel(){

        // Check if the game is over..
        if(this.player.level > 1){ // PLACEHOLDER

            state.nextScene();

        } else {
            // Increment the player's level
            this.player.level++;

            // Empty bullets
            this.bullets = [];

            // Empty Enemies
            this.enemies = [];

            // re-Populate it
            for(let i = 0; i< this.WAVE_SIZE; i++ ){

                let enemy = new Enemy();
    
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

        // Draw the elements

        this.drawBullets(this.bullets);
        this.drawEnemies(this.enemies);
        this.drawPlayer(this.player);

        // Check if the player has won or lost
        this.checkVictory();

    }

}