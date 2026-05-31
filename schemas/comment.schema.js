const Joi = require("joi")

const commentSchema = Joi.object({
    descripcion: Joi.string().min(10).max(300).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no debe superar los 300 caracteres",
        "any.required": "La descripción es obligatoria"
    }),
    postId: Joi.number().integer().positive().required().messages({
        "number.base": "El Id del post debe ser un número",
        "number.positive": "El Id del post debe ser mayor a 0",
        "any.required": "El Id del post es obligatorio"
    }),
    userId: Joi.number().integer().positive().required().messages({
        "number.base": "El Id del usuario debe ser un número",
        "number.positive": "El número del id debe ser mayor a 0",
        "any.required": "El id del usuario es obligatorio"
    }),
})

const commentActualizarSchema = Joi.object({
    descripcion: Joi.string().min(10).max(300).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no debe superar los 300 caracteres",
        "any.required": "La descripción es obligatoria"
    })
})


module.exports = { commentSchema, commentActualizarSchema }