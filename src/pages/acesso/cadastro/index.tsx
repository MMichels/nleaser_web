import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import UserService from "../../../services/user.service";


import { LoadingSpinnerComponent } from "../../../components/loading";
import formStyles from "../../../styles/formStyles.module.scss";
import { Button, Container, Form } from "react-bootstrap";

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
            <Container className={        
                `${formStyles.accessFormStyled} 
                d-flex flex-column 
                justify-content-center align-items-center 
                bg-black bg-opacity-75
                m-auto`
              }
            >             
                <p className={`${formStyles.textFormTitle} text-center fs-4 fw-bold m-2`}>
                    Realizar Cadastro
                </p>
                <p className={formStyles.descriptionStyled + " text-center my-3 mx-auto "}>
                    Preencha todas as informações abaixo para realizar seu cadastro na plataforma
                </p>
                {
                    this.state.error &&
                    <p className="text-danger text-center m-2">
                        {this.state.error}
                    </p>
                }
                <hr />
                <Form 
                  className="w-100 d-flex flex-column"
                  onSubmit={this.handleCadastro}
                >
                    <Form.Group>
                        <Form.Control className={formStyles.textInputStyled + " text-center my-1 mx-auto p-0 px-2"}
                            type="text"
                            placeholder="Nome"
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                        <Form.Control className={formStyles.textInputStyled + " text-center my-1 mx-auto p-0 px-2"}
                            type="text"
                            placeholder="Email"
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                        <Form.Control className={formStyles.textInputStyled + " text-center my-1 mx-auto p-0 px-2"}
                            type="password"
                            placeholder="Senha"
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </Form.Group>                    
                    <Button className={formStyles.submitButtonStyled + " text-white fs-5 mt-3 m-auto"} type="submit">
                        {!this.state.loading && <p>Inscrever-se</p>}
                        {this.state.loading && <LoadingSpinnerComponent />}
                    </Button>
                </Form>
                <hr />
                <Link to="/login">Fazer login</Link>
            </Container>
        )
    }
}

export const CadastroPage = withRouter(CadastroComponent);