import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import ProductValidationSchema from "./product.zod.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        // validation using zod
        const validatedProductData = ProductValidationSchema.parse(productData);
        const result = await ProductServices.createProductDB(validatedProductData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

const fetchProduct = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        /*eslint no-prototype-builtins: "off"*/
        if (req.query.hasOwnProperty('searchTerm') && typeof searchTerm === "string" && searchTerm !== undefined) {

            const result = await ProductServices.fetchProductWithQuery(searchTerm);
            // if there's no result in the array, then it will throw an error
            if (result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "No product found"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Products fetched successfully!',
                    data: result
                });
            }

        } else {
            const result = await ProductServices.fetchProductFromDB();
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        })
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
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updatedProductInfo = req.body
        const result = await ProductServices.updateProductInfoDB(productId, updatedProductInfo);
        if (!result) {
            res.status(400).json({
                success: false,
                message: 'Invalid Product ID',
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully!',
                data: result
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const result = await ProductServices.deleteProductFromDB(productId);
        // error handling
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Product does not exist'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: result
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

export const ProductController = {
    createProduct,
    fetchProduct,
    fetchSingleProduct,
    updateSingleProduct,
    deleteProduct
}