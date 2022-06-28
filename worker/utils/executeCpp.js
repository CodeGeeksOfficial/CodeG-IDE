const { exec } = require("child_process"); //TODO: use spawn

// *** Execute the generated Python file *** //
const executeCpp = (job) => {
  return new Promise((resolve, reject) => {
    exec(
      `g++ ./temp/${job.folder_name}/Main.cpp -o ./temp/${job.folder_name}/a && "./temp/${job.folder_name}/a.exe" < ./temp/${job.folder_name}/input.txt`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          resolve({ stderr, stdout });
        }
        resolve({ stderr, stdout });
      }
    );
  });
};

module.exports = { executeCpp };
