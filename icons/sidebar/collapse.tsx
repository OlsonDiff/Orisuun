import React from 'react';

const Collapse: React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_755_43177"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_755_43177)">
        <path
          d="M3.5 17.5V16H15.7115V17.5H3.5ZM19.4462 16.548L14.8788 12L19.4462 7.4615L20.5 8.5155L16.9865 12L20.5 15.4943L19.4462 16.548ZM3.5 12.75V11.25H12.7885V12.75H3.5ZM3.5 8V6.5H15.7115V8H3.5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default Collapse;
