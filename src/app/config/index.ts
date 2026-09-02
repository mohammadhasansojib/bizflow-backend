import dotenv from "dotenv";
import * as z from "zod";

dotenv.config();

const envSchema = z.object({
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	PORT: z.coerce.number().min(1000, "PORT is required"),
});

const env = envSchema.parse(process.env);

export const config = {
	DATABASE_URL: env.DATABASE_URL,
	PORT: env.PORT,
};

export default config;
