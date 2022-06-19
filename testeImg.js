const express = require("express")
const app = express()
const multer = require("multer")
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `blog/img-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });
const upload = multer({ storage: multerStorage })


app.set('view engine','ejs')

app.get("/",(req, res)=>{
    res.render("index")
})
app.post("/upload",upload.single("file"),async (req,res)=>{
    try {
        res.status(200).json({
          status: "success",
          filename: req.file.filename,
          message: "File created successfully!!",
        });
      } catch (error) {
        res.json({
          error,
        });
      }
})

app.listen(3000,()=>{
    console.log("Servidor rodando...")
})