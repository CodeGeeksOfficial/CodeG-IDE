const { exec } = require("child_process"); // can also use spawn
const fs = require("fs");
const path = require("path");

const executeCpp = (filename) => {
  const jobId = filename.split(".")[0];
  const outFileName = `${jobId}.out`;
  const filepath = path.join("code_files", filename);
  const outFilePath = path.join("code_files", outFileName);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outFilePath} && ${outFilePath}`,
      (error, stdout, stderr) => {

        // TODO: Make another module which will remove these files
        // fs.unlinkSync(filepath, (err) => {
        //     if (err) {reject({err})}
        // });

        // fs.unlinkSync(outFilePath, (err) => {
        //     if (err) {reject({err})}
        // });

        if(error){
            reject({error, stderr});
        }
        if(stderr){
            reject({stderr});
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = executeCpp;