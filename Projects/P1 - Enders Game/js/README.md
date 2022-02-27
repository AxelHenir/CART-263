# CART 263 Project 1 - Night at the Movies

### Alex Henri, 40108348, Project 1: Ender's Game

Artist's Statement:

War is a game and we're all playing.

For my first project, I selected the film "Ender's Game", a sci-fi action thriller about a boy named Ender who joins a prestigious military school in the hopes of becoming a hero and saving the human race from an alien species. I wanted to make a program that instills the same sentiments of 
dread and despair at the climax of the film. (Spoiler warning!) In the film, Ender is given the opportunity to prove his skill in front of the 
watchful eyes of the military generals and higher-ups. He succeeds in destroying the Formic race in what he thought was just another simulation.
However, after the annihilation, it is revealed to him that he had actually been fighting the Formic aliens in real life and that the simulation 
was a lie. This is the moment I wanted to capture, the moment where all of his pride and confidence escapes him.

To accomplish this, I designed my program to be half-story, half-game. It was also crucial that I have it remember your progress so that the feeling of "irreversible damage" felt real. The user will only get to play through the game one time. When it finishes, there will be no do-overs, no going back and no recourse. I want the player to feel cheated and manipulated. 

I took an Elon Musk inspired approach and built a program which could enact any scene I gave it. My vision for it was that I could feed the program a screenplay and have it display the right characters, the text, the background, music, all of that. To achieve this, I made my program very modular. In this regard, the program's functionality is decentralized and instead spread out over many class files. For example, the graphics class would be in charge of displaying everything visual. The audio class handles all the audio. Everything else is an offshoot of those two classes. The state class tracks what the state of the program is. (Are we in game mode? Which scene is active, which line of dialogue to display, etc.) The script itself is composed of an array of objects which contain the properties of the scene. 