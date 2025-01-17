import React from 'react';

const DeFavourite: React.FC<LogoProps> = (props) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#20B488" />
            <path d="M15.9991 9.55664L17.9902 13.5913L22.4436 14.2384L19.2214 17.3798L19.9822 21.8144L15.9991 19.7211L12.016 21.8144L12.7769 17.3798L9.55469 14.2384L14.008 13.5913L15.9991 9.55664Z" stroke="#20B488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default DeFavourite;
