const { exec } = require("child_process"); //TODO: use spawn

// *** Execute the generated Python file *** //
const executePy = (job) => {
  return new Promise((resolve, reject) => {
    exec(
      `python ./temp/${job.folder_name}/Main.py < ./temp/${job.folder_name}/input.txt`,
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

module.exports = { executePy };
