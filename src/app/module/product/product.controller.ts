import type { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthorizationError } from "../../utils/errorFormats.js";
import { sendResponse } from "../../utils/sendResponse.js";
import productService from "./product.service.js";



const createProduct = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new AuthorizationError("user id not found");
    }

    const payload = {
        userId,
        ...req.body,
        code: "______",
    }

    const createdProduct = await productService.createProduct(payload);

    sendResponse(res, {
        success: true,
        message: "Product created successfully",
        statusCode: status.CREATED,
        data: {
            product: createdProduct,
        }
    })
})

const createProductCategory = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new AuthorizationError("user id not found");
    }

    const createdProductCategory = await productService.createProductCategory({
        ...req.body,
        userId,
    });

    sendResponse(res, {
        success: true,
        message: "Product category created successfully",
        statusCode: status.CREATED,
        data: {
            productCategory: createdProductCategory,
        }
    })
});

const productController = {
    createProduct,
    createProductCategory,
}
export default productController;