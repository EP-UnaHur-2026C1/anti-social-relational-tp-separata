const { Router } = require("express");
const router = Router();
const post_imagesController = require("../controllers/post_images.controllers");
const validarPost_Images = require("../middlewares/post_images/validarPost_Images");
const validarPost_ImagesId = require("../middlewares/post_images/validarPost_ImagesId");

router.get("/", post_imagesController.obtenerPost_Images)
router.get("/:id", validarPost_ImagesId, post_imagesController.obtenerPost_Image)
router.post("/", validarPost_Images, post_imagesController.crearPost_Image)
router.put("/:id", validarPost_ImagesId, validarPost_Images, post_imagesController.actualizarPost_Image)
router.delete("/:id", validarPost_ImagesId, post_imagesController.eliminarPost_Image)

module.exports = router;