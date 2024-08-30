import React from 'react';
import ArrowLeft from '@/icons/arrow-left';

interface IProps {
  total: number;
  show: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IProps> = ({
  total,
  show,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / show);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = '...';

    if (pageCount <= 3) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > 2 && currentPage < pageCount) {
        pageNumbers.push(ellipsis);
        pageNumbers.push(currentPage);
      }

      if (currentPage !== pageCount) {
        if (currentPage < pageCount - 1) pageNumbers.push(ellipsis);
        pageNumbers.push(pageCount);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="inline-flex items-center justify-end border border-grey-600 rounded-md overflow-hidden">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border-r border-grey-600 bg-white text-gray-600 disabled:bg-gray-100 disabled:text-gray-400"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() =>
            typeof pageNumber === 'number' && onPageChange(pageNumber)
          }
          className={`px-3 py-2 border-r border-grey-600 ${
            pageNumber === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600'
          } ${typeof pageNumber !== 'number' ? 'cursor-default' : ''}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className="px-3 py-2 bg-white text-gray-600 disabled:bg-gray-100 disabled:text-gray-400"
      >
        <ArrowLeft className="w-4 h-4 transform rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
