const express = require("express")
const router = express.Router()
const authorController = require("../controllers/authorController")
// Server para carregar a imagem...
const multer = require("multer")
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `profiles/img-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });
const upload = multer({ storage: multerStorage })

router.get("/",(req, res)=>{
    res.render("author")
})
router.get("/new", authorController.getNewAuthor)
router.post("/new", upload.single("file"), authorController.postNewAuthor)

router.get("/login", authorController.getLogin)
router.post("/login", authorController.postLogin)

router.get("/profile", authorController.authAuthor, authorController.getProfile)

module.exports = router