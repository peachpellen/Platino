var window = Ti.UI.createWindow({backgroundColor:'black'});

var platino = require('co.lanica.platino');
var game = platino.createGameView();
game.color(0, 0, 0);
game.debug = true;

var scene = platino.createScene();

var bg = platino.createSprite({image:"background.jpg"});
scene.add(bg);

// Include Ego
Ti.include('ego.js');

// Load the file
var loadedFile = loadFile("myFile.txt");

// Set the score to be the value loaded from the file, coverted to a number from a string
var score = Number(loadedFile);

// Add some text to show the score
var scoreText = platino.createTextSprite({text:loadedFile, fontSize:32, x:140,y:100, height:60,width:400});
scoreText.color(1,1,1);
scene.add(scoreText);

// A table to hold all touchable sprites on screen
var touchables = [];

// Minus sign sprite
var minusSign = platino.createSprite({image:"-.png", x:60, y:230});
scene.add(minusSign);
touchables.push(minusSign);

// Plus sign sprite
var plusSign = platino.createSprite({image:"+.png", x:190, y:200});
scene.add(plusSign);
touchables.push(plusSign);

// Save button sprite
var saveBtn = platino.createSprite({image:"save.png", x:50, y:400});
scene.add(saveBtn);
touchables.push(saveBtn);

// Load button sprite
var loadBtn = platino.createSprite({image:"load.png", x:190, y:400});
scene.add(loadBtn);
touchables.push(loadBtn);

// Function for touch end on screen
var touchEnd = function(e){
        if(minusSign.contains(e.x,e.y)){
            score = score - 1;
            scoreText.text = score;
        }
        else if(plusSign.contains(e.x,e.y)){
            score = score + 1;
            scoreText.text = score;
        }
        else if(saveBtn.contains(e.x,e.y)){
            saveFile("myFile.txt", ""+score+"");
        }
        else if(loadBtn.contains(e.x,e.y)){
            loadedFile = loadFile("myFile.txt");
            score = Number(loadedFile);
            scoreText.text = score;
        }
};
game.addEventListener("touchend", touchEnd);

// Push the scene
game.pushScene(scene);

// Set initial screen size
var screenHeight = Ti.Platform.displayCaps.platformHeight;
if (screenHeight >= 568) {
    screenHeight = 568;
	} else {
        screenHeight = 480;
	}
	game.TARGET_SCREEN = {
		width: 320,
		height: screenHeight
};

// Set initial touch coords
game.touchScaleX = 1;
game.touchScaleY = 1;

// Update screen size and touch coords
var updateScreenSize = function() {
	var screenScale = game.size.height / game.TARGET_SCREEN.height;
	game.screen = {
		width: game.size.width / screenScale,
		height: game.size.height / screenScale
	};
	game.touchScaleX = game.screen.width  / game.size.width;
	game.touchScaleY = game.screen.height / game.size.height;
	game.screenScale = game.screen.height / game.TARGET_SCREEN.height;
};

// Function for when the game is loaded
game.addEventListener('onload', function(e) {
    
    bg.height = game.screen.height;
    
    // Convenience function to convert Titanium coordinate from a Platino coordinate
    updateScreenSize();
	game.getTiScale = function(x, y) {
		return {
			x: (x / game.touchScaleX),
			y:(y / game.touchScaleY) };
		};

    game.start();
});

// Add the game to the window and open it
window.add(game);
window.open({fullscreen:true, navBarHidden:true});