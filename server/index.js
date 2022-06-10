const express = require("express");
const fs = require("fs");
const path = require("path")
const executeCpp = require("./executeCPP");
const executeJava = require("./executeJAVA");
const executePy = require("./executePY");
const generateFile = require("./generateFile");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
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

  try {
    const filename = await generateFile(language, code);
    let output;
    if (language === "cpp") {
      output = await executeCpp(filename);
    } else if (language === "java") {
      output = await executeJava(filename);
    } else if (language === "py") {
        output = await executePy(filename);
    } else {
      fs.unlinkSync(path.join("code_files", filename), (err) => {
        if (err) {
            res.status(500).json({ err });
        }
      });
      return res
        .status(400)
        .json({
          language: language,
          error: "Bad Request: Language not supported",
        });
    }
    return res.json({ filename, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(5000, () => {
  console.log(`Listening on port ${PORT}`);
});
