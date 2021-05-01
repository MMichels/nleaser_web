import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import UserService from "../../../services/user.service";

import { BackgroundComponent } from '../../../components/Background';
import { HeaderComponent } from "../../../components/Header";
import { LoadingSpinnerComponent } from "../../../components/loading";
import formStyles from "../../../styles/formStyles.module.scss";

class CadastroComponent extends Component<RouteComponentProps> {
    userService = new UserService();
    state = {
        email: "",
        password: "",
        name: "",
        error: "",
        loading: false
    };

    handleCadastro = async (e) => {
        e.preventDefault();
        const { email, password, name } = this.state;
        if (!email || !password || !name) {
            this.setState({ error: "Preencha todos os dados" });
        } else {
            this.setState({ loading: true });
            this.userService.create(email, password, name)
                .then(() => {
                    this.setState({ loading: true });
                    this.props.history.push("/");
                })
                .catch((err) => {
                    this.setState({ loading: true });
                    this.setState({ error: err.error });
                });
        }
    }

    render() {
        return (
            <BackgroundComponent>
                <HeaderComponent />
                <form className={formStyles.accessFormStyled} onSubmit={this.handleCadastro}>
                    <p className={formStyles.titleStyled}>
                        Realizar Cadastro
                    </p>
                    <p className={formStyles.descriptionStyled}>
                        Preencha todas as informações abaixo para realizar seu cadastro na plataforma
                    </p>
                    {
                        this.state.error &&
                        <p className={formStyles.errorStyled}>
                            {this.state.error}
                        </p>
                    }
                    <input className={formStyles.textInputStyled}
                        type="text"
                        placeholder="Nome"
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                    <input className={formStyles.textInputStyled}
                        type="text"
                        placeholder="Email"
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <input className={formStyles.textInputStyled}
                        type="password"
                        placeholder="Senha"
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <button className={formStyles.submitButtonStyled} type="submit">
                        {!this.state.loading && <p>Inscrever-se</p>}
                        {this.state.loading && <LoadingSpinnerComponent />}
                    </button>
                    <hr />
                    <Link to="/login">Fazer login</Link>
                </form>
            </BackgroundComponent>
        )
    }
}

export const CadastroPage = withRouter(CadastroComponent);