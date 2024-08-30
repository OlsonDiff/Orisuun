import React from 'react';

const BusinessDevelopmentIcon: React.FC<LogoProps> = (props) => {
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
        id="mask0_755_43100"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_755_43100)">
        <path
          d="M2.70837 17.2907V15.9205L3.95833 14.6706V17.2907H2.70837ZM6.04171 17.2907V12.5872L7.29167 11.3372V17.2907H6.04171ZM9.37504 17.2907V11.3372L10.625 12.608V17.2907H9.37504ZM12.7084 17.2907V12.608L13.9583 11.3581V17.2907H12.7084ZM16.0417 17.2907V9.25387L17.2917 8.00391V17.2907H16.0417ZM2.70837 12.6817V10.9205L8.33335 5.29555L11.6667 8.62889L17.2917 3.00391V4.76507L11.6667 10.3901L8.33335 7.05672L2.70837 12.6817Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default BusinessDevelopmentIcon;
