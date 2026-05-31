const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/users.controllers");
const { obtenerPostsDeUnUser, obtenerPost, crearPost } = require("../controllers/posts.controllers");
const { crearComentario, obtenerComentariosDeUnUser } = require("../controllers/comments.controllers")

const validarUser = require("../middlewares/user/validarUser");
const { validarUserId, validarUserIdConEntidades } = require("../middlewares/user/validarUserId")

const validarPostEnUser = require("../middlewares/post/validarPostEnUser")
const { validarPostDatos } = require("../middlewares/post/validarPost")
const { validarPostId } = require("../middlewares/post/validarPostId")

const { validarCommentDatos } = require("../middlewares/comment/validarComment")

router.get("/", usersController.obtenerUsuarios)
router.get("/:id", validarUserIdConEntidades, usersController.obtenerUsuario)
router.post("/", validarUser, usersController.crearUsuario)
router.put("/:id", validarUserId, validarUser, usersController.actualizarUsuario)
router.delete("/:id", validarUserId, usersController.eliminarUsuario)

router.get("/:id/posts", validarUserId, obtenerPostsDeUnUser)
router.get("/:id/posts/:postId", validarUserId, validarPostEnUser, obtenerPost)
router.post("/:id/posts/", validarUserId, validarPostDatos, crearPost)

router.get("/:id/comments", validarUserId, obtenerComentariosDeUnUser)
router.post("/:id/posts/:postId/comments", validarUserId, validarPostId, validarCommentDatos, crearComentario)

module.exports = router;