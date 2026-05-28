const post_ImagesSchema = require("../../schemas/post_images.schema")

const validarPost_Images = (req, res, next) => {
    const { error } = post_ImagesSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = validarPost_Images