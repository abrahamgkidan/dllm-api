import * as dotenv from "dotenv";
import Joi from "joi";

import { DEFAULT_PORT } from "../utils/const";

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .default("development"),
    PORT: Joi.number().default(DEFAULT_PORT),
    LOGGING_LEVEL: Joi.string()
      .valid("debug", "info", "warn", "error")
      .default("debug")
      .description("Logging threshold"),
    MONGODB_URL: Joi.string().required().description("MongoDB DB url"),
    LLM_API_URL: Joi.string()
      .uri()
      .default("http://localhost:8000")
      .description("The URL of the LLM API"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" }, abortEarly: false })
  .validate(process.env);

if (error) {
  throw new Error(
    `Application configuration validation error. Details: ${error.message}`
  );
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  logging: {
    level: envVars.LOGGING_LEVEL,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
  },
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {},
  },
  llmApiUrl: envVars.LLM_API_URL,
};

export default config;
