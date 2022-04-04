import styled from "styled-components";

export const Card = styled.li`
  display: flex;
  flex-direction: row;
  flex-basis: 33.33%;
  width: 33.33%;
  height: 300px;
  padding: 0 20px 20px 0;
  box-sizing: border-box;

  &:last-child {
    padding-right: 0;
  }
`;