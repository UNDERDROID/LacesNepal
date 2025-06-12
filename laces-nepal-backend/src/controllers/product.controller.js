import { getPaginatedProducts, createNewProduct } from "../services/product.service.js";
export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const products = await getPaginatedProducts(page, limit);

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

        const newProduct = await createNewProduct({
            name,
            description,
            price,
            imageUrl,
            stock,
            categoryId,
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};