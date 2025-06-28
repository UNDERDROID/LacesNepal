import express from 'express';
import {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', createProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);

export default productRouter;