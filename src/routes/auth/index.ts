// routes/auth/index.ts

import { Router } from "express";

// auth route handlers
import { loginUser } from "./login";
import { registerUser } from "./register";

const router = Router({ mergeParams: true });

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
