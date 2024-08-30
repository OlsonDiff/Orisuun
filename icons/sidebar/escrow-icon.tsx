import React from 'react';

const EscrowIcon: React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_755_43135"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_755_43135)">
        <path
          d="M5.96156 16.2419L2.08337 12.3638L5.96156 8.48556L6.83975 9.37656L4.47756 11.7388H10.5449V12.9887H4.47756L6.83975 15.3509L5.96156 16.2419ZM14.0385 11.5064L13.1603 10.6154L15.5225 8.25319H9.45517V7.00321H15.5225L13.1603 4.64102L14.0385 3.75L17.9167 7.62819L14.0385 11.5064Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default EscrowIcon;
