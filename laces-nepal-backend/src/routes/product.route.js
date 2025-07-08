import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/product.controller.js';


const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', authenticate, createProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);

export default productRouter;