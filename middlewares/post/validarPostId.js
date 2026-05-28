const { Post, User, Post_Images, Tag, Comment } = require("../../models")

const validarPostIdConEntidades = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findByPk(id, {
            attributes: ["descripcion", "createdAt"],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["nickName"]
                },
                {
                    model: Post_Images,
                    as: "images",
                    attributes: ["url"]
                },
                {
                    model: Tag,
                    as: "tags",
                    attributes: ["id", "nombre"]
                }
                // Agregar comments
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

const validarPostId = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findByPk(id)
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado." })
        }
        req.post = post
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el post." })
    }
}

module.exports = { validarPostId, validarPostIdConEntidades }