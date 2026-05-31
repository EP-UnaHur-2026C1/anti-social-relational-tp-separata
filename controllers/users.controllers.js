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

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}