import React from 'react';

const DashboardIcon: React.FC<LogoProps> = (props) => {
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
        id="mask0_755_43093"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_755_43093)">
        <path
          d="M11.0417 7.49933V2.91602H17.0834V7.49933H11.0417ZM2.91675 10.416V2.91602H8.95837V10.416H2.91675ZM11.0417 17.0826V9.58268H17.0834V17.0826H11.0417ZM2.91675 17.0826V12.4993H8.95837V17.0826H2.91675ZM4.16673 9.166H7.70842V4.166H4.16673V9.166ZM12.2917 15.8327H15.8334V10.8327H12.2917V15.8327ZM12.2917 6.24935H15.8334V4.166H12.2917V6.24935ZM4.16673 15.8327H7.70842V13.7493H4.16673V15.8327Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default DashboardIcon;
