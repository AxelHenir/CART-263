class Enemy{

    constructor(){

        this.type = random(["Dive","Hover"]);

        switch(this.type){

            case "Dive":

                this.x = random(0,width);
                this.y = random(-100,-1000);
                this.size = random(50,100);
                this.hp = 50;

                break;

            case "Hover":

                this.x = random(0,width);
                this.y = random(100,500);
                this.size = random(50,100);
                this.hp = 200;
    
                break;

        }

    }

    display(){

        push();
        fill(250,100,100);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.size, this.size);
        textAlign(CENTER,CENTER);
        fill(0);
        text(this.hp,this.x,this.y);
        pop();

    }

    update(){
        
    }



}