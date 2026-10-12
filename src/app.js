// src/app.js
import 'dotenv/config'; // <-- ¡Esta debe ser la línea 1 absoluta!
import express from 'express';
import productRoutes from './routes/product.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
});