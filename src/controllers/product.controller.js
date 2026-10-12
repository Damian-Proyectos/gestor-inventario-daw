// src/controllers/product.controller.js

import { pool } from '../config/db.js';

// Controlador para obtener todos los productos desde MySQL
export const obtenerProductos = async (req, res) => {
  try {
    // 1. Consultamos la tabla 'products' en MySQL usando async/await
    const [rows] = await pool.query('SELECT * FROM products');

    // 2. Respondemos con éxito y enviamos los registros reales encontrados
    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    // 3. Control de errores limpio si falla la base de datos
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los productos de la base de datos',
      error: error.message
    });
  }
};