export interface StockData {
    id: number;
    nombre_producto: string;
    precio_producto: number;
    tiempo_produccion_min: number;
    dificultad: string;
}

export interface StockResponse {
  success: boolean;
  message: string;
  data: StockData[];
}

export interface StockViewState {
    loading: boolean;
    message: string;
    data: StockData[] | null;
    error: string | null;
}