import { ILoginInterface } from "../types/user.types";
import api from "./api";

export default class UserService {

    /**
     * Realiza o request para criar um novo usuário no backend
     * @param {string} email Email do usuário
     * @param {string} password Senha
     * @param {string} name Nome do usuário
     */
    static async create(email: string, password: string, name: string) {
        return await api.post("/user", {
            email,
            password,
            name
        });
    }

    /**
     * Realiza o login do usuário na API, retorna o Token JWT.
     * @param {string} email Email do usuário
     * @param {string} password senha do usuário
     */
     static async login(email: string, password: string): Promise<ILoginInterface> {
        return await api.post("/login", {
            email, password
        });
    }
}