import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import UserService from "../../../services/user.service";
import { login, logout } from "../../../services/auth";

import { BackgroundComponent } from '../../../components/Background';
import { HeaderComponent } from "../../../components/Header";
import { LoadingSpinnerComponent } from "../../../components/loading";
import formStyles from "../../../styles/formStyles.module.scss";
import Swal from "sweetalert2";



class LoginComponent extends Component<RouteComponentProps> {
  userService = new UserService();
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    if(query.get("logout")){
      logout();
    }
    if(query.get("error")){
      this.setState({error: query.get("error")});
    }
  }

  handleSigIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) 
    {
      this.setState({ error: "Todos os campos precisam ser preenchidos" });
    } 
    else 
    {
      this.setState({ loading: true, error: null });
      await this.userService.login(email, password).then(
        (resp) => 
        {
          this.setState({ loading: false });
          Swal.fire({
            title: "Leia com atenção!",
            html: `<div>
                      <p>O NLEaser é uma ferramenta de analise de dados em fase Alpha de desenvolvimento</p><br />
                      <p>No momento, ainda não temos uma politica de <b>LGPD</b>, tampouco um termo de <b>politica de proteção de dados</b></p><br />
                      <p>A pesar disso, garantimos que todos os DADOS DE TEXTO que são ENVIADOS pelo usuário são protegidos com criptografia em um banco de dados MongoDB</p><br />
                      <p><b>NÃO</b> recomendamos que envie DADOS SENSÍVEIS para analise na ferramenta, POR ENQUANTO</p><br />
                      <p>Todos os dados enviados a plataforma podem ser excluídos a qualquer momento, e serão excluídos antes do lançamento oficial da ferramenta</p><br />                                  
                    </div>`,
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Estou ciente, Continuar",
            showCancelButton: true,
            cancelButtonText: "Voltar",
            showLoaderOnConfirm: true,            
            reverseButtons: true,
            position: 'top'
          }).then(result => {
            if(result.isConfirmed){              
              login(resp.access_token);
              this.props.history.push("/dashboard/datafiles");
            }else{
              this.props.history.push("/");
            }
          })
        },
        (err) => 
        {
          this.setState({ loading: false });
          if (err.error) this.setState({ error: err.error });
          else 
          {
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
        <form className={formStyles.accessFormStyled} onSubmit={(e) => this.handleSigIn(e)}>
          <p className={formStyles.titleStyled}>
            Realizar Login
          </p>
          <p className={formStyles.descriptionStyled}>
            Preencha seu usuário e senha para acessar seu dashboard
          </p>
          {
            this.state.error &&
            <p className={formStyles.errorStyled}>
              {this.state.error}
            </p>
          }
          <input className={formStyles.textInputStyled}
            type="email"
            placeholder="Email do usuário"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input className={formStyles.textInputStyled}
            type="password"
            placeholder="Senha"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button className={formStyles.submitButtonStyled} type="submit">
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
