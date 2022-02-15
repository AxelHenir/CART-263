// State class tracks the state of the program


class State{

    constructor(){

        // Act counter
        this.act = 0;

        // Scene counter
        this.scene = 0;

        // Line counter
        this.line = 0; 

        // Scenes in this program are treated as the serialized: Act A, Scene B, Line C.
    }

}