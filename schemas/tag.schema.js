const Joi = require("joi")

const tagSchema = Joi.object({
    nombre: Joi.string().min(3).max(15).required().messages({
        "string.base": "La tag debe ser un texto",
        "string.empty": "La tag es obligatoria",
        "string.min": "La tag debe tener al menos 3 caracteres",
        "string.max": "La tag no debe superar los 15 caracteres",
        "any.required": "La tag es obligatorio"
    }),
})

module.exports = tagSchema