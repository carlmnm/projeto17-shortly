import { Router } from "express";
import { postUser } from "../controller/userController.js";
import { validateUsersSchema } from "../middleware/postUserMiddleware.js";
import  userSchema from "../schemas/userSchema.js"

const router = Router()

router.post("/signup", validateUsersSchema(userSchema), postUser)

export default router