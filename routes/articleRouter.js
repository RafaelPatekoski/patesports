const express = require("express")
const router = express.Router()
const articleController = require("../controllers/articleController")
const authorController = require("../controllers/authorController")
// Server para carregar a imagem...
const multer = require("multer")
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `articles/img-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });
const upload = multer({ storage: multerStorage })

router.get("/",(req, res)=>{
    res.send("articles")
})
router.get("/new", authorController.authAuthor,articleController.getNewArticle)
router.post("/new", upload.single("file"),articleController.postNewArticle)

module.exports = router