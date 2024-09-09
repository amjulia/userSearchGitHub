import React from "react";
import { GlobalStyle } from "./components/Global.styled";
import Main from "./components/Main/Main";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Main />
    </>
  );
}

export default App;
