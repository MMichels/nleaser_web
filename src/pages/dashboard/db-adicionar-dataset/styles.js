import styled from "styled-components";

export const UploadForm = styled.form`
  background: #fff;
  margin: auto;
  padding: 20px;
  width: 600px;
  border: 1px solid #cecece;
  border-radius: 10px;
  display: block;

  
  button {
    width: 50%;
    height: 56px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background: #fc6963;
    border: 0;
    border-radius: 5px;
    margin: 0 25%;
}
`;

export const FormRow = styled.div`
  display: flex;
  margin: 10px 0;
  margin-top: 0;
  line-height: 26px;
  border-bottom: 1px solid #cecece;
  
`;

export const FormLabelCol = styled.div`
  width: 220px;
  height: 100%;
  font-size: 12pt;
  margin: auto 0;
`;

export const FormInputCol = styled.div`
  margin: auto 0;
  height: 44px;
  width: 50%;

  input {
      height: 90%;
      width: 100%;
      margin: 0 auto;
      font-size: 12pt;
  }

  select {
      height: 90%;
      width: 100%;
      margin: 0 auto;
  }

`;
