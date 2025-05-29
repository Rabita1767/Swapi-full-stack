import React from "react";
import "./pagination.scss";
import Button from "../../atoms/button/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
  currentPage: number; // Current active page
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Callback to handle page change
}

const Pagination: React.FC<IPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const componentClassName = "m-pagination";

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={componentClassName}>
    <Button
      label={<ChevronLeft size={24} />}
      onClick={handlePrevious}
      disabled={currentPage === 1}
      backgroundColor="gradientPink"
    />

      <span className={`${componentClassName}__info`}>
        Page {currentPage} of {totalPages}
      </span>
    <Button
      label={<ChevronRight size={24} />}
      onClick={handleNext}
      disabled={currentPage === totalPages}
      backgroundColor="gradientPink"
    />
    </div>
  );
};

export default Pagination;