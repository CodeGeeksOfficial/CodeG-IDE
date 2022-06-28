const fs = require("fs");

if (!fs.existsSync("./temp")) {
  fs.mkdirSync("./temp");
}

const createFile = (job) => {
  fs.mkdirSync(`./temp/${job.folder_name}`);
  fs.writeFileSync(`./temp/${job.folder_name}/Main.${job.language}`, job.code);
  fs.writeFileSync(`./temp/${job.folder_name}/input.txt`, job.input);
};

module.exports = { createFile };
