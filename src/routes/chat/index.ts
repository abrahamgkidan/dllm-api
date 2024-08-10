import { Router } from "express";
import passport from "passport";

/**
 * Import all the routes
 */
import { listChat } from "./chat-list";
import { queryChat } from "./chat-query";
import { removeAllChat } from "./chat-remove";

const router = Router();

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), listChat)
  .post(passport.authenticate("jwt", { session: false }), queryChat)
  .delete(passport.authenticate("jwt", { session: false }), removeAllChat);

export default router;
