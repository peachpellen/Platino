/* Ego
A simple saving/loading helper, written to replace the original Corona SDK version.
Created by Peach Pellen, 2012
*/

// Save a file
// Use: var myVariable = saveFile("filename.txt", "write this in the file")
saveFile = function(fileName, contents)
{
        var openFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
        openFile.write(contents);
};

// Load a file
// Use: var myVariable = loadFile("filename.txt")
loadFile = function(fileName)
{
        var openFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
        if(openFile.exists())
        {
                return openFile.read();
        }
        else
        {
                // If you want the file to be created if it does not exist uncomment the follow two lines
                //openFile.write("Overwrite me")
                //Ti.API.info(fileName+" does not exist. "+fileName+" created.")
                Ti.API.info("File does not exist - creating file with value 0");
                openFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
                openFile.write("0");
                return openFile.read();
        }
};