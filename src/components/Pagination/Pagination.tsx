import React from "react";
import { Button, Container } from "./Pagination.styled";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Container>
      <Button onClick={handlePrevClick} disabled={currentPage === 1}>
        Предыдущая
      </Button>
      <span>Страница {currentPage} из {totalPages}</span>
      <Button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Следующая
      </Button>
    </Container>
  );
};

export default Pagination;

