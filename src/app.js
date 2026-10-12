// src/app.js

import express from "express";
import productRoutes from './routes/product.routes.js';

// 1. Inicializamos la aplicación de Express
const app = express();
const PORT = 3000;

// 2. Middleware fundamental: Permite a Express leer y entender datos en formato JSON en las peticiones POST/PUT
app.use(express.json());

// 3. Montar las rutas de productos bajo el prefijo /api/products
// Significa que cualquier ruta en product.routes.js empezará pro /api/products
app.use('/api/products', productRoutes);

// 4. Poner el servidor a escuchar peticiones en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo con éxito en http://localhost:${PORT}`);
});