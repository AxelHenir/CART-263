function Particle(){

    this.pos = createVector(random(0,width),random(0,width));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 0.1;

    this.update = function() {

        this.edges();
        this.vel.limit(this.maxSpeed);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function(f){
        this.acc.add(f);
    }

    this.show = function(){
        push();
        stroke(0,5);
        strokeWeight(random(1,5));
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.edges = function(){
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.y < 0) this.pos.y = height;

    }

    this.follow = function(vectors){
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);

        let index = x + y * cols;

        this.applyForce(vectors[index]);
    }

}