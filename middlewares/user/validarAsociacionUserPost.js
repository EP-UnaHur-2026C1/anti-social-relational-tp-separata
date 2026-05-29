const validarAsociacionUserPost = async (req, res, next) => {
    try {
        if (req.post.user.nickName != req.user.nickName) {
            return res.status(404).json({ message: "El user no tiene asociada el post indicado" })
        }
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al validar la asociación" })
    }
}

module.exports = validarAsociacionUserPost