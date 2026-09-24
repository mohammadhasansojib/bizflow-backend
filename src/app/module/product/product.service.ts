import { Prisma } from "../../../generated/prisma/client.js";
import { AppError, AuthorizationError, BadRequestError, ConflictError } from "../../utils/errorFormats.js";
import { generateProductCode } from "../../utils/generateProductCode.js";
import type { ICreateProduct, ICreateProductCategory } from "./product.interface.js";
import productRepository from "./product.repository.js";




const createProduct = async (payload: ICreateProduct) => {
    // check user exist or not
    const user = await productRepository.getUserByIdFromDB(payload.userId);
    if (!user) {
        throw new AuthorizationError("user not found");
    }

    // check product category exist or not
    const productCategory = await productRepository.getProductCategoryByIdFromDB(payload.categoryId);
    if (!productCategory) {
        throw new BadRequestError("product category not found");
    }

    // create product and return
    for (let i = 0; i < 3; i++) {
        try {
            const productCode = generateProductCode();

            const product = await productRepository.createProductIntoDB({
                ...payload,
                code: productCode,
            });

            return product;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                continue;
            }

            throw error;
        }
    }

    // explicit error throwing
    throw new AppError("Could not generate a unique product code");
}

const createProductCategory = async (payload: ICreateProductCategory) => {
    // check user exist or not
    const user = await productRepository.getUserByIdFromDB(payload.userId);
    if (!user) {
        throw new AuthorizationError("user not found");
    }

    try {
        // create product category
        const createdProductCategory = await productRepository.createProductCategoryIntoDB(payload);

        // return product category
        return createdProductCategory;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new ConflictError("product category name already exist");
            }
        }
    }

    throw new AppError("something went wrong: try again later");
}


const productService = {
    createProduct,
    createProductCategory,
}
export default productService;