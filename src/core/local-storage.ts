const TOKEN = "token";

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN);
};
