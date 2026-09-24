import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import { prisma } from "./lib/prisma.js";
import authRoutes from "./module/auth/auth.route.js";
import productRoutes from "./module/product/product.route.js";
import { AppError } from "./utils/errorFormats.js";
import { sendResponse } from "./utils/sendResponse.js";

const app = express();

//cors
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true,
}));
// cookie parser
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", (_req: Request, res: Response) => {
	res.send("Server Running...");
});

app.get("/test-prisma", async (_req: Request, res: Response) => {
	const test = await prisma.test.create({});

	res.json({
		data: test,
	});
});

// 404 route handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
	sendResponse(res, {
		success: false,
		message: "route not found",
		statusCode: 404,
		data: null,
	});
});

// global error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
	let statusCode = 500;
	let message = "Internal Server Error";

	if (err instanceof AppError) {
		statusCode = err.statusCode;
		message = err.message;
	}

	sendResponse(res, {
		success: false,
		message,
		statusCode,
		data: null,
	});
});

export default app;
