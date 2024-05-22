import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import ProductValidationSchema from "./product.zod.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        // validation using zod
        const validatedProductData = ProductValidationSchema.parse(productData); //.validate(productData); // 
        const result = await ProductServices.createProductDB(validatedProductData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result
        });
    } catch (error) {
        res.send(error);
    }
}

const fetchProduct = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        if (req.query.hasOwnProperty('searchTerm') && typeof searchTerm === "string" && searchTerm !== undefined) {
            console.log(`Im inside and I am ${searchTerm}`);
            const result = await ProductServices.fetchProductWithQuery(searchTerm);
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result
            });
        } else {
            const result = await ProductServices.fetchProductFromDB();
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result
            });
        }

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

const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updatedProductInfo = req.body
        console.log(req.body);
        const result = await ProductServices.updateProductInfoDB(productId, updatedProductInfo)
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result
        })
    } catch (error) {
        console.log(error);
    }
    // const doc = await Products.findOne({ _id: req.params.id });
    // console.log(doc);

    // res.json(doc);
    // console.log(req.body);
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const result = await ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

export const ProductController = {
    createProduct,
    fetchProduct,
    fetchSingleProduct,
    updateSingleProduct,
    deleteProduct
}