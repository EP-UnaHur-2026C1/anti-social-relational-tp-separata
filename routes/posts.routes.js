const { Router } = require("express");
const router = Router();
const postsController = require("../controllers/posts.controllers");
const { obtenerComentario, obtenerComentariosDeUnPost } = require("../controllers/comments.controllers");
const { crearPost_Image, eliminarPost_Image } = require("../controllers/post_images.controllers");

const { validarPost, validarPostDatos } = require("../middlewares/post/validarPost");
const { validarPostId, validarPostIdConEntidades } = require("../middlewares/post/validarPostId")

const validarCommentEnPost = require("../middlewares/comment/validarCommentEnPost")

const { validarPost_ImagesDatos } = require("../middlewares/post_images/validarPost_Images")
const validarAsociacionPostImage = require("../middlewares/post_images/validarAsociacionPostImage")

const { validarTagId } = require("../middlewares/tag/validarTagId")

router.get("/", postsController.obtenerPosts)
router.get("/:id", validarPostIdConEntidades, postsController.obtenerPost)
router.post("/", validarPost, postsController.crearPost)
router.put("/:id", validarPostId, validarPostDatos, postsController.actulizarPost)
router.delete("/:id", validarPostId, postsController.eliminarPost)

router.get("/:id/comments", validarPostId, obtenerComentariosDeUnPost)
router.get("/:id/comments/:commentId", validarPostId, validarCommentEnPost, obtenerComentario)

router.post("/:id/images", validarPostId, validarPost_ImagesDatos, crearPost_Image)
router.delete("/:id/images/:imageId", validarPostId, validarAsociacionPostImage, eliminarPost_Image)

router.post("/:id/tags/:tagId", validarPostId, validarTagId, postsController.asociarTag)
router.delete("/:id/tags/:tagId", validarPostId, validarTagId, postsController.desasociarTag)

module.exports = router;