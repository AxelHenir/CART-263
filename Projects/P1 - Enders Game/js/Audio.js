class Audio{

    constructor(){

        const NUM_MUSIC_FILES = 1;
        const MUSIC_PATH = "assets/audio/music/";

        // Container for the music files
        this.music = [];

        // Populate with files...
        for (let i = 0; i < NUM_MUSIC_FILES; i++) {

            let track = loadSound(`${MUSIC_PATH}${i}.mp3`);
    
            this.music.push(track);

        }

        const NUM_FX_FILES = 1;
        const FX_PATH = "assets/audio/fx/";

        // Container for FX files
        this.fx = [];

        // Populate with files...
        for (let i = 0; i < NUM_FX_FILES; i++) {

            let track = loadSound(`${FX_PATH}${i}.mp3`);
    
            this.fx.push(track);

        }

        // Holds the track of the background music
        this.currentBGMusic = undefined;

    }

    // plays FX with ID
    playFX(id){

        // Check for no id
        if (id === null){

            // Return if no fx
            return;

        } else {

            // Otherwise, play it
            this.fx[id].play();

        }
        

    }

    playBackgroundMusic(id){

        // Check for no id
        if (id === null){

            if(this.currentBGMusic === undefined){

            } else {

                this.currentBGMusic.stop();
                this.currentBGMusic = undefined;

            }

            return;

        } else {

            // Otherwise, stop and start new track
            if(this.currentBGMusic === undefined){
                
                // No music currently assigned
                this.currentBGMusic = this.music[id];
                this.currentBGMusic.loop();

            } else {

                // If music is already playing, we need to stop it first
                this.currentBGMusic.stop();
                this.currentBGMusic = this.music[id];
                this.currentBGMusic.loop();
            }

        }

    }

}