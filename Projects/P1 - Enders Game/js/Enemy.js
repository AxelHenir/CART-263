class Enemy{

    constructor(){

        this.type = random(["Dive","Hover"]);

        switch(this.type){

            case "Dive":

                this.x = random(0,width);
                this.y = random(-100,-10000);
                this.size = random(50,100);
                this.hp = 50;
                this.cooldown = undefined;

                break;

            case "Hover":

                this.x = random(0,width);
                this.y = random(100,500);
                this.size = random(50,100);
                this.hp = 200;
                this.cooldown = random(100,1000);
    
                break;

        }

    }

    display(){

        switch(this.type){

            case "Hover":
                push();
                fill(250,100,100);
                ellipseMode(CENTER);
                ellipse(this.x, this.y, this.size, this.size);
                textAlign(CENTER,CENTER);
                fill(0);
                text(this.hp,this.x,this.y);
                pop();
                break;
            
            case "Dive":
                
                if(this.y < -100){
                    push();
                    ellipseMode(CENTER);
                    fill(255,255,100); 
                    ellipse(this.x, 50, 25, 25);
                    pop();
                } else {
                    push();
                    fill(250,100,100);
                    ellipseMode(CENTER);
                    ellipse(this.x, this.y, this.size, this.size);
                    textAlign(CENTER,CENTER);
                    fill(0);
                    text(this.hp,this.x,this.y);
                    pop();
                }
                
                break;
            
        }
        

    }

    update(){

        switch(this.type){

            case "Dive":

                // DIVE
                this.y += 16;

                // Offscreen? Fix
                if(this.y > height){
                    this.y = random(-1000,-5000);
                    this.x = random(0,width);
                }

                break;

            case "Hover":

                this.x += random(-3,3);
                this.y += random(-3,3);

                this.x = constrain(this.x,0,width,);
                this.y = constrain(this.y,0,height*0.8);
    
                break;

        }
    }



}