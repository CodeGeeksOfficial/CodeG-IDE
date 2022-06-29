const { createFile } = require("./utils/generateFile");
const { executePy } = require("./utils/executePy");
const { executeJava } = require("./utils/executeJava");
const { executeCpp } = require("./utils/executeCpp");
const fs = require("fs");
const { setKey, getKey, delKey } = require("./redis-worker.js");

async function processJob(job) {
  createFile(job);
  let output;
  try {
    if (job.language === "py") {
      output = await executePy(job);
    } else if (job.language === "cpp") {
      output = await executeCpp(job);
    } else if (job.language === "java") {
      output = await executeJava(job);
    }
  } catch (err) {
    if (err.stderr) {
      output = err;
    } else {
      console.log(`Error while file execution: ${err}`);
    }
  } finally {
    output = JSON.stringify(output);
    console.log(output);
    setKey(job.folder_name, output);
    fs.writeFileSync(`./temp/${job.folder_name}/output.txt`, output);
  }
}

module.exports = { processJob };
