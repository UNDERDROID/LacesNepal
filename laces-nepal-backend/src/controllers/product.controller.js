import { getPaginatedProductsService, createNewProductService, deleteProductByIdService } from "../services/product.service.js";
import { addProductToCategoryService } from "../services/category.service.js";
export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const products = await getPaginatedProductsService(page, limit);

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            imageUrl,
            stock,
            categoryId,
        } = req.body;

        if (!name || !price || !stock || !categoryId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newProduct = await createNewProductService({
            name,
            description,
            price,
            imageUrl,
            stock,
            categoryId,
        });
        res.status(201).json(newProduct);

        if (newProduct && categoryId) {
            await addProductToCategoryService(categoryId, newProduct.id);
        }

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const deletedProduct = await deleteProductByIdService(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};