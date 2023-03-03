import Joi from "joi";

const usersSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    password: Joi.string().min(1).required(),
    confirmPassword: Joi.string().min(1).required()
})

export default usersSchema;