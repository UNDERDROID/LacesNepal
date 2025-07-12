import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/product.controller.js';
import { hasPermission } from '../middleware/permission.middleware.js';


const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', authenticate, hasPermission("Create Posts"), createProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);

export default productRouter;