Ego - Easy Saving and Loading in Platino/Titanium
===============

Very simple library allowing you to save and load data to/from text files with a single line of code. Complete with a simple sample showing usage.

Just include ego.js and use the commands;

	saveFile("FileName.txt", variable/string to save)
	
and

	var myFile = loadFile("FileName.txt")
	
Within ego.js, you can change one line (commented) to adjust whether or not a file is created when you try to load one that doesn't exist, as well as what data that file starts with. The default is to create a file with the value "0".

Full tutorial/video of usage: [http://techority.com/2014/03/29/ego-platino/](http://techority.com/2014/03/29/ego-platino/)