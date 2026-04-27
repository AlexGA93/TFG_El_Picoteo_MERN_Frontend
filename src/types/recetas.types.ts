export interface RecipesIngredients {
  id: number;
  id_inventario: number;
  id_inventory?: number | string;
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
  url?: string;
  ingredients: RecipesIngredients[];
  imagen?: string;
}

export interface NewRecipePayload {
  nombre: string;
  precio: number;
  tiempo_produccion_min: number;
  dificultad: string;
}

export interface UpdateRecipePayload {
  nombre: string;
  precio: number;
  tiempo_produccion_min: number;
  dificultad: string;
  ingredients: {
    id_inventory: number;
    cantidad: number;
    unidad: string;
  }[];
  url: string;
  imagen?: string;
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
