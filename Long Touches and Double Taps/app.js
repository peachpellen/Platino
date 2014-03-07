/////////////////////////////////////////////////////////////////////
// Regular initial set up code
/////////////////////////////////////////////////////////////////////

// require Platino
var platino = require("co.lanica.platino");

// Create a new window
var gameWindow = Ti.UI.createWindow();

// Create game view
var game = platino.createGameView();

// Create a game scene
var scene = platino.createScene();

// Add your scene to game view
game.pushScene(scene);

// Make the scene background red rather than boring black
scene.color(0.8,0,0);

/////////////////////////////////////////////////////////////////////
// Double Taps in Platino
/////////////////////////////////////////////////////////////////////
// A variable for the timer to time taps, another to count taps
var tapTimer;
var taps = 0;

// Function for when a double tap occurs
var doubleTap = function(e){
    alert("Double tapped");
};

// Function to track whether or not two taps happen within 2 seconds and react accordingly
var trackTaps = function(e){
    taps = taps + 1;
    if (taps < 2){
        tapTimer = setTimeout(function() {taps=0}, 2000);
    }
    else if(taps===2){
        clearTimeout(tapTimer);
        doubleTap();
        taps = 0;
    }
};

// The event listener for double taps
game.addEventListener("touchend", trackTaps);

/////////////////////////////////////////////////////////////////////
// Long touches in Platino
/////////////////////////////////////////////////////////////////////
// A variable for tracking the length of the touch, another to count the time in seconds
var touchTimer;
var touchLength = 0;

// Function for when a long touch is detected
var longTouch = function(e){
    if(touchLength>=3){
        clearInterval(touchTimer);
        touchLength = 0;
        alert("Touch held for 3 seconds")
    }
};

// Function to monitor the long touch when touch is started
var startLongTouch = function(e){
    touchTimer = setInterval(function() {touchLength=touchLength+1, longTouch()}, 1000);
};
// Event listener for starting the long touch
game.addEventListener("touchstart", startLongTouch);

// Function to clear the accumulated time if touch is released early
var endLongTouch = function(e){
    clearInterval(touchTimer);
    touchLength = 0;
};
// Event listener for ending the long touch
game.addEventListener("touchend", endLongTouch);

/////////////////////////////////////////////////////////////////////
// Regular closing set up code
/////////////////////////////////////////////////////////////////////
// Onload function
game.addEventListener("onload", function(e) {
	// Set target screen size
    game.TARGET_SCREEN = {width:320, height:480};
		// set screen size for your game (TARGET_SCREEN size)
        var screenScale = game.size.width / game.TARGET_SCREEN.width;
        game.screen = {width:game.size.width / screenScale, height:game.size.height / screenScale};
        game.touchScaleX = game.screen.width  / game.size.width;
        game.touchScaleY = game.screen.height / game.size.height;
    // Start the game
    game.start();
});

// Add game and open game window
gameWindow.add(game);
gameWindow.open({fullscreen:true, navBarHidden:true});