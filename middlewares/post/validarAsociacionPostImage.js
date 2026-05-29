const validarAsociacionPostImage = async (req, res, next) => {
    try {
        const { id } = req.params
        if (req.post_Image.postId != id) {
            return res.status(404).json({ message: "El post no tiene asociada la image indicada" })
        }
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al validar la asociación" })
    }
}

module.exports = validarAsociacionPostImage