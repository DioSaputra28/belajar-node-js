import Joi from "joi";

const registrUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
})

export {
    registrUserValidation
}