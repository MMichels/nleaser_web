import styled from "styled-components";

export const DataFile = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 100%;
  width: 100%;

  margin: 0 0 20px;
  padding: 20px;
  border-radius: 15px;

  cursor: pointer;
  trasition: 0.3s ease;

  .datafile-header {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid black;
  }

  .datafile-header h1 {
    font-size: 16pt;
    margin: 0;
    width: 100%;
  }

  .datafile-header svg {
    margin: 0;
    margin-left: auto;
    margin-bottom: -0.3em;
    height: 20px;
    width: 20px;

    &:hover {
        box-shadow: 1px 1px 2px rgba(255,0,0,0.5);
        background: transparent;
    }
  }

  .createdDate {
    margin: auto;
    margin-bottom: -10px;
    margin-right: 0;
    font-size: 10pt;
    text-align: right;
    align-self: end;
  }

  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
  }
`;
