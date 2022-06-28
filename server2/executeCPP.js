const { exec } = require("child_process"); // can also use spawn
const path = require("path");
//TODO add support for bits/stdc++.h header file

// *** Execute the generated CPP file ***
const executeCpp = (filename) => {
  const jobId = filename.split(".")[0];
  const outFileName = `${jobId}.out`;
  const filepath = path.join("code_files", filename);
  const outFilePath = path.join("code_files", outFileName);
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outFilePath} && ${outFilePath}`,
      (error, stdout, stderr) => {
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