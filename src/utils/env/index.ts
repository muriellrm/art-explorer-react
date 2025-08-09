import { z } from "zod";
import { LogLevel } from "../logging/logger";

const envSchema = z.object({
  VITE_APP_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  VITE_APP_NAME: z.string(),
  VITE_APP_BASE_URL: z.string(),
  VITE_LOG_LEVEL: z.enum(Object.keys(LogLevel)),
});
const _env = envSchema.safeParse(import.meta.env);
export const validateEnv = () => {
  if (!_env.success) {
    console.error(
      "❌ Invalid envoirment variables!",
      z.prettifyError(_env.error)
    );
    throw new Error("Invalid envoirment variables");
  }
};

export const env = _env.data;
