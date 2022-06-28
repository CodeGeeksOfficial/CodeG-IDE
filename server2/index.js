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

// ***Setting up the app***
// Create an express app
const app = express();

// Connect the mongoose database
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

// Define the PORT for express app
const PORT = parseInt(process.env.PORT) || 5001;

//Define the Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/*









*/

// ***Routes for the app***

//Home route, just for testing purpose. //TODO: Remove this route later on
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Run route, responsible for generating and executing the received code.
app.post("/run", async (req, res) => {
  const api_key = "some_random_key"; //TODO: Set this key

  //If any 3rd party tries to access the API, return 401 Unauthorized
  if (api_key != req.body.api_key) {
    return res
      .status(401)
      .json({ error: "Sorry buddy!!. You can't access the API" });
  }

  // Extract the info from request
  let language = req.body.language;
  let code = req.body.code;

  // If code or language is not given in the request, return 400 Bad Request
  if (code === undefined) {
    return res
      .status(400)
      .json({ language: language, error: "Code not received" });
  }

  if (language === undefined) {
    return res
      .status(400)
      .json({ language: language, error: "Language not received" });
  }

  let job;

  try {
    const filename = await generateFile(language, code); // Write received code in a file
    // TODO: Delete this generated file, after successful execution.
    job = await new Job({ language, filename }).save(); // Create a job in database, with the generated file
    const jobId = job["_id"];

    res.status(201).json({ success: true, jobId }); // Return success

    // *** Further processing of the job ***
    let output;
    job["startedAt"] = new Date();

    // Execute the file according to the language
    if (language === "cpp") {
      output = await executeCpp(filename);
    } else if (language === "java") {
      output = await executeJava(filename);
    } else if (language === "py") {
      output = await executePy(filename);
    }

    // If file is correctly exectued with an output, without any error, we'll reach to this block and update in the database accordingly.
    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;
    await job.save();
  } catch (err) {
    // If execution throws any kind of error, we come to this block.
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = JSON.stringify(err);
    await job.save();
  }
});

//Status route, for polling the server asking the response for an ongoing job.
app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  //If there is no jobId in the request, returning bad request status.
  if (jobId == undefined) {
    return res
      .status(400)
      .json({ success: false, error: "jobId is missing in the request" });
  }

  try {
    const job = await Job.findById(jobId);

    //If the given jobId doesn't exist in our database, return 404 Not Found response.
    if (job == undefined) {
      return res
        .status(404)
        .json({ success: false, error: "jobId doesn't exist" });
    }

    //If the given jobId exists in the database, return it's status.
    return res.status(200).json({ success: true, job });
  } catch (err) {
    //If any unexpected error occurs, notify the client.
    return res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});

// Start app listening to the requests on the specified PORT.
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
