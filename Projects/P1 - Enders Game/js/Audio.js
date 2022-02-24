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

        this.enqueuedSounds = [];

    }

    // Master update for Audio.js PLays all sounds for this frame, empty the enqueued sounds
    play(){
        
        // Play each sound
        for(let i = 0 ; i<this.enqueuedSounds.length ; i++){
            this.enqueuedSounds[i].play();
        }

        // Empty enqueued sounds
        this.enqueuedSounds = [];
    }

    // Enqueues a sound. Enqueued sounds are played once and discarded in play()
    enqueueSound(sound){

        this.enqueuedSounds.push(sound);

    }

    // Input from state in the form of the type of sound (fx or not) and its id
    playSound(fx, id){

        // Check which folder
        if(fx){

            // Enqueue the ID sound
            this.enqueueSound(this.fx[id]);

        } else {

            // Similar for music
            this.enqueueSound(this.music[id]);

        }
    }

}