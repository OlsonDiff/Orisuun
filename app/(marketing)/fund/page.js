import { HeroFund } from './Hero Fund/heroFund';
import { HeroFundImportance } from './Fund Importance/importance';
import { FundDifference } from './Fund Difference/difference';
import { FundProgress } from './Fund Progress/progress';
import { FundVision } from './Fund Vision/vision';
import { FundSupport } from './Fund Support/support';
import { Footer, Navbar } from '../../../components/marketing';
import { FundStage } from './Fund Stage/stage';
import { BlackWealth } from './Fund Wealth/blackWealth';
import AOSWrapper from '../../../components/marketing/AOS Wrapper/Aos';

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon96.png', sizes: '96x96' },
      { url: '/favicon192.png', sizes: '192x192' },
      { url: '/favicon256.png', sizes: '256x256' },
    ],
  },
  title: 'Orisuun | Empowering Black Entrepreneurs: The Black Wealth Fund',
  description:
    'Our Black Wealth Fund is dedicated to fostering economic empowerment within the Black community by providing strategic investments and grants to Black-owned startups and established businesses. With a commitment to cultivating talent, we offer financial resources coupled with mentorship and guidance to propel Black entrepreneurs towards success. Our mission is to address systemic barriers to wealth accumulation and entrepreneurship within the Black community, creating pathways for economic advancement and generational prosperity. Through our tailored investment approach and comprehensive support network, we aim to fuel the growth of Black-owned businesses across various sectors, including technology, finance, media, consumer products, real estate, healthcare, and beyond. Whether through equity investments, debt financing, or grant opportunities, we prioritize initiatives that have the potential to drive significant and sustainable business growth for social and economic impact. Join us in building a future where Black entrepreneurs have equitable access to the resources they need to thrive, innovate, and leave a lasting legacy of prosperity for generations to come. Together, we can create a more inclusive and prosperous economy for all',
  keywords:
    'Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching',
};

export default function Fund() {
  return (
    <AOSWrapper>
      <div className="flex flex-col">
        <HeroFund />
        <HeroFundImportance />
        <FundStage />
        <BlackWealth />
        <FundDifference />
        <FundProgress />
        <FundVision />
        <FundSupport />
      </div>
    </AOSWrapper>
  );
}
