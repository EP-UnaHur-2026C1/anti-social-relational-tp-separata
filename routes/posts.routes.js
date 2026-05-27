const { Router } = require("express");
const router = Router();
const postsController = require("../controllers/posts.controllers");
const validarPost = require("../middlewares/post/validarPost");
const { validarPostId, validarPostIdConEntidades } = require("../middlewares/post/validarPostId")


router.get("/", postsController.obtenerPosts),
router.get("/:id", validarPostIdConEntidades, postsController.obtenerPost),
router.post("/", validarPost, postsController.crearPost),
router.put("/:id", validarPostId, validarPost, postsController.actulizarPost),
router.delete("/:id", validarPostId, postsController.eliminarPost),

module.exports = router;