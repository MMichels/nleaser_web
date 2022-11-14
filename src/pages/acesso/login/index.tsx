import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { LoadingSpinnerComponent } from "../../../components/loading";
import formStyles from "../../../styles/formStyles.module.scss";
import Swal from "sweetalert2";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthenticationContext";



const LoginComponent = ({location, history}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] =  useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const {
    login,
    logout,
    setToken
  } = useAuth();


  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if(query.get("logout")){
      logout();
    }
    if(query.get("error")){

      setError(query.get("error"));
    }
  }, []
) 

  const handleSigIn = async (e) => {
    e.preventDefault();
    if (email == null || password == null)
    {
      setError("Todos os campos precisam ser preenchidos");
    } 
    else 
    {
      setLoading(true);
      setError(null);
      await login(email, password).then(
        (resp) => 
        {
          setLoading(false);
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
              setToken(resp.access_token);
              history.push("/dashboard/datafiles");
            }else{
              history.push("/");
            }
          })
        },
        (err) => 
        {
          setLoading(false);
          if (err.error) setError(err.error);
          else 
          {
            console.log("Erro ao realizar o login: ", err);
            setError(
                "Houve um problema ao realizar o login, tente novamente mais tarde."
            );
          }
        }
      );
    }
  };
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
        Realizar Login
      </p>
      <p className={formStyles.descriptionStyled + " text-center my-3 mx-auto "}>
        Preencha seu usuário e senha para acessar seu dashboard
      </p>
      {
        error &&
        <p className="text-danger text-center m-2">
          {error}
        </p>
      }
      <hr />
      <Form  
        className="w-100 d-flex flex-column"
        onSubmit={handleSigIn}
      >  
        <Form.Group>
          <Form.Control className={formStyles.textInputStyled + " text-center my-1 mx-auto p-0 px-2"}
            type="email"
            placeholder="Email do usuário"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control className={formStyles.textInputStyled + " text-center my-1 mx-auto p-0 px-2"}
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>        
        <Button className={formStyles.submitButtonStyled + " text-white fs-5 mt-3 m-auto "} type="submit">
          {loading ? <LoadingSpinnerComponent /> : <p>Entrar</p> }
        </Button>
      </Form>
      <hr />        
      <Link to="/cadastro">Cadastre-se</Link>
    </Container>
  );
}

export const LoginPage = withRouter(LoginComponent);
