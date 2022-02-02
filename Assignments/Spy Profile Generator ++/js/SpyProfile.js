class SpyProfile{

    // constructor
    constructor(){

        this.profileData = {
            // Basic default traits
            name: `**REDACTED**`,
            alias: `**REDACTED**`,
            secretWeapon: `**REDACTED**`,
            password: `**REDACTED**`,

            // Some traits of my own...
            height: `**REDACTED**`,
            weight: `**REDACTED**`,
            eyeColor: `**REDACTED**`,
            countryOfOrigin: `**REDACTED**`,
            stationedCountry: `**REDACTED**`,
        }

        // Now that all the variables are made, check if we have saved data
        this.checkExistingProfile();

    }

    // Checks for existing profile and loads it if the right password is entered. Otherwise, generates new profile.
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
        this.profileData.name = prompt("ENTER YOUR NAME:");

        // Generate an alias from a random instrument
        this.profileData.alias = `The ${random(instrumentsData.instruments)}`;

        // Generate a secret weapon from a random object
        this.profileData.secretWeapon = random(objectsData.objects);

        // Generate a password from a random keyword for a random tarot card
        let card = random(tarotData.tarot_interpretations);
        this.profileData.password = random(card.keywords);

        // Generate a random height (in cm)
        this.profileData.height = Math.floor(Math.random() * 110) + 100 + " cm";

        // Generate a random weight (in lbs)
        this.profileData.weight = Math.floor(Math.random() * 160) + 70 + " lbs";

        // Generate a random eye color from my JSON file.
        this.profileData.eyeColor = random(eyeColorData.colors);

        // Generate a random home country
        this.profileData.homeCountry = random(countryData.countries);

        // Generate a random country that the spy is stationed in
        this.profileData.stationedCountry = random(countryData.countries);

        // Save the resulting profile to local storage
        console.log(JSON.stringify(this.profileData));
        localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(this.profileData));

        // Set the state to display the profile
        state.stage = state.displayingProfile;

    }

    // Assigns the profile properties from the data to the current profile
    setupSpyProfile(data) {

        // Assignments
        this.profileData.name = data.name;
        this.profileData.alias = data.alias;
        this.profileData.secretWeapon = data.secretWeapon;
        this.profileData.password = data.password;
        this.profileData.eyeColor = data.eyeColor;
        this.profileData.height = data.height;
        this.profileData.weight = data.weight;
        this.profileData.homeCountry = data.homeCountry;
        this.profileData.stationedCountry = data.stationedCountry;

        // Set the state to display the profile
        state.stage = state.displayingProfile;

    }

    displaySpyProfile(){

        // Background color
        background(255);

        // Generate the profile as a string using the data
        let spyText = `** TOP SECRET SPY PROFILE **
        
Name: ${this.profileData.name}
Alias: ${this.profileData.alias}
Secret Weapon: ${this.profileData.secretWeapon}
Password: ${this.profileData.password}
Height: ${this.profileData.height}
Weight: ${this.profileData.weight}
Eye Color: ${this.profileData.eyeColor}
Home Country: ${this.profileData.homeCountry}
Currently Sationed in: ${this.profileData.stationedCountry}
`;

        // Display the profile
        push();
        textSize(32);
        textAlign(CENTER, CENTER);
        textFont(`Courier, monospace`);
        fill(0);
        text(spyText, width/2, height/2);
        textSize(24);
        text("Press 'B' to BURN this profile", width/2, height*0.75);
        pop();
    }

}