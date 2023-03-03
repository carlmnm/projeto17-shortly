import { Router } from "express";
import { postSignup, postSignin } from "../controller/userController.js";
import { validateUsersSchema } from "../middleware/postUserMiddleware.js";
import  signupSchema from "../schemas/signupSchema.js"
import signinSchema from "../schemas/signinSchema.js";

const router = Router()

router.post("/signup", validateUsersSchema(signupSchema), postSignup)
router.post("/signin", validateUsersSchema(signinSchema), postSignin)

export default router