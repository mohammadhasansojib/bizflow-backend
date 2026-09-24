import { prisma } from "../../lib/prisma.js";
import type { ICreateProduct, ICreateProductCategory } from "./product.interface.js";



class ProductRepository {
    async getUserByIdFromDB(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });

        return user;
    }

    async getProductCategoryByIdFromDB(categoryId: string) {
        const productCategory = await prisma.productCategory.findUnique({
            where: {
                id: categoryId,
            }
        });

        return productCategory;
    }

    async createProductIntoDB(payload: ICreateProduct) {
        const product = await prisma.product.create({
            data: {
                ...payload,
            }
        });

        return product;
    }

    async createProductCategoryIntoDB(payload: ICreateProductCategory) {
        const productCategory = await prisma.productCategory.create({
            data: {
                ...payload,
            },
            include: {
                user: {
                    omit: {
                        password: true,
                    }
                }
            }
        });

        return productCategory;
    }
}


const productRepository = new ProductRepository();
export default productRepository;