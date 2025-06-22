import express from 'express';
import cors from 'cors';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js';
import userRouter from './routes/user.route.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
