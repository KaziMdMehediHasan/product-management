import express, { Router } from "express";
import { OrderController } from "./orders.controller";

const router = express.Router();

router.post('/', OrderController.createOrder);
// router.post('/', OrderController.findThatProduct);
router.get('/', OrderController.fetchOrder);



export const OrderRoutes = router;