class Graphics{

    constructor(){

        // Paths for loading
        const NUM_BG_IMAGES = 2;
        const BG_PREFIX = "assets/images/backgrounds/";

        

        const NUM_MISC_IMAGES = 2;
        const MISC_PREFIX = "assets/images/misc/";

        // Container for the backgrounds
        this.bg = [];

        // Populate with files...
        for (let i = 0; i < NUM_BG_IMAGES; i++) {

            let bgImage = loadImage(`${BG_PREFIX}${i}.png`);
    
            this.bg.push(bgImage);

        }

        const NUM_PPL_IMAGES = 6;
        const PPL_PREFIX = "assets/images/characters/";

        // Container for files of the characters
        this.ppl = [];

        // Populate with files...
        for (let i = 0; i < NUM_PPL_IMAGES; i++) {

            let pplImage = loadImage(`${PPL_PREFIX}${i}.png`);
    
            this.ppl.push(pplImage);

        }

        // Other miscallaneous assets (if needed)
        this.misc = [];

        // Populate with files...
        for (let i = 0; i < NUM_MISC_IMAGES; i++) {

            let miscImage = loadImage(`${MISC_PREFIX}${i}.png`);
    
            this.misc.push(miscImage);

        }

        // Typewriter object for text
        const TYPEWRITER_SPEED = 15;
        this.typeWriter = new Typewriter(TYPEWRITER_SPEED);
        

        // Game object for the game part of the project
        this.game = new Game();

    }

    // Uses the data in scene to locate assets and displays them
    displayScene(scene){

        // Check firstly if we are gaming
        if(scene.game){

            background(150);

            this.game.updateGame();

        } else {

            // Typwriter update 
            this.typeWriter.updateTypewriter();

            let bg = scene.images.bg;
            let slot1 = scene.images.slot1;
            let slot2 = scene.images.slot2;
    
            // Background color
            background(200);
    
            // Display the images from the scene
            imageMode(CENTER);
            image(this.bg[bg], width/2, height/2,width,height);
            image(this.ppl[slot1], 250, height/2,300,300);
            image(this.ppl[slot2], 750, height/2,300,300);
    
            // Print the text
            push();

            // Textbox for current speaker
            fill(0);
            quad(0,800, 250,800, 300,850, 0,850);

            // Text for current speaker
            textSize(25);
            fill(255);
            textAlign(CENTER, CENTER);
            text(state.currentlySpeaking, 125, 825);

            // Speech of the person talking/thinking
            textSize(25);
            fill(255);
            textAlign(LEFT,TOP);
            text(this.typeWriter.typedText(state.currentLine),100,900,800);

            pop();

        }

    }

    next(){

        // Ask for a new state from state class
        state.nextLine();

        // Typewriter index = 0 because new line
        this.typeWriter.index = 0;
    }

    

}