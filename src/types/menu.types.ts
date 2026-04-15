export interface MenuProduct {
    id?: number;
    nombre_producto: string;
    precio_producto: number;
    tiempo_produccion_min: number;
    dificultad: string;
    imagen: string;
    cantidad?: number;
}

export interface MenuResponse {
    success: boolean;
    message: string;
    data: MenuProduct[];
}

export interface MenuViewState {
    loading: boolean;
    message: string;
    data: MenuProduct[] | null;
    error: string | null;
}