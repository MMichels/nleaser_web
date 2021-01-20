import styled from "styled-components";

export const DashBoard = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  list-style: none;
  margin: 10px 0;
`;

export const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  background: #fff; 

  border-radius: 15px;

  cursor: pointer;
  trasition: 0.3s ease;
  
  svg {
    margin: auto;   
    border-radius: 50px;
    color: black;
  }  

  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  }

`;
