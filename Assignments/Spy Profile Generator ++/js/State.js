class State{

    constructor(){

        // Stage = the stage of the program (enterName, enterPass, display)
        this.stage = this.homescreen;
    
    }

    // User is on the homescreen
    homescreen(){

        // Black background
        background(0);

        // White text
        push();
        textSize(64);
        textAlign(CENTER, CENTER);
        textFont(`Courier, monospace`);
        fill(255);
        text("** SPY DATABASE **", width/2, height/2);
        textSize(24);
        text("** Press '1' to generate RANDOM profile **", width/2, height*0.55);
        text("** Press '2' to generate CUSTOM profile **", width/2, height*0.575);
        pop();

    }

    // Program is currently displaying a profile
    displayingProfile(){

        // Display the spy profile on screen as per its display function
        profile.displaySpyProfile();

    }

}