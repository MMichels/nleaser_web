import LogoImg from "../../assets/logo.png"

import { getToken } from "../../services/auth";
import { Container, Nav, Navbar } from 'react-bootstrap';

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";




export const HeaderComponent=() => {
  const token = getToken();

  /**
   * Se o usuario estiver logado, coloca as opções de logout e de acessar o dashboard no Header
   * Caso contrario, coloca as opções de login e cadastro
   */
  const accessComponents = () => {
    if(token && token !== undefined)
    {
      return (
        <>
          <Nav.Item>
            <Link className="nav-link" to="/tutorial">Tutorial</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/dashboard/datafiles">Dashboard</Link>
          </Nav.Item>          
          <Nav.Item>
            <Link className="nav-link" to="/login?logout=true">Logout</Link>                
          </Nav.Item>
        </>
      )
    }
    else 
    {      
      return (
        <>
          <Nav.Item>            
            <Link className="nav-link" to="/login">Login</Link>
          </Nav.Item>          
          <Nav.Item>            
            <Link className="nav-link" to="/cadastro">Cadastre-se</Link>
          </Nav.Item>
        </>
      )
    }
    
  }
  
  return (
    <Navbar expand="md" bg="primary" variant="dark" className="p-0 m-0 fixed-top position-relative">      
      <Container fluid className="justify-content-start p-1">          
          <Navbar.Toggle/>
          <Link className="nav-brand" to="/">
            <img 
              src={LogoImg} 
              alt="Logo da aplicação NLEaser" 

            >            
            </img>
          </Link>          
          <p className="text-light position-absolute top-0 end-0 p-1 p-sm-2 p-lg-3"><b>Alpha</b></p>
          <Navbar.Collapse>
            <Nav className={styles.menu}>
              {accessComponents()}
            </Nav>   
          </Navbar.Collapse>
      </Container>

    </Navbar>
  )
};
