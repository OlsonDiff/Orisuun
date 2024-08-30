import React from 'react';

const Filters: React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.8336 18.028L9.16688 19.8613V11.0002L3.36133 3.36133H18.6391L12.8336 11.0002V18.028Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Filters;
