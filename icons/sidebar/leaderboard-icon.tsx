import React from 'react';

const LeaderboardIcon: React.FC<LogoProps> = (props) => {
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
        id="mask0_755_43156"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_755_43156)">
        <path
          d="M3.33335 15.8327H6.94717V9.166H3.33335V15.8327ZM8.19712 15.8327H11.8029V4.166H8.19712V15.8327ZM13.0529 15.8327H16.6667V10.8327H13.0529V15.8327ZM2.08337 17.0826V7.91602H6.94717V2.91602H13.0529V9.58268H17.9167V17.0826H2.08337Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default LeaderboardIcon;
