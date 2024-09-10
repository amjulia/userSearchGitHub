import React from "react";
import { GlobalStyle } from "./components/Global.styled";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
    </>
  );
}

export default App;
