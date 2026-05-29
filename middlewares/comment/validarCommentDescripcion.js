const { commentDescripcionSchema } = require("../../schemas/comment.schema")

const validarCommentDescripcion = (req, res, next) => {
    const { error } = commentDescripcionSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = validarCommentDescripcion