import dotenv from "dotenv";
import * as z from "zod";

dotenv.config();

const envSchema = z.object({
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	PORT: z.coerce.number().min(1000, "PORT is required"),
	BCRYPT_SALT_ROUND: z.coerce.number().min(1, "BCRYPT_SALT_ROUND is required"),
	
	ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),
	ACCESS_TOKEN_EXPIRES: z.coerce.number().min(1, "ACCESS_TOKEN_EXPIRES is required"),
	REFRESH_TOKEN_SECRET: z.string().min(1, "REFRESH_TOKEN_SECRET is required"),
	REFRESH_TOKEN_EXPIRES: z.coerce.number().min(1, "REFRESH_TOKEN_EXPIRES is required"),
});

const env = envSchema.parse(process.env);

export const config = {
	DATABASE_URL: env.DATABASE_URL,
	PORT: env.PORT,
	BCRYPT_SALT_ROUND: env.BCRYPT_SALT_ROUND,

	ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRES: env.ACCESS_TOKEN_EXPIRES,
	REFRESH_TOKEN_SECRET: env.REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRES: env.REFRESH_TOKEN_EXPIRES,
};

export default config;
