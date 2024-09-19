const epxress = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

app = epxress();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Handles CORS
app.use(
  cors({
    origin: process.env.EXPRESS_CLIENT_ORIGIN.split(","),
    methods: ["GET", "POST"],
  })
);

// POST endpoint for code verification
app.post("/api/code", (req, res) => {
  // Checks if the code exists in the POST request body
  if (!("code" in req.body)) {
    res
      .status(400)
      .json({ detail: "Code does not exist in the POST request body" });
    return;
  }

  try {
    const { code } = req.body;

    const codeInString = String(code);

    // Throws "Verification Error" message if the code in string format is non-numeric or last digit is "7"

    if (!/^\d{6}$/.test(codeInString) || codeInString[5] === "7") {
      res.status(400).json({ detail: "Verification Error" });
      return;
    }

    // Sends success message if the code passses all the checks

    res.status(200).json({ detail: "Success" });
  } catch {
    // Throws "Internal server error" if any error occurs in the execution of the user's requests
    res.status(500).json({ detail: "Internal server error" });
  }
});

app.listen(process.env.EXPRESS_PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${process.env.EXPRESS_PORT}`);
});
