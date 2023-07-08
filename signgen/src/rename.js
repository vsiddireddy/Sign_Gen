const fs = require('fs');

var path = "/Users/vsiddireddy/Documents/GitHub/Sign_Gen/signgen/assets/overlays/";
var filePrefix = "overlay_";
var extension = ".jpg";

function readDirectory() {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(files);
    });
  });
}

function renameFile(totalFiles) {
  console.log("renameFile: " + totalFiles);
  for (var x = 1; x <= totalFiles; x++) {
    // oldFilePath, newFilePath
    fs.rename(path, newFilePath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        return;
      }
    
      console.log('File renamed successfully.');
    });
  }
}

async function processFiles() {
  var totalFiles = undefined;
  try {
    const files = await readDirectory();
    totalFiles = files.length;

    console.log("Total files: " + totalFiles);

    for (var x = 0; x < totalFiles; x++) {
      // Perform your desired operations here
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
  //console.log(totalFiles);
  renameFile(totalFiles);
  
}

processFiles();
