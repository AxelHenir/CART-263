// Desperately Desiring Drift

// Alex Henri - 40108348
// CART 263 E8 - Desperately Seeking Sadness ++

// A game about satiating the desire to drift your car
// The user must drift their car to increase their score.
// To keep drifting, collect fuel canisters and stay topped up!
// Avoid the cops!

"use strict";

// Standard configuration for the game
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true,
            gravity: 0,
        }
    },
    scene: [Boot, Instructions, Play, GameOver]
};

let game = new Phaser.Game(config);