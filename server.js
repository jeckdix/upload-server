const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");

const app = express();
const port = process.env.port || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors({}));

app.post("/upload_files", upload.single("podcast"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  //   console.log(req.file);
  res.json({ message: "Successfully uploaded files" });
}
app.listen(port, () => {
  console.log(`Server started...`);
});
