const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

let finalFileName;
let originalFileName;

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "./uploads"));
    },
    filename: (req, file, cb) => {
      const customFileName = crypto.randomBytes(18).toString("hex");
      const fileExtension = path.extname(file.originalname);

      finalFileName = customFileName + fileExtension;
      originalFileName = file.originalname;
      // check extension and reject
      req.uploadedFileName = finalFileName;
      cb(null, finalFileName);
    },
  }),
});

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "./uploads", filename);

  // Code to serve file here

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).json({ success: false, error: "unable to read file" });
});

app.post("/upload_files", upload.single("podcast"), uploadFiles);

function uploadFiles(req, res) {
  // console.log(req.body);
  console.log(finalFileName);
  //   console.log(req.file);
  res.json({
    success: true,
    originalFileName,
    uploadedFile: finalFileName,
  });
}
app.listen(port, () => {
  console.log(`Server started...`);
});
