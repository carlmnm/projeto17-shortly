import { Router } from "express";
import { shortenUrl, getUrlById } from "../controller/shortenController.js";
import { validateUsersSchema } from "../middleware/postUserMiddleware.js";
import  shortenSchema from "../schemas/shortenSchema.js"

const router = Router()

router.post("/urls/shorten", validateUsersSchema(shortenSchema), shortenUrl)
router.get("/urls/:id", getUrlById)

export default router