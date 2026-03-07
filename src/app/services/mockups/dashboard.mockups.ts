/**
 * Dashboard Mockups - Datos de Recetas, Stock e Inventario
 * Basados en las tablas: Ingredientes, Stock, Inventario
 */

import {
  DashboardFinancePeriodData,
  DashboardInventory,
  DashboardRecipe,
  DashboardStock,
} from "../../../types/database.types";

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
    nombre_producto: "Tomates",
    precio_producto: 1.5,
    cantidad: 30, 
    unidad: "kg",
  },
  {
    id: 2,
    nombre_producto: "Aceite de Oliva",
    precio_producto: 8,
    cantidad: 1, 
    unidad: "litros",
  },
  {
    id: 3,
    nombre_producto: "Arroz Bomba",
    precio_producto: 15,
    cantidad: 1, 
    unidad: "kg",
  },
  {
    id: 4,
    nombre_producto: "Garbanzos",
    precio_producto: 3.5,
    cantidad: 1, 
    unidad: "gramos",
  },
  {
    id: 5,
    nombre_producto: "Lechuga",
    precio_producto: 2.75,
    cantidad: 11, 
    unidad: "kg",
  },
  {
    id: 6,
    nombre_producto: "Naranjas",
    precio_producto: 3.2,
    cantidad: 108,
    unidad: "kg",
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
  {
    tipo: "Carnes",
    items: [
      {
        id: 11,
        nombre: "Pollo",
        tipo: "Carnes",
        unidades: "kg",
        n_unidades: 95,
        proveedor: "Carnicas del Norte",
        precio_unidad: 4.2,
        fecha_registro: "2025-01-24 08:00:00",
      },
      {
        id: 12,
        nombre: "Ternera",
        tipo: "Carnes",
        unidades: "kg",
        n_unidades: 55,
        proveedor: "Carnicas Premium",
        precio_unidad: 8.5,
        fecha_registro: "2025-01-24 08:30:00",
      },
      {
        id: 13,
        nombre: "Cerdo",
        tipo: "Carnes",
        unidades: "kg",
        n_unidades: 70,
        proveedor: "Granja Iberica",
        precio_unidad: 5.8,
        fecha_registro: "2025-01-24 09:00:00",
      },
    ],
    totalItems: 220,
    totalPrice: 1272.5,
  },
  {
    tipo: "Frutas",
    items: [
      {
        id: 14,
        nombre: "Manzana",
        tipo: "Frutas",
        unidades: "kg",
        n_unidades: 140,
        proveedor: "Frutas del Valle",
        precio_unidad: 1.2,
        fecha_registro: "2025-01-25 09:15:00",
      },
      {
        id: 15,
        nombre: "Platano",
        tipo: "Frutas",
        unidades: "kg",
        n_unidades: 95,
        proveedor: "Frutas Tropic",
        precio_unidad: 1.1,
        fecha_registro: "2025-01-25 09:45:00",
      },
      {
        id: 16,
        nombre: "Naranja",
        tipo: "Frutas",
        unidades: "kg",
        n_unidades: 60,
        proveedor: "Citricos Iberia",
        precio_unidad: 1.4,
        fecha_registro: "2025-01-25 10:20:00",
      },
    ],
    totalItems: 295,
    totalPrice: 356.5,
  },
];

// ============ MOCKUP DE VENTAS (Resumen por periodos) ============
export const mockVentasData: DashboardFinancePeriodData[] = [
  { periodo: "Hoy", totalDinero: 1240.5, numeroOrdenes: 42 },
  { periodo: "Ayer", totalDinero: 1098.3, numeroOrdenes: 37 },
  { periodo: "Semana Pasada", totalDinero: 7310.9, numeroOrdenes: 248 },
  { periodo: "Mes Pasado", totalDinero: 31240.75, numeroOrdenes: 1032 },
  { periodo: "Ultimo Trimestre", totalDinero: 94680.4, numeroOrdenes: 3157 },
  { periodo: "Ultimo Yr", totalDinero: 378920.6, numeroOrdenes: 12684 },
];

// ============ MOCKUP DE GASTOS (Resumen por periodos) ============
export const mockGastosData: DashboardFinancePeriodData[] = [
  { periodo: "Hoy", totalDinero: 580.2, numeroOrdenes: 19 },
  { periodo: "Ayer", totalDinero: 612.9, numeroOrdenes: 21 },
  { periodo: "Semana Pasada", totalDinero: 4018.7, numeroOrdenes: 136 },
  { periodo: "Mes Pasado", totalDinero: 17295.45, numeroOrdenes: 579 },
  { periodo: "Ultimo Trimestre", totalDinero: 51842.2, numeroOrdenes: 1731 },
  { periodo: "Ultimo Yr", totalDinero: 207355.9, numeroOrdenes: 6910 },
];

// ============ MOCKUP UNIFICADO DE DASHBOARD ============
export const mockDashboardData = {
  recipes: mockRecipesData,
  stock: mockStockData,
  inventory: mockInventarioGrouped,
  ventas: mockVentasData,
  gastos: mockGastosData,
};
