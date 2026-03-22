export interface InventoryData {
  id: number;
  nombre: string;
  tipo: string;
  unidades: string;
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
  fecha_registro: string;
}

export interface InventoryResponse {
  success: boolean;
  message: string;
  data: InventoryData[];
}

export interface InventoryViewState {
    loading: boolean;
    message: string;
    data: InventoryData[] | null;
    error: string | null;
}