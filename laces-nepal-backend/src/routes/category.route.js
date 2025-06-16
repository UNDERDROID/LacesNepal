import express from 'express';
import { createCategory, getAllCategories } from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories);

export default categoryRouter;