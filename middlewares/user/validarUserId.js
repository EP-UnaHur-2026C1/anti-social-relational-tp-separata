const { User, Post, Comment, Post_Images, Tag } = require("../../models")

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

const validarUserIdConPosts = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id, {
            attributes: ["nickName", "mail"],
            include:
            {
                model: Post,
                as: "posts",
                attributes: ["descripcion", "createdAt"],
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
            }
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

const validarUserIdConComments = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id, {
            attributes: ["nickName", "mail"],
            include:
            {
                model: Comment,
                as: "comments",
                attributes: ["descripcion", "postId", "createdAt", "esVisible"]
            }
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


module.exports = { validarUserIdConEntidades, validarUserId, validarUserIdConPosts, validarUserIdConComments }