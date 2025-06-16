import { createCategoryService, getAllCategoriesService } from "../services/category.service.js";

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