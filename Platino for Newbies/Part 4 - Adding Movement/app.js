// Create a new window and make the app landscape
var window = Ti.UI.createWindow({
	backgroundColor:'blue',
	orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
});

// Require Platino
var platino = require("co.lanica.platino");

//******NEW CODE***********
var transform  = platino.createTransform();
//*******END NEW CODE********

// Create a view for your game (game.screen.width and game.screen.height will be set only once the game is loaded)
var game = platino.createGameView();

// Create a game scene
var scene = platino.createScene();

// Add a background image/bob which will fill the screen (z is for layering)
var background = platino.createSprite({x:0, y:0});

// Set the background color
background.color(0,0.7,1);

// Add the background to the scene
scene.add(background);

// Create a new sprite (Specify image, or if you want a rectangle specify only width and height)
var bob = platino.createSprite({image:"bob.png", z:1});

// Add the sprite to the scene
scene.add(bob);

//**************** NEW CODE HERE ****************
// Add a button to use for the reset part of the function function
var button = platino.createSprite({image:"reset.png"})
scene.add(button)

// If the touch ends inside the button stop any transforms and reset "bob"'s position
game.addEventListener("touchend", function(e){
	if (button.contains(e.x, e.y)){
		bob.clearTransforms();
		bob.x = (game.screen.width  / 2) - (bob.width  / 2);
    	bob.y = (game.screen.height / 2) - (bob.height / 2);
	}
	else
	{
		// If the touch happens outside the button, move "bob" to that location over 1000 miliseconds/1 second
		transform.duration = 1000;
		transform.x = e.x - (bob.width / 2);
		transform.y = e.y - (bob.height / 2);	
		bob.transform(transform);
	}
})

//**************** END NEW CODE ****************

// Add the scene to the game view
game.pushScene(scene);

// Onload event is called when the game is loaded.
game.addEventListener('onload', function(e) {
    
    // Now game.screen.width and height have been set, use them to move your sprite to center of the screen
    bob.x = (game.screen.width  / 2) - (bob.width  / 2);
    bob.y = (game.screen.height / 2) - (bob.height / 2);
    
    // Position the button in the same way
    button.x = game.screen.width - (button.width * 1.5);
    button.y = game.screen.height - (button.height * 1.5);
    
    // Set the size of the background based on the same
    background.width = game.screen.width;
    background.height = game.screen.height;
    
    // Start the game
    game.start();
});

// Add your game view to the window
window.add(game);


// Open the window
window.open({fullscreen:true, navBarHidden:true});


