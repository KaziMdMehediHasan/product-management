import { Request, Response } from "express";
import { ProductServices } from "./products.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const result = await ProductServices.createProductDB(productData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

const fetchProduct = async (req: Request, res: Response) => {
    try {
        const result = await ProductServices.fetchProductFromDB();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

const fetchSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const result = await ProductServices.fetchSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

export const ProductController = {
    createProduct,
    fetchProduct,
    fetchSingleProduct
}