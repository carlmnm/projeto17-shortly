import Joi from "joi";

const shortenSchema = Joi.object({
    url: Joi.string().uri({ scheme: ['http', 'https'] }).min(1).required(),
})

export default shortenSchema