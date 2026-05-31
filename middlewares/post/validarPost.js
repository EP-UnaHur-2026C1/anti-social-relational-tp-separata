const { postSchema, postActualizarSchema } = require("../../schemas/post.schema")

const validarPost = (req, res, next) => {
    const { error } = postSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

const validarPostDatos = (req, res, next) => {
    const { error } = postActualizarSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    if (req.user) {
        req.body.userId = req.user.id
    }
    next()
}

module.exports = { validarPost, validarPostDatos }