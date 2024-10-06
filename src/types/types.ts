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

export interface AlertConfig {
    title?:             string;
    icon?:              string;
    html?:              string;
    showCloseButton?:   boolean;
    showCancelButton?:  boolean;
    focusConfirm?:      boolean;
    confirmButtonText?: string;
    cancelButtonText?:  string;
}

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
    fecha:         Date;
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

export type BaseType = Inventory | Store;