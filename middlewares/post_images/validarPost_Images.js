const { post_ImagesSchema, post_ImagesActualizarSchema } = require("../../schemas/post_images.schema")

const validarPost_Images = (req, res, next) => {
    const { error } = post_ImagesSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

const validarPost_ImagesDatos = (req, res, next) => {
    const { error } = post_ImagesActualizarSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    if (req.post) {
        req.body.postId = req.post.id
    }
    next()
}

module.exports = { validarPost_Images, validarPost_ImagesDatos }