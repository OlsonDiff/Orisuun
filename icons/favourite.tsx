import React from 'react';

const Favourite: React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.99913 1.55713L9.99024 5.5918L14.4436 6.23891L11.2214 9.38024L11.9822 13.8149L7.99913 11.7216L4.01602 13.8149L4.77691 9.38024L1.55469 6.23891L6.00802 5.5918L7.99913 1.55713Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Favourite;
