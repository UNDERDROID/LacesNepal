import express from 'express';
import { getProducts, createProduct, deleteProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', createProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;