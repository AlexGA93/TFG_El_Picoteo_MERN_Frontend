export const getContent = (flag: string) => localStorage.getItem(flag);

export const insertContent = (flag: string, payload: string) => localStorage.setItem(flag, payload);

export const deleteContent = (flag: string) => localStorage.removeItem(flag);