import "dotenv/config";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });
config({ path: ".env.development" });
config({ path: ".env.local" });

export default defineConfig({
  out: './drizzle',
  schema: './lib/schema.ts',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}); 