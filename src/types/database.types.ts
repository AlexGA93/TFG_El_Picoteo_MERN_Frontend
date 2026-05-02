export interface DashboardRecipe {
  id?: number;
  nombre_producto: string;
  tiempo_produccion: string;
  coste: number;
  dificultad: "facil" | "media" | "dificil"
}

export interface DashboardStock {
  id?: number;
  nombre_producto: string;
  precio_producto: number;
  cantidad: number;
  unidad: InventoryItemUnits;
}

export type InventoryItemType = 'Carnes' | 'Pescados' | 'Verduras' | 'Frutas' | 'Especias' | 'Lacteos' | 'Cereales' | 'Aceites' | 'Bebidas';

export type InventoryItemUnits = 'kg' | 'litros' | 'unidad' | 'metros' | 'gramos';

export interface DashboardInventoryItem {
  id?: number;
  nombre: string;
  tipo: InventoryItemType,
  unidades: InventoryItemUnits,
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
  fecha_registro: string;
}

export interface DashboardInventory {
  tipo: string;
  items: DashboardInventoryItem[],
  totalItems: number;
  totalPrice: number;
}

export type DashboardFinancePeriodLabel =
  | "Hoy"
  | "Ayer"
  | "Semana Pasada"
  | "Mes Pasado"
  | "Ultimo Trimestre"
  | "Ultimo Yr";

export interface DashboardFinancePeriodData {
  periodo: DashboardFinancePeriodLabel;
  totalDinero: number;
  numeroOrdenes: number;
}

export interface DashboardIngredients {
  id: number;
  id_producto_stock: number;
  producto: string;
  id_inventory: number;
  ingrediente: string;
  tipo: InventoryItemType;
  cantidades: number;
  unidad: InventoryItemUnits;
  fecha_registro: string;
}

export interface DashboardData {
  recipes: DashboardRecipe[],
  stock: DashboardStock[],
  inventory: DashboardInventory[],
  ingredients: DashboardIngredients[],
  ventas: DashboardFinancePeriodData[],
  gastos: DashboardFinancePeriodData[],
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}
