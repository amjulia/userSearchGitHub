import React from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Error,
  Heading,
  Input,
  List,
  Loader,
  ReposLink,
} from "./Main.styled";
import { getUsers } from "../../api";
import Pagination from "../Pagination/Pagination";

type UserRepos = {
  id: number;
  login: string;
  html_url: string;
  repos: number;
  total_count: number;
};

type GetUserResponse = {
  users: UserRepos[];
  totalCount: number;
};
const Main: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState<UserRepos[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 20;

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const { users: fetchedUsers, totalCount }: GetUserResponse =
        await getUsers(userName, page, perPage);
      setUsers(fetchedUsers);
      setTotalPages(Math.ceil(totalCount / perPage));
      if (fetchedUsers.length === 0) {
        setError("Нет данных, удовлетворяющих поиску");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Ошибка при получении данных");
    } finally {
      setLoading(false);
    }
  };

  const validateInput = (input: string): string | null => {
    if (input.trim() === "") {
      return "Поле не может быть пустым";
    }
    if (!/^[a-zA-Z0-9_.]+$/.test(input)) {
      return "Логин может содержать только буквы латиницы, цифры и нижние подчеркивания";
    }
    return null;
  };

  const clearSearch = () => {
    setUsers([]);
    setError("");
    setUserName("");
    setCurrentPage(1);
    setTotalPages(0);
  };

  const searchUsers = () => {
    const validationError = validateInput(userName);
    if (validationError) {
      clearSearch();
      setError(validationError);
      return;
    }
    setCurrentPage(1); // Сбрасываем текущую страницу на 1 при новом поиске
    fetchUsers(1); // Запрашиваем данные с первой страницы
  };

  const toggleOpen = (id: number) => {
    setOpenId((prevOpenId) => (prevOpenId === id ? null : id));
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUsers(page);
  };

  return (
    <Container>
      <Heading>Поиск репозиториев GitHub по логину</Heading>
      <Input
        type="text"
        placeholder="Логин"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></Input>
      <Button onClick={searchUsers} disabled={isLoading}>
        Найти
      </Button>
      <Button onClick={clearSearch}>Очистить поиск</Button>
      {error && <Error>{error}</Error>}
      {isLoading ? (
        <div>
          {" "}
          <Loader></Loader>
        </div>
      ) : (
        <ul>
          {users.map((user) => (
            <List onClick={() => toggleOpen(user.id)} key={user.id}>
              {user.login} - {user.repos} репозиториев
              {openId === user.id && (
                <div>
                  <ReposLink
                    href={user.html_url}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.html_url}
                  </ReposLink>
                </div>
              )}
            </List>
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default Main;
