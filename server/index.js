require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const executeCpp = require("./executeCPP");
const executeJava = require("./executeJAVA");
const executePy = require("./executePY");
const generateFile = require("./generateFile");
const cors = require("cors");
const mongoose = require("mongoose");
const Job = require("./models/Job");

const app = express();

mongoose.connect(
  "mongodb://localhost/compilerdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Successfully connected to MongoDB: compilerdb");
  }
);

const PORT = parseInt(process.env.PORT) || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/status", async(req, res) => {
  const jobId = req.query.id;

  if (jobId == undefined) {
    return res.status(400).json({ success: false, error: "jobId is missing" });
  }

  try {
    const job = await Job.findById(jobId);

    if (job == undefined) {
      return res
        .status(404)
        .json({ success: false, error: "jobId doesn't exist" });
    }

    return res.status(200).json({success: true, job});
  } catch (err) {
    return res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});

app.post("/run", async (req, res) => {
  const api_key = "some_random_key"; //TODO: Set this key
  if (api_key != req.body.api_key) {
    return res
      .status(401)
      .json({ error: "Sorry buddy!!. You can't access the API" });
  }

  let language = req.body.language;
  let code = req.body.code;

  if (code === undefined) {
    return res
      .status(400)
      .json({ language: language, error: "Code not received" });
  }

  let job;

  try {
    const filename = await generateFile(language, code);
    job = await new Job({ language, filename }).save();
    const jobId = job["_id"];

    res.status(201).json({ success: true, jobId });

    let output;

    job["startedAt"] = new Date();
    if (language === "cpp") {
      output = await executeCpp(filename);
    } else if (language === "java") {
      output = await executeJava(filename);
    } else if (language === "py") {
      output = await executePy(filename);
    }
    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;
    await job.save();
    // return res.json({ filename, output });
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = JSON.stringify(err);
    await job.save();
    // res.status(500).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
