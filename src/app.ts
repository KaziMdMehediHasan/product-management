import express from 'express';
import { ProductRoutes } from './module/products/product.route';
import { OrderRoutes } from './module/orders/orders.route';


const app = express();

// parsers
app.use(express.json());
// for products
app.use('/api/products', ProductRoutes);
// for orders
app.use('/api/orders', OrderRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Assignment-2 Server');
})

export default app;