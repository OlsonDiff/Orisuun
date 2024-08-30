import {
  AboutHero,
  AllWelcome,
  BlackOwned,
  Field,
  WhyWeCreated,
  HelpYou,
  KeyValues,
} from './components';

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon96.png', sizes: '96x96' },
      { url: '/favicon192.png', sizes: '192x192' },
      { url: '/favicon256.png', sizes: '256x256' },
    ],
  },
  title: 'Orisuun | The Number One Network Platform for Black-Owned Businesses',
  description:
    'Discover our commitment and story. Learn about our team and tools designed to promote Black business growth',
  keywords:
    'Black-Owned Business, Bek Sunuu, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching',
};

export default function About() {
  return (
    <main className="max-w-[1440px] mx-auto">
      <AboutHero />
      <BlackOwned />
      <Field />
      <WhyWeCreated />
      <AllWelcome />
      <HelpYou />
      <KeyValues />
    </main>
  );
}
