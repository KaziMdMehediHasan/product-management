import express, { Request, Response, Router } from "express";
import { Products } from "./products.model";
import { ProductController } from "./products.controller";
import { TProduct } from "./products.interface";

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.fetchProduct);
router.get('/:id', ProductController.fetchSingleProduct);
router.put('/:id', ProductController.updateSingleProduct);
router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;