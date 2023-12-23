export const TOKEN_KEY = "token_dynastyu";

export const getToken = (): string | null | undefined => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(TOKEN_KEY);
  }
};

export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
};

export const destroyToken = (): void => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_KEY);
  }
};
