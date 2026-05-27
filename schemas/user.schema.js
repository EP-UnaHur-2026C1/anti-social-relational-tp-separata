const Joi = require("joi")

const userSchema = Joi.object({
    nickName: Joi.string().min(3).max(20).required().messages({
        "string.base": "El nombre de usuario debe ser un texto",
        "string.empty": "El nombre es obligatorio",
        "string.min": "El nombre debe tener al menos 3 caracteres",
        "string.max": "El nombre no debe superar los 20 caracteres",
        "any.required": "El nombre es obligatorio"
    }),
    mail: Joi.string().email().required().messages({
        "string.base": "El correo debe ser un texto",
        "string.empty": "El correo es obligatorio",
        "any.required": "El correo es obligatorio"
    }),
    password: Joi.string().min(8).max(20).required().messages({
        "string.base": "La contraseña debe ser un texto",
        "string.empty": "La contraseña es obligatoria",
        "string.min": "La contraseña debe tener al menos 8 caracteres",
        "string.max": "La contraseña no debe superar los 20 caracteres",
        "any.required": "La contraseña es obligatoria"
    }),
})

module.exports = userSchema