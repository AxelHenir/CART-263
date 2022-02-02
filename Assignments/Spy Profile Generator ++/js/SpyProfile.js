class SpyProfile{

    // constructor
    constructor(){

        // Basic default traits
        this.name = `**REDACTED**`;
        this.alias = `**REDACTED**`;
        this.secretWeapon = `**REDACTED**`;
        this.password = `**REDACTED**`;
    
        // Some traits of my own..
        this.height = `**REDACTED**`;
        this.weight = `**REDACTED**`;
        this.eyeColor = `**REDACTED**`;

        this.checkExistingProfile();

    }

    // Checks for existing profile adn loads it if the right password is entered. TOherwise, generates new profile.
    checkExistingProfile(){

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
    }

    // Generates a spy profile from JSON data
    generateSpyProfile() {

        // Ask for the user's name and store it
        this.name = prompt("ENTER YOUR NAME:");

        // Generate an alias from a random instrument
        this.alias = `The ${random(instrumentsData.instruments)}`;

        // Generate a secret weapon from a random object
        this.secretWeapon = random(objectsData.objects);

        // Generate a password from a random keyword for a random tarot card
        let card = random(tarotData.tarot_interpretations);
        this.password = random(card.keywords);

        // Generate a random height (in cm)
        this.height = Math.floor(Math.random() * 110) + 100 + " cm";

        // Generate a random weight (in lbs)
        this.weight = Math.floor(Math.random() * 160) + 70 + " lbs";

        // Generate a random eye color from my JSON file.
        this.eyeColor = random(eyeColorData.colors);

        // Save the resulting profile to local storage
        localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(profile));

        // Set the state to display the profile
        state.stage = state.displayingProfile;

    }

    // Assigns across the profile properties from the data to the current profile
    setupSpyProfile(data) {

        // Assignments
        this.name = data.name;
        this.alias = data.alias;
        this.secretWeapon = data.secretWeapon;
        this.password = data.password;
        this.eyeColor = data.eyeColor;
        this.height = data.height;
        this.weight = data.weight;

        // Set the state to display the profile
        state.stage = state.displayingProfile;

    }

    displaySpyProfile(){

        // Background color
        background(255);

        // Generate the profile as a string using the data
        let spyText = `** TOP SECRET SPY PROFILE ** 
Name: ${this.name}
Alias: ${this.alias}
Secret Weapon: ${this.secretWeapon}
Password: ${this.password}
Height: ${this.height}
Weight: ${this.weight}
Eye Color: ${this.eyeColor}
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