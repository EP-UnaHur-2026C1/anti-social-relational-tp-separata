const { User, Post, Comment } = require("../models")

const obtenerUsuarios = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["nickName", "mail"],
            include: [
                {
                    model: Post,
                    as: "posts",
                    attributes: ["id"]
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id"]
                }
            ]
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios." })
    }
}

const obtenerUsuario = (req, res) => {
    const user = req.user
    res.status(200).json(user)
}

const crearUsuario = async (req, res) => {
    try {
        const { nickName, mail, password } = req.body
        const user = await User.create({
            nickName,
            mail,
            password
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario." })
    }
}

const actualizarUsuario = async (req, res) => {
    try {
        const { nickName, mail, password } = req.body
        const user = req.user
        await user.update({
            nickName,
            mail,
            password,
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar los datos del usuario." })
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const user = req.user
        await user.destroy()
        res.status(200).json({ message: "Usuario eliminado correctamente." })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario." })
    }
}

const obtenerPostsDeUnUser = (req, res) => {
    const user = req.user
    res.status(200).json(user.posts)
}

const obtenerUnPostDeUnUser = (req, res) => {
    const post = req.post
    res.status(200).json(post)
}

const publicarPost = async (req, res) => {
    try {
        const { descripcion } = req.body
        const { id } = req.params
        await Post.create({
            descripcion,
            userId: id
        })
        res.status(200).json({ message: "Post publicado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al publicar el post." })
    }
}

const obtenerCommentsDeUnUser = (req, res) => {
    const user = req.user
    res.status(200).json(user.comments)
}

const publicarComment = async (req, res) => {
    try {
        const { descripcion } = req.body
        const { postId, id } = req.params
        await Comment.create({
            descripcion,
            postId,
            userId: id
        })
        res.status(200).json({ message: "Comment publicado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al publicar el comment." })
    }
}


module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerPostsDeUnUser,
    obtenerUnPostDeUnUser,
    publicarPost,
    obtenerCommentsDeUnUser,
    publicarComment
}