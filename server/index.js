const epxress = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

app = epxress();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors({ origin: ["https://verification-code-task-app.vercel.app"] }));

app.get("/", (req, res) => {
  res.status(200).json({ detail: process.env.EXPRESS_CLIENT_ORIGIN });
});

app.post("/code", (req, res) => {
  if (!("code" in req.body)) {
    res.status(400).json({ detail: "Code does not exist in the POST body" });
    return;
  }

  try {
    const { code } = req.body;

    const codeInString = String(code);

    if (!/^\d{6}$/.test(codeInString) || codeInString[5] === "7") {
      res.status(400).json({ detail: "Verification Error" });
      return;
    }

    res.status(200).json({ detail: "Success" });
  } catch {
    res.status(500).json({ detail: "Internal server error" });
  }
});

app.listen(process.env.EXPRESS_PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${process.env.EXPRESS_PORT}`);
});
