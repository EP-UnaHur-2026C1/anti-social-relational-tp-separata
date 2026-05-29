const { Post, User, Post_Images, Tag, Comment } = require("../models")

const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
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
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los posts." })
    }
}

const obtenerPost = (req, res) => {
    const post = req.post
    res.status(200).json(post)
}

const crearPost = async (req, res) => {
    try {
        const { descripcion, userId } = req.body
        const post = Post.create({
            descripcion,
            userId
        })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ error: "Error al crear el post." })
    }
}

const actulizarPost = async (req, res) => {
    try {
        const { descripcion, userId } = req.body
        const post = req.post
        await post.update({
            descripcion,
            userId
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el post." })
    }
}

const eliminarPost = async (req, res) => {
    try {
        const post = req.post
        await post.destroy()
        res.status(200).json({ message: "Post eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el post." })
    }
}

const obtenerCommentsDeUnPost = (req, res) => {
    const post = req.post
    res.status(200).json(post.comments)
}

const obtenerCommentDeUnPost = (req, res) => {
    const comment = req.comment
    res.status(200).json(comment)
}

const asociarImage = async (req, res) => {
    try {
        const { url } = req.body
        const { id } = req.params
        await Post_Images.create({
            url,
            postId: id
        })
        res.status(200).json({ message: "Image asociada correctamente" })
    } catch (error) {
        res.status(500).json({ message: "Error al asociar image al post" })
    }
}

const desasociarImage = async (req, res) => {
    try {
        const image = req.post_Image
        await image.destroy()
        res.status(200).json({ message: "Image desasociada correctamente" })
    } catch (error) {
        res.status(500).json({ message: "Error al desasociar image al post" })
    }
}

const asociarTag = async (req, res) => {
    try {
        const post = req.post
        const tag = req.tag
        await post.addTag(tag);
        res.status(200).json({ message: "Tag asociada correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al asociar tag al post" });
    }
}

const desasociarTag = async (req, res) => {
    try {
        const post = req.post
        const tag = req.tag
        await post.removeTag(tag);
        res.status(200).json({ message: "Tag desasociada correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al desasociar tag al post" });
    }
}

module.exports = {
    obtenerPosts,
    obtenerPost,
    crearPost,
    actulizarPost,
    eliminarPost,
    obtenerCommentsDeUnPost,
    obtenerCommentDeUnPost,
    asociarImage,
    desasociarImage,
    asociarTag,
    desasociarTag
}