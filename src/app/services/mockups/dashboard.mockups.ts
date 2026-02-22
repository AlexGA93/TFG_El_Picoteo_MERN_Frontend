/**
 * Dashboard Mockups - Datos de Recetas, Stock e Inventario
 * Basados en las tablas: Ingredientes, Stock, Inventario
 */

import { DashboardInventory, DashboardRecipe, DashboardStock } from "../../../types/database.types";

// ============ MOCKUP DE RECETAS (Información básica) ============
export const mockRecipesData: DashboardRecipe[] = [
  {
    nombre_producto: "Pan casero",
    tiempo_produccion: "45 min",
    coste: 1.5,
    dificultad: "facil",
  },
  {
    nombre_producto: "Bizcocho de vainilla",
    tiempo_produccion: "60 min",
    coste: 8,
    dificultad: "media",
  },
  {
    nombre_producto: "Tarta de chocolate",
    tiempo_produccion: "90 min",
    coste: 15,
    dificultad: "dificil",
  },
  {
    nombre_producto: "Empanada de pollo",
    tiempo_produccion: "50 min",
    coste: 3.5,
    dificultad: "media",
  },
  {
    nombre_producto: "Ensalada mixta",
    tiempo_produccion: "15 min",
    coste: 5.5,
    dificultad: "facil",
  },
  {
    nombre_producto: "Smoothie de manzana",
    tiempo_produccion: "10 min",
    coste: 3,
    dificultad: "facil",
  },
  {
    nombre_producto: "Pizza margarita",
    tiempo_produccion: "75 min",
    coste: 9,
    dificultad: "media",
  },
  {
    nombre_producto: "Croquetas",
    tiempo_produccion: "55 min",
    coste: 6,
    dificultad: "dificil",
  },
  {
    nombre_producto: "Sandwich vegetal",
    tiempo_produccion: "20 min",
    coste: 4.5,
    dificultad: "facil",
  },
  {
    nombre_producto: "Tarta de queso",
    tiempo_produccion: "120 min",
    coste: 14,
    dificultad: "dificil",
  },
];

// ============ MOCKUP DE STOCK (Primeros 4 productos) ============
export const mockStockData: DashboardStock[] = [
  {
    id: 1,
    nombre_producto: "Pan casero",
    precio_producto: 1.5,
  },
  {
    id: 2,
    nombre_producto: "Bizcocho de vainilla",
    precio_producto: 8,
  },
  {
    id: 3,
    nombre_producto: "Tarta de chocolate",
    precio_producto: 15,
  },
  {
    id: 4,
    nombre_producto: "Empanada de pollo",
    precio_producto: 3.5,
  },
];

// ============ MOCKUP DE INVENTARIO (Agrupado por tipo) ============
export const mockInventarioGrouped: DashboardInventory[] = [
  {
    tipo: "Cereales",
    items: [
      {
        id: 1,
        nombre: "Harina",
        tipo: "Cereales",
        unidades: "kg",
        n_unidades: 120,
        proveedor: "Molinos SA",
        precio_unidad: 0.8,
        fecha_registro: "2025-01-10 09:30:00",
      },
      {
        id: 19,
        nombre: "Arroz",
        tipo: "Cereales",
        unidades: "kg",
        n_unidades: 180,
        proveedor: "Molinos SA",
        precio_unidad: 1.1,
        fecha_registro: "2025-01-28 14:00:00",
      },
      {
        id: 20,
        nombre: "Quinoa",
        tipo: "Cereales",
        unidades: "kg",
        n_unidades: 30,
        proveedor: "SuperCereales",
        precio_unidad: 3.5,
        fecha_registro: "2025-01-28 14:10:00",
      },
      {
        id: 25,
        nombre: "Harina de maíz",
        tipo: "Cereales",
        unidades: "kg",
        n_unidades: 70,
        proveedor: "Molinos SA",
        precio_unidad: 0.95,
        fecha_registro: "2025-01-31 09:00:00",
      },
    ],
    totalItems: 400,
    totalPrice: 1093.5,
  },
  {
    tipo: "Lacteos",
    items: [
      {
        id: 2,
        nombre: "Leche",
        tipo: "Lacteos",
        unidades: "litros",
        n_unidades: 250,
        proveedor: "Lacteos del Sur",
        precio_unidad: 0.6,
        fecha_registro: "2025-01-12 11:00:00",
      },
      {
        id: 3,
        nombre: "Huevos",
        tipo: "Lacteos",
        unidades: "unidad",
        n_unidades: 500,
        proveedor: "Granja Los Pinos",
        precio_unidad: 0.1,
        fecha_registro: "2025-01-15 08:45:00",
      },
      {
        id: 5,
        nombre: "Mantequilla",
        tipo: "Lacteos",
        unidades: "gramos",
        n_unidades: 5000,
        proveedor: "Lacteos del Norte",
        precio_unidad: 0.005,
        fecha_registro: "2025-01-20 10:00:00",
      },
      {
        id: 21,
        nombre: "Queso",
        tipo: "Lacteos",
        unidades: "kg",
        n_unidades: 45,
        proveedor: "Lacteos del Norte",
        precio_unidad: 10,
        fecha_registro: "2025-01-29 15:00:00",
      },
    ],
    totalItems: 4795,
    totalPrice: 776.5,
  },
  {
    tipo: "Pescados",
    items: [
      {
        id: 7,
        nombre: "Merluza",
        tipo: "Pescados",
        unidades: "kg",
        n_unidades: 40,
        proveedor: "Pesquera Norte",
        precio_unidad: 6,
        fecha_registro: "2025-01-22 07:30:00",
      },
      {
        id: 8,
        nombre: "Salmón",
        tipo: "Pescados",
        unidades: "kg",
        n_unidades: 22,
        proveedor: "Mariscos del Sur",
        precio_unidad: 9,
        fecha_registro: "2025-01-22 09:00:00",
      },
    ],
    totalItems: 62,
    totalPrice: 438,
  },
  {
    tipo: "Verduras",
    items: [
      {
        id: 9,
        nombre: "Tomate",
        tipo: "Verduras",
        unidades: "kg",
        n_unidades: 180,
        proveedor: "Huerto Feliz",
        precio_unidad: 0.9,
        fecha_registro: "2025-01-23 10:00:00",
      },
      {
        id: 10,
        nombre: "Lechuga",
        tipo: "Verduras",
        unidades: "unidad",
        n_unidades: 90,
        proveedor: "Huerto Feliz",
        precio_unidad: 0.5,
        fecha_registro: "2025-01-23 10:05:00",
      },
    ],
    totalItems: 270,
    totalPrice: 207,
  },
];

// ============ MOCKUP UNIFICADO DE DASHBOARD ============
export const mockDashboardData = {
  recipes: mockRecipesData,
  stock: mockStockData,
  inventory: mockInventarioGrouped,
};
