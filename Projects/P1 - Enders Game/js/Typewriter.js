// Typewriter class

// Responsible for "typing" the text out

class Typewriter{

    constructor(speed){

        // Delay between characters
        this.speed = speed;

        // Evaluates the message up to this index
        this.index = 0;

        // Last update timestamp (ms)
        this.last = 0;
        
    }

    // Updates the index if enough time has passed.
    updateTypewriter(){

        // SOURCE: https://editor.p5js.org/cfoss/sketches/SJggPXhcQ
        if (millis() > this.last + this.speed) {
            this.index ++;
            this.last = millis();
        }
    }

    // Returns text to be written to the screen
    typedText(t){
        return(t.substring(0, this.index));
    }

    
}