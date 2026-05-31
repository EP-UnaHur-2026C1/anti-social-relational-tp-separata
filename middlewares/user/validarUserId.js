const { User, Post, Comment } = require("../../models")

const validarUserIdConEntidades = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id, {
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
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario." })
    }
}

const validarUserId = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario." })
    }
}

module.exports = { validarUserIdConEntidades, validarUserId }