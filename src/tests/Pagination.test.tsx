import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../components/Pagination/Pagination";

describe("Pagination component", () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it("should render correctly with given props", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    expect(screen.getByText("Страница 2 из 5")).toBeInTheDocument();
    expect(screen.getByText("Предыдущая")).toBeInTheDocument();
    expect(screen.getByText("Следующая")).toBeInTheDocument();
  });
});
