import { FormControl } from "@angular/forms";

export type Units = 'kg' | 'litros' | 'unidad' | 'metros' | 'gramos';

export type Types = 'Carnes'| 'Pescados'| 'Verduras'| 'Frutas'| 'Especias'| 'Lacteos'| 'Cereales'| 'Aceites'| 'Bebidas';
export interface InventoryData {
  id: number;
  nombre: string;
  tipo: Types;
  unidades: Units;
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

export interface InventoryReactiveFormModel {
  nombre: FormControl<string>;
  tipo: FormControl<Types>;
  n_unidades: FormControl<number>;
  unidades: FormControl<Units>;
  proveedor: FormControl<string>;
  precio_unidad: FormControl<number>;
}

export interface InventoryCreateDTO {
  nombre: string;
  tipo: Types;
  unidades: Units;
  n_unidades: number;
  proveedor: string;
  precio_unidad: number;
}
export interface CreateInventoryItemResponse {
    statusCode: number;
    message: string;
    data?: InventoryData;
    details?: unknown;
}

export interface DeleteInventoryItemResponse {
  success: boolean;
  message: string;
  data?: any;
}