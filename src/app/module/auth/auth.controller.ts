import type { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import authService from "./auth.service.js";
import { AuthorizationError } from "../../utils/errorFormats.js";

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
    if (!req.user) {
        return sendResponse(res, {
            success: false,
            message: "user not found",
            statusCode: status.UNAUTHORIZED,
            data: null,
        })
    };
    const {email} = req.user;

    res.clearCookie("accessToken", {
        path: "/",
        httpOnly: true,
        secure: false,
    });
    res.clearCookie("refreshToken", {
        path: "/",
        httpOnly: true,
        secure: false,
    });

    sendResponse(res, {
        success: true,
        message: "Logout successfully",
        statusCode: status.OK,
        data: {
            user: {
                email,
            }
        },
    })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {

})

const getMe = catchAsync(async (req: Request, res: Response) => {
    const id = req.user?.id;
    if (!id) {
        throw new AuthorizationError("invalid user id");
    }

    const user = await authService.getMe(id);

    sendResponse(res, {
        success: true,
        message: "user info retrived successfully",
        statusCode: status.OK,
        data: {
            user,
        }
    })
})

const authController = {
    register,
    login,
    logout,
    refreshToken,
    getMe,
}
export default authController;