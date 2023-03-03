import { Router } from "express";
import { shortenUrl, getUrlById, openShort, deleteUrl } from "../controller/shortenController.js";
import { validateUsersSchema } from "../middleware/postUserMiddleware.js";
import  shortenSchema from "../schemas/shortenSchema.js"

const router = Router()

router.post("/urls/shorten", validateUsersSchema(shortenSchema), shortenUrl)
router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", openShort)
router.delete("/urls/:id", deleteUrl)

export default router