import { BaseService } from "./base.service";
import { ILoginInterface } from "../types/user.types";

export default class UserService extends BaseService{

    /**
     * Realiza o request para criar um novo usuário no backend
     * @param {string} email Email do usuário
     * @param {string} password Senha
     * @param {string} name Nome do usuário
     */
    create(email: string, password: string, name: string) {
        return this.api.post("/user", {
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
    login(email: string, password: string): Promise<ILoginInterface> {
        return this.api.post("/login", {
            email, password
        });
    }
}