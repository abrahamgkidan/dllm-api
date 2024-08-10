import { Router } from "express";

import authRoutes from "./auth";
import chatRoutes from "./chat";

const router = Router({ mergeParams: true });

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);

export default router;