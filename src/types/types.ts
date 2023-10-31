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