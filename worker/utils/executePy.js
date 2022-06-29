const { exec } = require("child_process"); //TODO: use spawn

// *** Execute the generated Python file *** //
const executePy = (job) => {
  return new Promise((resolve, reject) => {
    exec(
      `python ./temp/${job.folder_name}/Main.py < ./temp/${job.folder_name}/input.txt`,
      (error, stdout, stderr) => {
        if (stderr) {
          reject({ stderr, stdout });
        }
        if (error) {
          reject({ error });
        }
        resolve({ stderr, stdout });
      }
    );
  });
};

module.exports = { executePy };
