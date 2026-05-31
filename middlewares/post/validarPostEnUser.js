const { Post, Post_Images, Tag, Comment } = require("../../models")

const validarPostEnUser = async (req, res, next) => {
    try {
        const { postId, id } = req.params
        const post = await Post.findOne({
            attributes: ["descripcion", "createdAt"],
            where: {
                id: postId,
                userId: id
            },
            include: [
                {
                    model: Post_Images,
                    as: "images",
                    attributes: ["url"]
                },
                {
                    model: Tag,
                    as: "tags",
                    attributes: ["id", "nombre"],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id"]
                }
            ]
        })
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado." })
        }
        req.post = post
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el post." })
    }
}








module.exports = validarPostEnUser