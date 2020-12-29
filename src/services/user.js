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

}