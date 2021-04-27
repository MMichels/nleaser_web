import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0;
}

body, html {
  background: #eee;
  font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  height: 100%;
  width: 100%;
}

a.fill-div {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
}

p.error {
    color: #ff3333;
    margin-bottom: 25px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-aling: center;
}

.exclude {
  color: #F44;
}

.swal2-popup {
  width: 25%;
}
  
.swal2-content {
  font-size: 12pt !important;
  font-weight: 400;
}

.swal2-actions button {
  font-size: 12pt !important;
}

.swal2-confirm {
  background: #0b951a !important;

  &:not([disabled]):hover {
    background: #006200 !important;
  }
  
}

.swal2-cancel {
  background: #F44 !important;
  color: #FFF !important;
  
  &:not([disabled]):hover {
    background: #C00 !important;
  }
}
`;
export { GlobalStyle };