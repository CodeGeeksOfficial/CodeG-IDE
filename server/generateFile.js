const path = require('path');
const fs = require('fs');
const { v4:uuid } = require('uuid')

const cppDirName = path.join(__dirname, "cpp_files");

if(!fs.existsSync(cppDirName)){
    fs.mkdirSync(cppDirName,{recursive:true});
}

const generateFile = async(format, code)=>{
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(cppDirName, filename);
    await fs.writeFileSync(filepath, code); // ispr await lgaane ki zrurat h kya??
    return filename;
};

module.exports = generateFile;