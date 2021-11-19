import { join } from "path";
import { config } from "dotenv";

export interface EnvVariables {
  port: number;
  googleProjectId: string;
  googleKey: string;
}

function loadEnv(): void {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === "development") {
    const path = join(process.cwd(), ".env.development");
    config({ path });
  }
}

function getEnvVariables(): EnvVariables {
  loadEnv();
  const { PORT, GOOGLE_PROJECT_ID, GOOGLE_KEY } = process.env;

  return {
    port: parseInt(PORT) || 8080,
    googleProjectId: GOOGLE_PROJECT_ID,
    googleKey: GOOGLE_KEY,
  };
}

export const envVariables = getEnvVariables();
