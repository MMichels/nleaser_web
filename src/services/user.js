import api from "./api";


export default class UserService {
    constructor() {
        this.api = api;
    }

    /**
     * Realiza o request para criar um novo usuário no backend
     * @param {string} email Email do usuario
     * @param {string} password Senha
     * @param {string} name Nome do usuario
     */
    create(email, password, name) {
        return this.api.post("/user", {
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
    login(email, password){
        return this.api.post("/login",  {
            email, password
        });
    }

}