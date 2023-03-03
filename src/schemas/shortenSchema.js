import Joi from "joi";

const shortenSchema = Joi.object({
    url: Joi.string().uri().min(1).required(),
})

export default shortenSchema