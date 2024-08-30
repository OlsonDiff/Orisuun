import React from 'react';

const ChevronRight: React.FC<LogoProps> = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.9457 11.9995L8.3457 7.39945L9.39945 6.3457L15.0532 11.9995L9.39945 17.6532L8.3457 16.5995L12.9457 11.9995Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChevronRight;
