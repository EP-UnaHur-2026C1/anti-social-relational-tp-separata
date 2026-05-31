const { Post_Images } = require("../../models")

const validarAsociacionPostImage = async (req, res, next) => {
    try {
        const { imageId, id } = req.params
        const post_Image = await Post_Images.findOne({
            where: {
                id: imageId,
                postId: id
            }
        })
        if (!post_Image) {
            return res.status(404).json({ message: "El post no tiene asociada la image indicada" })
        }
        req.post_Image = post_Image
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al validar la asociación" })
    }
}



module.exports = validarAsociacionPostImage