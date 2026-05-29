const { Post_Images } = require("../../models")

const validarPost_ImagesId = async (req, res, next) => {
    try {
        const id = (req.params.imageId || req.params.id)
        const post_Image = await Post_Images.findByPk(id, {
            attributes: ["id", "url", "postId"]
        })
        if (!post_Image) {
            return res.status(404).json({ message: "Asociación no encontrada" })
        }
        req.post_Image = post_Image
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la asociación." })
    }
}

module.exports = validarPost_ImagesId