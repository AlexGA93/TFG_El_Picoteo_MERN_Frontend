export const saveToLocalStorage = (key: string, payload: string): void => localStorage.setItem(key, payload);

export const getFromLocalStorage = (key: string): string => localStorage.getItem(key) || "";

export const deleteFromLocalStorage = (key: string): void => localStorage.removeItem(key);