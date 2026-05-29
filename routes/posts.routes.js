const { Router } = require("express");
const router = Router();
const postsController = require("../controllers/posts.controllers");
const validarPost = require("../middlewares/post/validarPost");
const { validarPostId, validarPostIdConEntidades, validarPostIdConComments } = require("../middlewares/post/validarPostId")
const { validarCommentIdConUserYPost } = require("../middlewares/comment/validarCommentId")
const validarAsociacionPostComment = require("../middlewares/post/validarAsociacionPostComment")
const validarPost_ImagesUrl = require("../middlewares/post_images/validarPost_ImagesUrl")
const validarPost_ImagesId = require("../middlewares/post_images/validarPost_ImagesId")
const validarAsociacionPostImage = require("../middlewares/post/validarAsociacionPostImage")
const { validarTagId } = require("../middlewares/tag/validarTagId")

router.get("/", postsController.obtenerPosts)
router.get("/:id", validarPostIdConEntidades, postsController.obtenerPost)
router.post("/", validarPost, postsController.crearPost)
router.put("/:id", validarPostId, validarPost, postsController.actulizarPost)
router.delete("/:id", validarPostId, postsController.eliminarPost)

router.get("/:id/comments", validarPostIdConComments, postsController.obtenerCommentsDeUnPost)
router.get("/:id/comments/:commentId", validarPostId, validarCommentIdConUserYPost, validarAsociacionPostComment, postsController.obtenerCommentDeUnPost)

router.post("/:id/images", validarPostId, validarPost_ImagesUrl, postsController.asociarImage)
router.delete("/:id/images/:imageId", validarPostId, validarPost_ImagesId, validarAsociacionPostImage, postsController.desasociarImage)

router.post("/:id/tags/:tagId", validarPostId, validarTagId, postsController.asociarTag)
router.delete("/:id/tags/:tagId", validarPostId, validarTagId, postsController.desasociarTag)

module.exports = router;