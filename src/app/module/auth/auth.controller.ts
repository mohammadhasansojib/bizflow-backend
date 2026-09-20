import type { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import authService from "./auth.service.js";

const register = catchAsync(async (req: Request, res: Response) => {

    const payload = req.body;

    const user = await authService.register(payload);

    sendResponse(res, {
        success: true,
        message: "User registered successfully",
        statusCode: status.CREATED,
        data: {
            user,
        }
    })
})

const login = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

	const result = await authService.login(payload);

	sendResponse(res, {
		success: true,
		message: "login successful",
		statusCode: status.OK,
		data: result,
	});
})

const logout = catchAsync(async (req: Request, res: Response) => {

})

const refreshToken = catchAsync(async (req: Request, res: Response) => {

})

const authController = {
    register,
    login,
    logout,
    refreshToken,
}
export default authController;