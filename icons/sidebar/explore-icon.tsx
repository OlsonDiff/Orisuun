import React from 'react';

const ExploreIcon: React.FC<LogoProps> = (props) => {
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
        id="mask0_755_43182"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_755_43182)">
        <path
          d="M5.68915 14.3115L11.4423 11.4429L14.3109 5.68976L8.55773 8.55834L5.68915 14.3115ZM10 10.834C9.76391 10.834 9.56599 10.7541 9.40627 10.5944C9.24655 10.4347 9.16669 10.2367 9.16669 10.0006C9.16669 9.76452 9.24655 9.5666 9.40627 9.40688C9.56599 9.24716 9.76391 9.1673 10 9.1673C10.2361 9.1673 10.434 9.24716 10.5938 9.40688C10.7535 9.5666 10.8334 9.76452 10.8334 10.0006C10.8334 10.2367 10.7535 10.4347 10.5938 10.5944C10.434 10.7541 10.2361 10.834 10 10.834ZM10.0014 17.9173C8.90647 17.9173 7.87728 17.7095 6.91383 17.2939C5.95037 16.8784 5.1123 16.3144 4.39962 15.6021C3.68693 14.8897 3.12271 14.052 2.70698 13.089C2.29124 12.126 2.08337 11.097 2.08337 10.002C2.08337 8.90708 2.29115 7.87789 2.70671 6.91444C3.12226 5.95098 3.68622 5.11292 4.39858 4.40024C5.11096 3.68754 5.94866 3.12333 6.91169 2.70759C7.8747 2.29185 8.90368 2.08398 9.99862 2.08398C11.0936 2.08398 12.1228 2.29176 13.0862 2.70732C14.0497 3.12287 14.8877 3.68683 15.6004 4.39919C16.3131 5.11157 16.8773 5.94927 17.2931 6.9123C17.7088 7.87531 17.9167 8.90429 17.9167 9.99924C17.9167 11.0942 17.7089 12.1234 17.2933 13.0868C16.8778 14.0503 16.3138 14.8883 15.6015 15.601C14.8891 16.3137 14.0514 16.8779 13.0884 17.2937C12.1253 17.7094 11.0964 17.9173 10.0014 17.9173ZM10 16.6673C11.8611 16.6673 13.4375 16.0215 14.7292 14.7298C16.0209 13.4381 16.6667 11.8617 16.6667 10.0006C16.6667 8.13952 16.0209 6.56313 14.7292 5.27146C13.4375 3.9798 11.8611 3.33396 10 3.33396C8.13891 3.33396 6.56252 3.9798 5.27085 5.27146C3.97919 6.56313 3.33335 8.13952 3.33335 10.0006C3.33335 11.8617 3.97919 13.4381 5.27085 14.7298C6.56252 16.0215 8.13891 16.6673 10 16.6673Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default ExploreIcon;
