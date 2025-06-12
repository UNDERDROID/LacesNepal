import express from 'express';
import { getProducts, createProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', createProduct);

export default productRouter;