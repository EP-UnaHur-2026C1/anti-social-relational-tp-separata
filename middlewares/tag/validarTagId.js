const { Tag, Post } = require("../../models")

const validarTagIdConPost = async (req, res, next) => {
    try {
        const { id } = req.params
        const tag = await Tag.findByPk(id, {
            attributes: ["nombre"],
            include: {
                model: Post,
                as: "posts",
                attributes: ["id"]
            }
        })
        if (!tag) {
            return res.status(404).json({ message: "Tag no encontrada" })
        }
        req.tag = tag
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al encontrar la tag" })
    }
}

const validarTagId = async (req, res, next) => {
    try {
        const { id } = req.params
        const tag = await Tag.findByPk(id)
        if (!tag) {
            return res.status(404).json({ message: "Tag no encontrada" })
        }
        req.tag = tag
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al encontrar la tag" })
    }
}

module.exports = {validarTagId, validarTagIdConPost}