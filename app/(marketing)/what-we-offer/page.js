import React from 'react';
import { WeOffer } from './weOffer';

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon96.png', sizes: '96x96' },
      { url: '/favicon192.png', sizes: '192x192' },
      { url: '/favicon256.png', sizes: '256x256' },
    ],
  },
  title:
    'Orisuun | Exclusive Black-Owned Business Network & Investment Opportunities',
  description:
    'Explore exclusive business development, networking, and investment opportunities. Unleash your potential on Orisuun. ',
  keywords:
    'Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching',
};

const WhatWeOffer = () => {
  return (
    <>
      <WeOffer />
    </>
  );
};

export default WhatWeOffer;
