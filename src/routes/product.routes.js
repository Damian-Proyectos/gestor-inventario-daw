// src/controllers/product.controller.js

import {Router} from "express";
import { obtenerProductos} from "../controllers/product.controller.js";

const router = Router();

// Endpoint GET: /api/products
router.get("/", obtenerProductos);

export default router;