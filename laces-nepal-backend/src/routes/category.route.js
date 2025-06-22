import express from 'express';
import { createCategory, getAllCategories, addProductToCategory } from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.post('/add-product', addProductToCategory);

export default categoryRouter;