const { Comment, User } = require("../../models")

const validarCommentIdConUserYPost = async (req, res, next) => {
    try {
        const { id } = req.params
        const comment = await Comment.findByPk(id, {
            attributes: ["descripcion", "postId", "createdAt", "esVisible"],
            include: {
                model: User,
                as: "user",
                attributes: ["nickName"]
            }
        })
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado." })
        }
        req.comment = comment
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el comentario." })
    }
}

const validarCommentId = async (req, res, next) => {
    try {
        const { id } = req.params
        const comment = await Comment.findByPk(id)
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado." })
        }
        req.comment = comment
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el comentario." })
    }
}

module.exports = { validarCommentId, validarCommentIdConUserYPost }