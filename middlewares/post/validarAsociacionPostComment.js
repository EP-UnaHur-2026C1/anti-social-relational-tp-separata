const validarAsociacionPostComment = async (req, res, next) => {
    try {
        const { id } = req.params
        if (req.comment.postId != id) {
            return res.status(404).json({ message: "El post no tiene asociada el comentario indicado" })
        }
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al validar la asociación" })
    }
}

module.exports = validarAsociacionPostComment