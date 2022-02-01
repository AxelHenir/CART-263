class State{

    // constructor
    constructor(){

        // Try to load the data
        let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));

        // Check if there was data to load
        if (data) {

            // If so, ask for the password
            let password = prompt("PASSWORD:");

            // Check if the password is correct
            if (password === data.password) {

                // If is is, then setup the spy profile with the data
                this.setupSpyProfile(data);

            }
        }

        else {

            // If there is no data, generate a spy profile for the user
            this.generateSpyProfile();

        }

        // Stage = the stage of the program (enterName, enterPass, display)
        this.stage = this.display;

    }

    // Generates a spy profile from JSON data
    generateSpyProfile() {

        // Ask for the user's name and store it
        spyProfile.name = prompt("ENTER YOUR NAME");

        // Generate an alias from a random instrument
        spyProfile.alias = `The ${random(instrumentsData.instruments)}`;

        // Generate a secret weapon from a random object
        spyProfile.secretWeapon = random(objectsData.objects);

        // Generate a password from a random keyword for a random tarot card
        let card = random(tarotData.tarot_interpretations);
        spyProfile.password = random(card.keywords);

        // Generate a random height (in cm)
        spyProfile.height = Math.floor(Math.random() * 110) + 100 + " cm";

        // Generate a random weight (in lbs)
        spyProfile.weight = Math.floor(Math.random() * 160) + 70 + " lbs";

        // Generate a random eye color from my JSON file.
        spyProfile.eyeColor = random(eyeColorData.colors);

        // Save the resulting profile to local storage
        localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));

    }

    // Assigns across the profile properties from the data to the current profile
    setupSpyProfile(data) {

        spyProfile.name = data.name;
        spyProfile.alias = data.alias;
        spyProfile.secretWeapon = data.secretWeapon;
        spyProfile.password = data.password;
        spyProfile.eyeColor = data.eyeColor;
        spyProfile.height = data.height;
        spyProfile.weight = data.weight;

    }

    display(){

        // Background color
        background(255);

        // Generate the profile as a string using the data
         let spyText = `** TOP SECRET SPY PROFILE ** 
Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}
Height: ${spyProfile.height}
Weight: ${spyProfile.weight}
Eye Color: ${spyProfile.eyeColor}
`;

    // Display the profile
    push();
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont(`Courier, monospace`);
    fill(0);
    text(spyText, width/2, height/2);
    pop();
    }

}