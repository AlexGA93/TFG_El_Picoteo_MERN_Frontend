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

export interface LocginErrorResponseType {
  success?: boolean;
  errors?: ErrorBodyType[];
  mssg?: string;
}

export interface ErrorBodyType {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}

export interface NavbarStructureType {
  title: string;
  subtitle: string;
  icon: string;
  class: string;
}

export type SectiondNavbarStructureType = {
  [key: string]: NavbarStructureType;
}

export interface GlobalIconsColorsType {
  icon: string;
  class: string;
}

export type GlobalIconsColors = {
  [key: string]: GlobalIconsColorsType;
}