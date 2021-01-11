import api from "./api";


export default class User {
    constructor() {
        this.api = api;
    }

    /**
     * Realiza o request para criar um novo usuário no backend
     * @param {string} email Email do usuario
     * @param {string} password Senha
     * @param {string} name Nome do usuario
     */
    static async create(email, password, name) {
        return await api.post("/user", {
            email,
            password,
            name
        });
    }

    /**
     * Realiza o login do usuario na API, retorna o Token JWT.
     * @param {string} email Email do usuario
     * @param {string} password senha do usuário
     */
    static async login(email, password){
        return await api.post("/login",  {
            email, password
        });
    }

}