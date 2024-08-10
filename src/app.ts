import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import httpStatus from "http-status";
import * as dotenv from "dotenv";

dotenv.config();

import { jwtStrategy } from "./middlewares/passport-jwt";
import { errorConverter, errorHandler } from "./middlewares/error";
import routes from "./routes";

const app: Application = express();

// set security HTTP headers
const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
delete cspDefaults["upgrade-insecure-requests"];
app.use(
  helmet({
    contentSecurityPolicy: { directives: cspDefaults },
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// passport multi-strategy authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req: any, res: any, next) => {
  const error: any = new Error("Not found");
  error.statusCode = httpStatus.NOT_FOUND
  next(error);
});

// handle error
app.use(errorConverter);
app.use(errorHandler);

export default app;
