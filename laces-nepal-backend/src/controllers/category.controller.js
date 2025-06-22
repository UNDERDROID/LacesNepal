import {
    createCategoryService,
    getAllCategoriesService,
    addProductToCategoryService,
    deleteCategoryService
} from "../services/category.service.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Invalid category name" });
        }

        const category = await createCategoryService(name);
        return res.status(201).json({ message: "Category created successfully", category });

    } catch (error) {
        const message = error.message === "Category already exists"
            ? error.message
            : "Internal server error";
        const status = error.message === "Category already exists" ? 409 : 500;

        res.status(status).json({ message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoriesService();
        return res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addProductToCategory = async (req, res) => {
    try {
        const { categoryId, productId } = req.body;

        if (!categoryId || !productId) {
            return res.status(400).json({ message: "Category ID and Product ID are required" });
        }

        const category = await addProductToCategoryService(categoryId, productId);
        return res.status(200).json({ message: "Product added to category successfully", category });

    } catch (error) {
        console.error("Error adding product to category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!categoryId) {
            return res.status(400).json({ message: "Category ID is required" });
        }

        const deletedCategory = await deleteCategoryService(categoryId);
        return res.status(200).json({ message: "Category deleted successfully", deletedCategory });

    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}