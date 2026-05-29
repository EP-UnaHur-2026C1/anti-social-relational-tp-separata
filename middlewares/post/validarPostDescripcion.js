const { postDescripcionSchema } = require("../../schemas/post.schema")

const validarPostDescripcion = (req, res, next) => {
    const { error } = postDescripcionSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = validarPostDescripcion