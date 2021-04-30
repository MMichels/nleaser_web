import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import UserService from "../../../services/user.service";
import { login } from "../../../services/auth";

import { BackgroundComponent } from '../../../components/Background';
import { HeaderComponent } from "../../../components/Header";
import { LoadingSpinnerComponent } from "../../../components/loading";
import accessFormStyles from "../styles.module.scss";



class LoginComponent extends Component<RouteComponentProps> {
  userService = new UserService();
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  handleSigIn = async (e) => {
    console.log('handleSigIn');
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Todos os campos precisam ser preenchidos" });
    } else {
      this.setState({ loading: true });
      await this.userService.login(email, password).then(
        (resp) => {
          this.setState({ loading: false });
          login(resp.accessToken);
          this.props.history.push("/dashboard");
        },
        (err) => {
          this.setState({ loading: false });
          if (err.error) this.setState({ error: err.error });
          else {
            console.log("Erro ao realizar o login: ", err);
            this.setState({
              error:
                "Houve um problema ao realizar o login, tente novamente mais tarde.",
            });
          }
        }
      );
    }
  };

  render() {
    return (
      <BackgroundComponent>
        <HeaderComponent />
        <form className={accessFormStyles.accessFormStyled} onSubmit={(e) => this.handleSigIn(e)}>
          <p className={accessFormStyles.titleStyled}>
            Realizar Login
          </p>
          {
            this.state.error &&
            <p className={accessFormStyles.errorStyled}>
              {this.state.error}
            </p>
          }
          <input className={accessFormStyles.textInputStyled}
            type="email"
            placeholder="Email do usuário"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input className={accessFormStyles.textInputStyled}
            type="password"
            placeholder="Senha"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button className={accessFormStyles.submitButtonStyled} type="submit">
            {!this.state.loading && <p>Entrar</p>}
            {this.state.loading && <LoadingSpinnerComponent />}
          </button>
          <hr />
          <Link to="/cadastro">Cadastre-se</Link>
        </form>
      </BackgroundComponent>
    );
  }
}

export const LoginPage = withRouter(LoginComponent);
