const { Comment, User } = require("../models")

const obtenerComentarios = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            attributes: ["descripcion", "postId", "createdAt", "esVisible"],
            include: {
                model: User,
                as: "user",
                attributes: ["nickName"]
            }
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los comentarios." })
    }
}

const obtenerComentario = (req, res) => {
    const comment = req.comment
    res.status(200).json(comment)
}

const crearComentario = async (req, res) => {
    try {
        const { descripcion, postId, userId } = req.body
        const comment = await Comment.create({
            descripcion,
            postId,
            userId
        })
        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({ error: "Error al crear el comentario." })
    }
}

const actualizarComentario = async (req, res) => {
    try {
        const { descripcion, postId, userId } = req.body
        const comment = req.comment
        await comment.update({
            descripcion,
            postId,
            userId
        })
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el comentario." })
    }
}

const eliminarComentario = async (req, res) => {
    try {
        const comment = req.comment
        await comment.destroy()
        res.status(200).json({ message: "Comentario eliminado correctamente." })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el comentario." })
    }
}

const obtenerComentariosDeUnPost = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            attributes: ["descripcion", "createdAt"],
            where: {
                postId: req.post.id,
                esVisible: true
            },
            include: {
                model: User,
                as: "user",
                attributes: ["nickName"]
            }
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: "Error al encontrar los comentarios del post." })
    }
}

const obtenerComentariosDeUnUser = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            attributes: ["descripcion", "postId", "createdAt", "esVisible"],
            where: {
                userId: req.user.id
            }
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: "Error al encontrar los comentarios del usuario." })
    }
}


module.exports = {
    obtenerComentarios,
    obtenerComentario,
    crearComentario,
    actualizarComentario,
    eliminarComentario,
    obtenerComentariosDeUnPost,
    obtenerComentariosDeUnUser
}