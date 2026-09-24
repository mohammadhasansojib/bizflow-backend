import express from "express";
import { auth } from "../../middleware/auth.js";
import { validateRequest } from "../../middleware/zodValidation.js";
import productController from "./product.controller.js";
import { CreateProductCategorySchema, CreateProductSchema } from "./product.schema.js";

const router = express.Router();

router.post("/", auth(), validateRequest(CreateProductSchema), productController.createProduct);
router.post("/categories", auth(), validateRequest(CreateProductCategorySchema), productController.createProductCategory);


const productRoutes = router;
export default productRoutes;