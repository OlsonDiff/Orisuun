import { PricingFAQ, PricingMain, WhyNow } from './components';
export const metadata = {
  icons: {
    icon: [
      { url: '/favicon96.png', sizes: '96x96' },
      { url: '/favicon192.png', sizes: '192x192' },
      { url: '/favicon256.png', sizes: '256x256' },
    ],
  },
  title: 'Orisuun | Pricing and Plans ',
  description:
    'Explore our transparent and flexible pricing plans that easily pay for themselves.',
  keywords:
    'Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching',
};

export default function Pricing() {
  return (
    <>
      <PricingMain />
      <WhyNow />
      <PricingFAQ />
    </>
  );
}
