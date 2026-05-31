const Joi = require("joi")

const postSchema = Joi.object({
    descripcion: Joi.string().min(10).max(500).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no debe superar los 500 caracteres",
        "any.required": "La descripción es obligatoria"
    }),
    userId: Joi.number().integer().positive().required().messages({
        "number.base": "El Id del usuario debe ser un número",
        "number.positive": "El número del id debe ser mayor a 0",
        "any.required": "El id del usuario es obligatorio"
    })
})

const postActualizarSchema = Joi.object({
    descripcion: Joi.string().min(10).max(500).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no debe superar los 500 caracteres",
        "any.required": "La descripción es obligatoria"
    })
})

module.exports = { postSchema, postActualizarSchema }