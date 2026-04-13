export interface DinningRoomSelectedNode {
  id: string;
  label: string;
  type: "mesa" | "silla";
  parentTable?: string;
}