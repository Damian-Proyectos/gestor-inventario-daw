// src/controllers/product.controller.js

// Controlador para obtener todos los productos

export const obtenerProductos = async(req, res) => {
    try{
        // 1. Simulación de datos (Mock de base de datos)
        const productos = [
            {id: 1, nombre: 'Zapatillas Deportivas', precio: 59.99, color: 'Blanco', categoria: 'Calzado'},
            {id: 2, nombre: 'Camiseta Algodón', precio: 19.99, color: 'Negro', categoria: 'Ropa'}
        ];
        // 2. Respuesta exitosa con código 200 (OK)
        return res.status(200).json({
            success: true,
            data: productos
        });    
    } catch (error){
        // 3. Manejo de errores con código 500 (Internal Server Error)
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: error.message
        });
    }
}