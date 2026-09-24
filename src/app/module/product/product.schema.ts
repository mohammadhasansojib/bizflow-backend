import * as z from "zod";


export const CreateProductSchema = z.object({
    name: z.string()
            .min(3, "product name must be atleast 3 characters")
            .max(25, "product name can be atmost 25 characters"),
    categoryId: z.string("Invalid categoryId"),
});

export const CreateProductCategorySchema = z.object({
    name: z.string()
            .min(3, "product category name must be atleast 3 characters")
            .max(25, "product category name can be atmost 25 characters"),
})