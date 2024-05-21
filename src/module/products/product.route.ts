import express, { Request, Response, Router } from "express";
import { Products } from "./products.model";
import { ProductController } from "./products.controller";

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.fetchProduct);
router.get('/:id', ProductController.fetchSingleProduct);

export const ProductRoutes = router;