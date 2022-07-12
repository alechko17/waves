const {ipcMain} = require('electron');

const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');




const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};



ipcMain.handle("fetch-file-explorer", async (event, args) => {

    //let directoryPath = args.directory || path.dirname( __dirname);
    let directoryPath = args.directory || "C:\\wamp64\\www\\waves\\test"
  
    
    const files = fs.readdirSync(directoryPath)
      .map(fileName => {
        
        let filePath = path.join(directoryPath, fileName);
        let isFile = fs.lstatSync(filePath).isFile();
        return {
          fileName: fileName,
          path: filePath,
          isFolder: !isFile,
        };
      });
  
   
    return JSON.stringify({
      directory: directoryPath,
      files: files,
    });
  
  })



  const copyFileValidation = (args) => {

    let targetLocation;
    const originFile = args.fromLocation.split("\\").pop();
    const targetFile = args.newLocation;
    const targetIsFile = fs.lstatSync(targetFile).isFile();
    
    if(targetIsFile){
  
      targetLocation = targetFile.substring(0, targetFile.lastIndexOf('\\'));
      targetLocation = path.join(targetLocation,originFile);
      
    }else{
      targetLocation = path.join(targetFile,originFile);
    }
  
    if (!fs.existsSync(targetLocation)) {
  
      return {
        msg: `Copy ${args.fromLocation} To ${targetLocation}`,
        err: null,
      };
    }
  
    // cannot copy
    return {
      msg: null,
      err: "Oops!!! you cannot overide a file with itself",
    };
  
  }
  
  ipcMain.handle("validate-copy-file", async (event, args) => {
  
    let err = null;
    const res = copyFileValidation(args);
  
    return JSON.stringify(res);
  
  })
  
  ipcMain.handle("copy-file-explorer", async (event, args) => {
  
    const isValid = copyFileValidation(args);
    let errMsg = null;
  
    let targetfolder = args.newLocation;
    if(fs.lstatSync(targetfolder).isFile()){
      targetfolder = args.newLocation.substring(0, args.newLocation.lastIndexOf('\\'));
    }
  
    let res;
  
    if(!isValid.err){
  
      try {
        if(fs.lstatSync(args.fromLocation).isFile()){
          let targetFilename = args.fromLocation.split("\\").pop();
          console.log(`copy file from ${args.fromLocation} to ${path.join(targetfolder,targetFilename)}`)
          res = fs.copyFileSync(args.fromLocation, path.join(targetfolder,targetFilename), fs.constants.COPYFILE_EXCL);
  
        }else{
          let targetFolderName = args.fromLocation.split("\\").pop();
          console.log(`copy folder from ${args.fromLocation} to ${path.join(targetfolder,targetFolderName)}`)
          res = await fse.copySync(args.fromLocation, path.join(targetfolder,targetFolderName), { overwrite: false });
         
        }
      }catch(e){
        console.log(e)
        errMsg = `Oops!!! Cannot copy '${args.fromLocation}' to a subdirectory of itself`;
      }
  
      return JSON.stringify({
        err: errMsg
      });
    }
  
  })