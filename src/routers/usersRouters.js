import { Router } from "express";
import { postSignup, postSignin, showUserData, showRank } from "../controller/userController.js";
import { validateUsersSchema } from "../middleware/postUserMiddleware.js";
import  signupSchema from "../schemas/signupSchema.js"
import signinSchema from "../schemas/signinSchema.js";

const router = Router()

router.post("/signup", validateUsersSchema(signupSchema), postSignup)
router.post("/signin", validateUsersSchema(signinSchema), postSignin)
router.get("/users/me", showUserData)
router.get("/ranking", showRank)

export default router