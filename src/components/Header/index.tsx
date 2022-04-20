import LogoImg from "../../assets/logo.png"

import { getToken } from "../../services/auth";
import { Container, Nav, Navbar } from 'react-bootstrap';

import styles from "./styles.module.scss";




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
            <Nav.Link href="/tutorial" eventKey="1" >Tutorial</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link  href="/dashboard/datafiles" eventKey="2">Dashboard</Nav.Link>
          </Nav.Item>          
          <Nav.Item>
            <Nav.Link href="/login?logout=true" eventKey="3">Logout</Nav.Link>                
          </Nav.Item>
        </>
      )
    }
    else 
    {      
      return (
        <>
          <Nav.Item>            
            <Nav.Link className="link-light" href="/login" eventKey="1">Login</Nav.Link>
          </Nav.Item>          
          <Nav.Item>            
            <Nav.Link href="/cadastro" eventKey="2">Cadastre-se</Nav.Link>
          </Nav.Item>
        </>
      )
    }
    
  }
  
  return (
    <Navbar expand="md" bg="primary" variant="dark" className="p-0 m-0 fixed-top position-relative">      
      <Container fluid className="justify-content-start p-1">          
          <Navbar.Toggle/>
          <Navbar.Brand href="/">
            <img 
              src={LogoImg} 
              alt="Logo da aplicação NLEaser" 

            >            
            </img>
          </Navbar.Brand>          
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
