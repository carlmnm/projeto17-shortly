import Joi from "joi";

const signinSchema = Joi.object({
    email: Joi.string().min(1).email().required(),
    password: Joi.string().min(1).required(),
})

export default signinSchema