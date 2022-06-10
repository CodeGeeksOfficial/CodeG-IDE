const path = require('path');
const fs = require('fs');
const { v4:uuid } = require('uuid');

const fileDirName = path.join(__dirname, "code_files");

if(!fs.existsSync(fileDirName)){
    fs.mkdirSync(fileDirName,{recursive:true});
}

const generateFile = async(format, code)=>{
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(fileDirName, filename);
    await fs.writeFileSync(filepath, code); // ispr await lgaane ki zrurat h kya??
    return filename;
};

module.exports = generateFile;