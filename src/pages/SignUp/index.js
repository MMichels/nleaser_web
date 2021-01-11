import React, {
    Component
} from "react";
import {Link, withRouter} from "react-router-dom";
import { useForm } from "react-hook-form";

import Logo from "../../assets/airbnb-logo.svg"

import User from "../../services/user";

import {
    Form,
    Container
} from "./styles.js";



class SingUp extends Component {
    constructor(){
        super();
        const {register, handler } = useForm();
    }

    state = {
        email: "",
        password: "",
        name: "",
        error: ""
    };

    handleSingup = async e => {
        e.preventDefault();
        const { email, password, name } = this.state;
        if(!email || !password || !name){
            this.setState({error: "Preencha todos os dados"});
        }else{
            await User.create(email, password, name).then(
                user => {
                    this.props.history.push("/");
                }).catch(
                    (err) => {
                    this.setState({error: err.error});
                });
        }
    };

    render() {
        return ( 
            <Container>
                <Form onSubmit = {this.handleSingup}>
                    <img src = { Logo } alt = "Logo da aplicação" /> 
                    { this.state.error && <p> {this.state.error} </p> }
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
                    <button type="submit">Inscrever-se</button>
                    <hr />
                    <Link to="/">Fazer login</Link>
                </Form>
            </Container>
        )
    }
}

export default withRouter(SingUp);