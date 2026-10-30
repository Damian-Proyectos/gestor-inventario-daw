import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de productos
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});