export interface RecipesIngredients {
  id: number;
  id_inventario: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  unidad: string;
}
export interface RecipesData {
  id: number;
  nombre: string;
  precio: number;
  tiempo_produccion_min: number;
  dificultad: string;
  ingredientes: RecipesIngredients[];
}

export interface RecetasResponse {
  success: boolean;
  message: string;
  data: RecipesData[];
}

export interface RecetasViewState {
  loading: boolean;
  message: string;
  data: RecipesData[] | null;
  error: string | null;
}
