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

export interface GlobalAlmacenResponseType {
    data: Datum[];
}

export interface Datum {
    nombre:        string;
    unidades:      number;
    precio_unidad: number;
    precio_total:  number;
    fecha:         Date;
}
