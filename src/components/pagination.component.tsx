import { useMemo } from "react";
import { SkeletonBlock } from "./layout/skeleton/block.component";

type props = {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  totalItems: number;
  itemsPerPage: number;
  isLoading?: boolean;
};

export function Pagination({
  currentPage,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  isLoading = false,
}: props) {
  const totalPages = useMemo(() => {
    let temp = totalItems / itemsPerPage;

    if (totalItems % itemsPerPage > 0) {
      temp += 1;
    }

    return temp;
  }, [totalItems, itemsPerPage]);

  // Calculate which page numbers to show (max 5)
  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center ">
        <SkeletonBlock className="h-7 w-[70%]" />
      </div>
    );
  }

  return (
    <nav className="flex justify-center space-x-2 mt-6 select-none">
      <button
        className="cursor-pointer px-3 py-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:text-gray-300"
        onClick={() => {
          onPageChange(Math.max(currentPage - 1, 1));
        }}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => {
            onPageChange(page);
          }}
          className={`px-3 py-1 rounded-md transition cursor-pointer ${
            page === currentPage
              ? "bg-gray-900 text-white cursor-default"
              : "text-gray-700 hover:text-black hover:bg-gray-200"
          }`}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}

      <button
        className="cursor-pointer px-3 py-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:text-gray-300"
        onClick={() => {
          onPageChange(Math.min(currentPage + 1, totalPages));
        }}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
