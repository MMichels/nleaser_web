import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import UserService from "../../../services/user";

import { BackgroundComponent } from '../../../components/Background';
import { HeaderComponent } from "../../../components/Header";

import AccessFormComponent from "../components/access-form";
import TextInputComponent from "../components/text-input";
import SubmitButtonComponent from "../components/submit-button";


class CadastroComponent extends Component {
    userService = new UserService();
    state = {
        email: "",
        password: "",
        name: "",
        error: "", 
        loading: false
    };

    handleCadastro(e) {
        e.preventDefault();
        const { email, password, name } = this.state;
        if(!email || !password || !name){
            this.setState({error: "Preencha todos os dados"});
        }else{
            this.setState({loading: true});
            this.userService.create(email, password, name)
                .then(() => {                    
                    this.setState({loading: true});
                    this.props.history.push("/");
                })
                .catch((err) => {                    
                    this.setState({loading: true});
                    this.setState({error: err.error});
                });
        }        
    }

    render() {
        return ( 
            <BackgroundComponent>
                <HeaderComponent />
                <form 
                    //title="Realizar Cadastro"
                    //description="Preencha todas as informações abaixo para realizar seu cadastro na plataforma"
                    onSubmit={this.handleCadastro}
                >
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="text"
                        placeholder="Nome"
                        onChange = {e => this.setState({name: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        onChange = {e => this.setState({email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange = {e => this.setState({password: e.target.value})}
                    />
                    <button type="submit" loading={this.state.loading} text="Inscrever-se"/>
                    <hr />
                    <Link to="/login">Fazer login</Link>
                </form>
            </BackgroundComponent>
        )
    }
}

export const CadastroPage = withRouter(CadastroComponent);