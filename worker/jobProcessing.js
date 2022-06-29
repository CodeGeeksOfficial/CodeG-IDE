const { createFile } = require("./utils/generateFile");
const { executePy } = require("./utils/executePy");
const { executeJava } = require("./utils/executeJava");
const { executeCpp } = require("./utils/executeCpp");
const fs = require("fs");
const { setKey } = require("./redis-worker.js");

async function processJob(job) {
  console.log(`Processing ${job.folder_name}`);
  try {
    createFile(job);
  } catch (err) {
    setKey(job.folder_name, `{"stderr":"Internal Server Error","stdout":""}`);
    console.log(
      `Error while creating files, JobId: ${job.folder_name}, Error: ${err}`
    );
  }

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
    setKey(job.folder_name, output);
    fs.writeFileSync(`./temp/${job.folder_name}/output.txt`, output);
  }
}

module.exports = { processJob };
