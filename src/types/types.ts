export interface LoginFormType {
    email: string;
    password: string;
}

export interface LoginResponseType {
    token: string;
}

export interface UserDataType {
    name: string;
    second_name: string;
    email: string;
}

export interface JWTValidationResponseType {
    data: UserDataType;
    status: boolean;
}

export interface InventarioType {
    id: number;
    fecha: string;
    id_almacen: number;
    unidades:number;
}
export interface AlmacenType {
    id: number;
    nombre: string;
    precio_unidad: number;
}
export interface PagosType {
    id: number;
    nombre_pedido: string;
    id_producto: number;
    metodo_pago: string;
    precio: number;
    fecha: string;
}