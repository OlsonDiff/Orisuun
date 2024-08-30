import React from 'react';

const FavouritesIcon: React.FC<LogoProps> = (props) => {
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
        id="mask0_755_43142"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_755_43142)">
        <path
          d="M7.37495 14.8548L9.99995 13.2714L12.625 14.8756L11.9375 11.8756L14.25 9.87562L11.2083 9.60478L9.99995 6.77145L8.79162 9.58395L5.74995 9.85478L8.06245 11.8756L7.37495 14.8548ZM5.47916 17.4685L6.67306 12.3275L2.68433 8.87082L7.9471 8.41412L9.99995 3.56641L12.0528 8.41412L17.3156 8.87082L13.3268 12.3275L14.5207 17.4685L9.99995 14.741L5.47916 17.4685Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default FavouritesIcon;
