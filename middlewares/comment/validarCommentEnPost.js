const { Comment, User } = require("../../models")

const validarCommentEnPost = async (req, res, next) => {
    try {
        const { commentId, id } = req.params
        const comment = await Comment.findOne({
            attributes: ["descripcion", "createdAt"],
            where: {
                id: commentId,
                postId: id,
                esVisible: true
            },
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

module.exports = validarCommentEnPost