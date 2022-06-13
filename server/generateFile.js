const path = require('path');
const fs = require('fs');
const { v4:uuid } = require('uuid');

const fileDirName = path.join(__dirname, "code_files");

// If code_files directory doesn't exists, then make it.
if(!fs.existsSync(fileDirName)){
    fs.mkdirSync(fileDirName,{recursive:true});
}

// *** Generate a new file and write the code in it ***
const generateFile = async(format, code)=>{
    const jobId = uuid(); //Created a random string
    const filename = `${jobId}.${format}`;
    const filepath = path.join(fileDirName, filename);
    fs.writeFileSync(filepath, code); // Write code in the generated file.
    return filename;
};

module.exports = generateFile;