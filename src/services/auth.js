export const TOKEN_KEY = "@nleaser-Token";

/**
 * Verifica se o usuário esta autenticado no sistema
 */

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

/**
 * Retorna o token do usuário salvo no localstorage da aplicacao
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * Salva o token de usuário no localstorage
 * @param {string} token Token retornado pela API ao realizar o login
 */
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Realiza o logout do usuário removendo o token do localstorage
 */
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};