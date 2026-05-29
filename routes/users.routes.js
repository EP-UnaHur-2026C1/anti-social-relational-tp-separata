const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/users.controllers");
const validarUser = require("../middlewares/user/validarUser");
const { validarUserId, validarUserIdConEntidades, validarUserIdConPosts, validarUserIdConComments } = require("../middlewares/user/validarUserId")
const validarAsociacionUserPost = require("../middlewares/user/validarAsociacionUserPost")
const validarPostDescripcion = require("../middlewares/post/validarPostDescripcion")
const { validarPostIdConEntidades, validarPostId } = require("../middlewares/post/validarPostId")

router.get("/", usersController.obtenerUsuarios)
router.get("/:id", validarUserIdConEntidades, usersController.obtenerUsuario)
router.post("/", validarUser, usersController.crearUsuario)
router.put("/:id", validarUserId, validarUser, usersController.actualizarUsuario)
router.delete("/:id", validarUserId, usersController.eliminarUsuario)

router.get("/:id/posts", validarUserIdConPosts, usersController.obtenerPostsDeUnUser)
router.get("/:id/posts/:postId", validarUserId, validarPostIdConEntidades, validarAsociacionUserPost, usersController.obtenerUnPostDeUnUser)
router.post("/:id/posts/", validarUserId, validarPostDescripcion, usersController.publicarPost)

router.get("/:id/comments", validarUserIdConComments, usersController.obtenerCommentsDeUnUser)
router.post("/:id/posts/:postId/comments", validarUserId, validarPostId, usersController.publicarComment)



module.exports = router;