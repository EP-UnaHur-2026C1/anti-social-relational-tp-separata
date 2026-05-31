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

const obtenerPostsDeUnUser = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ["descripcion", "createdAt"],
            where: {
                userId: req.user.id
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
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los posts del usuario." })
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
    obtenerPostsDeUnUser,
    asociarTag,
    desasociarTag
}