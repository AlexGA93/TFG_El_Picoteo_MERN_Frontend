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

// (Removed unused AlertConfig to reduce unused-type warnings)

export type GLobalTableResponseType = GlobalAlmacenResponseType | GLobalRecipesResponseType | GlobalStoreResponseType;

// INVENTORY
export interface GlobalAlmacenResponseType {
    data: Inventory[];
}

export interface Inventory {
    nombre:        string;
    unidades:      number;
    precio_unidad: number;
    precio_total:  number;
    fecha?:        Date;
}

// STORE
export interface GlobalStoreResponseType{
    data: Store[];
}

export interface Store {
    id:              number;
    nombre:          string;
    precio_producto: number;
}

// RECIPES
export interface GLobalRecipesResponseType {
    data: Recipe[]
}

export interface Recipe {
    id:          number;
    id_producto: number;
    id_almacen:  number;
    cantidad:    number;
}

// (Removed unused BaseType to reduce unused-type warnings)

export interface AddNewInventoryType {
    name:     string;
    price:    number;
    quantity: number;
}

export interface AddNewInventoryResponseType {
    status: string;
    message: string;
}

// Generic API response wrapper: success with data or failure with error info
export type ApiResponse<T> =
    | { ok: true; data: T }
    | { ok: false; error: { status: number; message: string; raw?: any } };

// Specific alias for login calls
export type LoginResult = ApiResponse<LoginResponseType>;
