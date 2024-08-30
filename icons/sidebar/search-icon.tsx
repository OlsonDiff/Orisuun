import React from 'react';

const SearchIcon: React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.9446 16.9388L12.5391 12.5332"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.6111 14.1658C11.6793 14.1658 14.1667 11.6785 14.1667 8.61024C14.1667 5.54199 11.6793 3.05469 8.6111 3.05469C5.54285 3.05469 3.05554 5.54199 3.05554 8.61024C3.05554 11.6785 5.54285 14.1658 8.6111 14.1658Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
