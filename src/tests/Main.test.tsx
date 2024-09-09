import React from "react";
import "@testing-library/dom"
import {   fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Main from "../components/Main/Main";
import { getUsers } from "../api";


it('should render without crashing', () => {
    render(<Main />);
    expect(screen.getByText('Поиск репозиториев GitHub по логину')).toBeInTheDocument();
  });

  
   
  
  
  jest.mock("../api"); // Мокируем API
  
  const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;
  
  describe("Main component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should render correctly and handle user search", async () => {
      mockGetUsers.mockResolvedValueOnce({
        users: [{ id: 1, login: "user1", html_url: "http://example.com", repos: 5, total_count: 1 }],
        totalCount: 1,
      });
  
      render(<Main />);
  
      // Проверяем, что компонент рендерится корректно
      expect(screen.getByText("Поиск репозиториев GitHub по логину")).toBeInTheDocument();
      
      // Вводим логин и нажимаем "Найти"
      fireEvent.change(screen.getByPlaceholderText("Логин"), { target: { value: "user1" } });
      fireEvent.click(screen.getByText("Найти"));
  
      // Ожидаем, что данные загружены и отображены
      await waitFor(() => {
        expect(screen.getByText("user1 - 5 репозиториев")).toBeInTheDocument();
      });
    });
  });
  