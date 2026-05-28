const { Router } = require("express");
const router = Router();
const commentsController = require("../controllers/comments.controllers");
const validarComment = require("../middlewares/comment/validarComment")
const {validarCommentId, validarCommentIdConUserYPost} = require("../middlewares/comment/validarCommentId")

router.get("/", commentsController.obtenerComentarios),
router.get("/:id", validarCommentIdConUserYPost, commentsController.obtenerComentario),
router.post("/", validarComment, commentsController.crearComentario),
router.put("/:id", validarCommentId, validarComment, commentsController.actualizarComentario),
router.delete("/:id", validarCommentId, commentsController.eliminarComentario),


module.exports = router;