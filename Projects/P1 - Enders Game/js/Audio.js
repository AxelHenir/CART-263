// Audio class

// Handles and stores all audio in the program
// Constructor stores all files in arrays for easy access
// Contains methods to play sounds or music from the arrays

class Audio{

    constructor(){

        // Music files data
        const NUM_MUSIC_FILES = 5;
        const MUSIC_PATH = "assets/audio/music/";

        // Container for the music files
        this.music = [];

        // Populate with files...
        for (let i = 0; i < NUM_MUSIC_FILES; i++) {

            let track = loadSound(`${MUSIC_PATH}${i}.mp3`);
    
            // Push the loaded music file into the music array
            this.music.push(track);

        }

        // Sound effect files data
        const NUM_FX_FILES = 8;
        const FX_PATH = "assets/audio/fx/";

        // Container for FX files
        this.fx = [];

        // Populate with files...
        for (let i = 0; i < NUM_FX_FILES; i++) {

            let track = loadSound(`${FX_PATH}${i}.mp3`);
    
            // Push the loaded sound into the fx array
            this.fx.push(track);

        }

        // Holds the track of the background music
        this.currentBGMusic = undefined;

    }

    // Plays the associated sound effect from fx[] according to id passed to method
    playFX(id){

        // Check for no id
        if (id === null){

            // Return if no fx
            return;

        } else {

            // Otherwise, play the sound
            this.fx[id].play();

        }
        
    }

    // Plays the associated music file  from music[] according to id passed to method
    playBackgroundMusic(id){

        // Check for no id
        if (id === null){

            // If no music specified, allow current track to keep playing
            return;

        } else { // Otherwise, if a new track is requesting to be played,

            // If there is currently no music playing,
            if(this.currentBGMusic === undefined){
                
                // Set the current music to the reqested track
                this.currentBGMusic = this.music[id];

                // Play the track
                this.currentBGMusic.loop();

            } else {

                // If music is already playing, we need to stop it first
                this.currentBGMusic.stop();

                // Set the current music to the requested track
                this.currentBGMusic = this.music[id];

                // Play the track
                this.currentBGMusic.loop();

            }

        }

    }

}