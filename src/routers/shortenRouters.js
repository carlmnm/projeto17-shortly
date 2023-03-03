import { Router } from "express";
import { shortenUrl } from "../controller/shortenController.js";
import { validateUsersSchema } from "../middleware/postUserMiddleware.js";
import  shortenSchema from "../schemas/signupSchema.js"

const router = Router()

router.post("/urls/shorten", validateUsersSchema(shortenSchema), shortenUrl)

export default router