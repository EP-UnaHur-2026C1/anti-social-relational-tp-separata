const Joi = require("joi")

const post_ImagesSchema = Joi.object({
    url: Joi.string().uri().required().messages({
        "string.base": "La url debe ser un string",
        "string.uri": "El string debe ser una url valida",
        "any.required": "La url es obligatoria"
    }),
    postId: Joi.number().integer().positive().required().messages({
        "number.base": "El Id del post debe ser un número",
        "number.positive": "El Id del post debe ser mayor a 0",
        "any.required": "El Id del post es obligatorio"
    }),
})

const post_ImagesUrlSchema = Joi.object({
    url: Joi.string().uri().required().messages({
        "string.base": "La url debe ser un string",
        "string.uri": "El string debe ser una url valida",
        "any.required": "La url es obligatoria"
    })
})

module.exports = { post_ImagesSchema, post_ImagesUrlSchema }