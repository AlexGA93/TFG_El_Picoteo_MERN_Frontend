export type PaymentMethod = "efectivo" | "tarjeta" | "bizum";

export interface Sale {
  id: number;
  fecha_venta: string;
  metodo_pago: PaymentMethod;
  id_usuario: number;
  total_venta: number;
}

export interface SaleItem {
  id: number;
  id_sale: number;
  id_stock: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface Purchase {
  id: number;
  fecha_compra: string;
  proveedor: string;
  id_usuario: number;
  total_compra: number;
}

export interface PurchaseItem {
  id: number;
  id_purchase: number;
  id_inventory: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SaleTransactionItemPayload {
  id_stock: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface SaleTransactionPayload {
  fecha_venta: string;
  metodo_pago: PaymentMethod;
  id_usuario: number;
  total_venta: number;
  items: SaleTransactionItemPayload[];
  table?: {
    id: string;
    name: string;
  };
}
