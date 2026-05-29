const { post_ImagesUrlSchema } = require("../../schemas/post_images.schema")

const validarPost_ImagesUrl = (req, res, next) => {
    const { error } = post_ImagesUrlSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = validarPost_ImagesUrl