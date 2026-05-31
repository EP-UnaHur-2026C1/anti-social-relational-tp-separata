const { commentSchema, commentActualizarSchema } = require("../../schemas/comment.schema")

const validarComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

const validarCommentDatos = (req, res, next) => {
    const { error } = commentActualizarSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    if (req.post) {
        req.body.postId = req.post.id
    }
    if (req.user) {
        req.body.userId = req.user.id
    }
    next()
}

module.exports = { validarComment, validarCommentDatos }