import "@testing-library/jest-dom";
import React from "react";
import "@testing-library/dom"
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Main from "../components/Main/Main";

it('should render without crashing', () => {
    render(<Main />);
    expect(screen.getByText('Поиск репозиториев GitHub по логину')).toBeInTheDocument();
  });