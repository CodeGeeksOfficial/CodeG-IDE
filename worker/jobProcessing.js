const { createFile } = require("./utils/generateFile");
const { executePy } = require("./utils/executePy");
const { executeJava } = require("./utils/executeJava");
const { executeCpp } = require("./utils/executeCpp");
const fs = require("fs");
const { setKey, getKey, delKey } = require("./redis-worker.js");

async function processJob(job) {
  console.log(`some processing in ${job.folder_name}`); //TODO: Remove Later
  createFile(job);

  try {
    let output;
    if (job.language === "py") {
      output = await executePy(job);
    } else if (job.language === "cpp") {
      output = await executeCpp(job);
    } else if (job.language === "java") {
      output = await executeJava(job);
    }

    output = JSON.stringify(output);

    setKey(job.folder_name, output);

    fs.writeFileSync(`./temp/${job.folder_name}/output.txt`, output);

    console.log(output);
  } catch (err) {
    console.log(`Error while file execution: ${err}`);
  }
}

module.exports = { processJob };
