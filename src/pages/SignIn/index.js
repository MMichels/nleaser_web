import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/airbnb-logo.svg";

import UserService from "../../services/user";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  userService = new UserService();
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleSigIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Todos os campos precisam ser preenchidos" });
    } else {
      await this.userService.login(email, password).then(
        (resp) => {
          login(resp.access_token);
          this.props.history.push("/dashboard");
        },
        (err) => {
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
      <Container>
        <Form onSubmit={this.handleSigIn}>
          <img src={Logo} alt="NLEaser Logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Email do usuário"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Cadastre-se</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
