import Hero from '../../components/marketing/Homepage/Hero';
import How from '../../components/marketing/Homepage/How';
import AllInOne from '../../components/marketing/Homepage/AllInOne';
import Who from '../../components/marketing/Homepage/Who';
import Grow from '../../components/marketing/Homepage/Grow';
import Beta from '../../components/marketing/Homepage/Beta';
import Access from '../../components/marketing/Homepage/Access';

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon96.png', sizes: '96x96' },
      { url: '/favicon192.png', sizes: '192x192' },
      { url: '/favicon256.png', sizes: '256x256' },
    ],
  },
  title: ' Orisuun | Growing Black-Owned Businesses.',

  description:
    'Orisuun is a vibrant ecosystem dedicated to promoting the growth of Black-owned businesses through collaboration and investment.',

  keywords:
    'Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search',
};

export default function Home() {
  return (
    <>
      <Hero />
      <How />
      <AllInOne />
      <Who />
      <Grow />
      <Beta />
      <Access />
    </>
  );
}
