import styled from "styled-components";
export const Container = styled.div`
  margin-left: 30px;
  margin-top: 30px;
`;
export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 15px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Input = styled.input`
  width: 300px;
  padding: 10px 10px;
  margin-right: 20px;
  margin-bottom: 16px;
  border-radius: 10px;
  &::placeholder {
    color: #888;
  }
`;

export const Heading = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: black;
  margin-bottom: 16px;
`;
export const Error = styled.p`
  font-size: 14px;
  color: red;
`;
export const Loader = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const List = styled.li`
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  list-style-type: circle;
  color: #000;
  padding-bottom: 5px;
`;
export const ReposLink = styled.a`
  cursor: pointer;
  font-size: 16px;
  color: #696969;
  &:hover {
    color: #660099;
  }
`;
