const { Router } = require("express");
const router = Router();
const tagsController = require("../controllers/tags.controllers");
const validarTag = require("../middlewares/tag/validarTag")
const { validarTagId, validarTagIdConPost } = require("../middlewares/tag/validarTagId")

router.get("/", tagsController.obtenerTags)
router.get("/:id", validarTagIdConPost, tagsController.obtenerTag)
router.post("/", validarTag, tagsController.crearTag)
router.put("/:id", validarTagId, validarTag, tagsController.actualizarTag)
router.delete("/:id", validarTagId, tagsController.eliminarTag)



module.exports = router;