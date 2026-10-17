// src/controllers/product.controller.js
import { pool } from '../config/db.js';

// 1. Obtener todos los productos (GET)
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Crear un nuevo producto (POST)
export const createProduct = async (req, res) => {
  try {
    const { nombre, precio, color, categoria } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ 
        success: false, 
        message: 'El nombre y el precio son obligatorios.' 
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO products (nombre, precio, color, categoria) VALUES (?, ?, ?, ?)',
      [nombre, precio, color || null, categoria || null]
    );

    res.status(201).json({
      success: true,
      message: 'Producto creado con éxito',
      data: {
        id: result.insertId,
        nombre,
        precio,
        color,
        categoria
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Actualizar un producto existente (PUT)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, color, categoria } = req.body;

    const [result] = await pool.execute(
      'UPDATE products SET nombre = ?, precio = ?, color = ?, categoria = ? WHERE id = ?',
      [nombre, precio, color || null, categoria || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Producto no encontrado.' 
      });
    }

    res.json({
      success: true,
      message: 'Producto actualizado con éxito'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Eliminar un producto (DELETE)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Producto no encontrado.' 
      });
    }

    res.json({
      success: true,
      message: 'Producto eliminado con éxito'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};