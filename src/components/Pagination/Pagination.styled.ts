import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;