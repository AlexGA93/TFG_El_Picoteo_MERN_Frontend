export interface DinningRoomOrderItem {
  id?: number;
  nombre_producto: string;
  precio_producto: number;
  cantidad: number;
}

export interface DinningRoomOrderSnapshot {
  tableId: string;
  tableName: string;
  totalPrice: number;
  createdAt: string;
  items: DinningRoomOrderItem[];
}

export interface DinningRoomSelectedNode {
  id: string;
  label: string;
  type: "mesa" | "silla";
  parentTable?: string;
  currentOrder?: DinningRoomOrderSnapshot;
}
