// State class tracks the state of the program
// User can swap between the homescreen, displayingProfile, badLogin, noData
// Each state is a function which is run by the draw() loop in sketch.js

class State{

    constructor(){

        // Stage = the stage of the program (homescreen, displayingProfile, badLogin, noData)
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
        text("** Press '3' to login to EXISTING profile **", width/2, height*0.6);
        pop();

    }

    // Program is currently displaying a profile
    displayingProfile(){

        // Display the spy profile on screen as per its display function
        profile.displaySpyProfile();

    }

    // User entered incorrect credentials
    badLogin(){

        // Black background
        background(0);

        // White text
        push();
        textSize(32);
        textAlign(CENTER, CENTER);
        textFont(`Courier, monospace`);
        fill(255,0,0);
        text("** INVALID CREDENTIALS **", width/2, height/2);
        textSize(24);
        text("Press 'R' to RETURN to database", width/2, height*0.55);
        pop();

    }

    // No data is stored
    noData(){

        // Black background
        background(0);

        // White text
        push();
        textSize(32);
        textAlign(CENTER, CENTER);
        textFont(`Courier, monospace`);
        fill(255,0,0);
        text("** 404: DATA NOT FOUND **", width/2, height/2);
        textSize(24);
        text("Press 'R' to RETURN to database", width/2, height*0.55);
        pop();

    }

}