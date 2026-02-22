import { SectiondNavbarStructureType } from "../../types/general.types";

type GlobalIconsColorsType = {
  [key: string]: {
    icon: string;
    class: string;
  };
};

export const navbarStructures: SectiondNavbarStructureType = {
  dashboard: {
    title: "dashboard el picoteo",
    subtitle: "Gestion Integral de Cocina",
    icon: "chef-hat",
    class: "dashboard-navar-icon",
  },
};

export const GlobalIconsColors: GlobalIconsColorsType = {
  recipes: {
    icon: "chef-hat",
    class: "green-chef-hat",
  },
  stock: {
    icon: "package",
    class: "blue-package",
  },
  inventory: {
    icon: "eye",
    class: "purple-eye",
  },
  sales: {
    icon: "banknote-arrow-up",
    class: "green-banknote-arrow-up",
  },
  bills: {
    icon: "banknote-arrow-down",
    class: "red-banknote-arrow-down",
  }
};