import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Elevate, Exceptionally, UserHero, UserSection2 } from './components';
import CardSection from './components/CardSection';
import WhoUser from '../[userType]/components/WhoUser';
import AllInOne from '../../../components/marketing/Homepage/AllInOne';

const getMetadata = (userType) => {
  switch (userType) {
    case 'black-owned-businesses':
      return {
        icons: {
          icon: [
            { url: '/favicon96.png', sizes: '96x96' },
            { url: '/favicon192.png', sizes: '192x192' },
            { url: '/favicon256.png', sizes: '256x256' },
          ],
        },
        title: 'Orisuun | Driving Growth of Black-Owned Businesses',
        description:
          'Join our network dedicated to growing Black-owned businesses. Find valuable connections and business development opportunities. Connect with motivated investors and clients searching our database just for you. Claim your custom URL on Orisuun.com today! ',
        keywords:
          'Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching, New Features, New Platform Functions',
      };
    case 'professionals':
      return {
        icons: {
          icon: [
            { url: '/favicon96.png', sizes: '96x96' },
            { url: '/favicon192.png', sizes: '192x192' },
            { url: '/favicon256.png', sizes: '256x256' },
          ],
        },
        title:
          'Orisuun | Get Paid to Provide Your Professional Services to Black-Owned Businesses',
        description:
          'Get paid to provide your professional services to growing Black-owned businesses. ',
        keywords:
          'Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching, Professionals, Attorneys, Accountants, Marketing',
      };
    case 'experts':
      return {
        title: 'Orisuun | Get Paid to Provide Your Expert Opinion ',
        description:
          'Get paid to provide your expert opinion to Black-owned businesses. Claim your custom URL on Orisuun.com today!',
        keywords:
          'Subject Matter Expert, Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching, New Features, New Platform Functions, Expert',
      };
    case 'mentors':
      return {
        icons: {
          icon: [
            { url: '/favicon96.png', sizes: '96x96' },
            { url: '/favicon192.png', sizes: '192x192' },
            { url: '/favicon256.png', sizes: '256x256' },
          ],
        },
        title: 'Orisuun | Mentor Owners of Growing Black-Owned Businesses',
        description:
          'Mentor owners of growing Black-owned businesses. Claim your custom URL on Orisuun.com today! ',
        keywords:
          'Mentors, Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching, Collaboration, Mentor',
      };
    case 'management-consultants':
      return {
        icons: {
          icon: [
            { url: '/favicon96.png', sizes: '96x96' },
            { url: '/favicon192.png', sizes: '192x192' },
            { url: '/favicon256.png', sizes: '256x256' },
          ],
        },
        title:
          'Orisuun | Get Paid to Provide Your Strategy Consultant Services to Black-owned Businesses',
        description:
          'Get paid to provide strategic advice to growing Black-owned businesses.',
        keywords:
          'Strategy Consulting, Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching, New Features, New Platform Functions, Management Consultants, Strategy Consultants',
      };
    case 'partners':
      return {
        icons: {
          icon: [
            { url: '/favicon96.png', sizes: '96x96' },
            { url: '/favicon192.png', sizes: '192x192' },
            { url: '/favicon256.png', sizes: '256x256' },
          ],
        },
        title:
          'Orisuun | Create New Client Relationships with Growing Black-Owned Businesses',
        description:
          'Connect and create new client relationships with growing Black-owned businesses around the world. ',
        keywords:
          'Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching, Collaboration ',
      };
    case 'investors':
      return {
        icons: {
          icon: [
            { url: '/favicon96.png', sizes: '96x96' },
            { url: '/favicon192.png', sizes: '192x192' },
            { url: '/favicon256.png', sizes: '256x256' },
          ],
        },
        title:
          'Orisuun | Create New Investment Relationships with Growing Black-Owned Businesses',
        description:
          'Connect and create new investment relationships with growing Black-businesses around the world.',
        keywords:
          'Invest in Black-Owned Businesses, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching, Collaboration, Invest in Black startups',
      };
    case 'advocates':
      return {
        icons: {
          icon: [
            { url: '/favicon96.png', sizes: '96x96' },
            { url: '/favicon192.png', sizes: '192x192' },
            { url: '/favicon256.png', sizes: '256x256' },
          ],
        },
        title:
          'Orisuun | Search, Find, and Support Black-Owned Businesses Around the World',
        description:
          'Search, find, and support Black-owned businesses around the world. Claim your custom URL on Orisuun.com today!',
        keywords:
          'Support Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching, Collaboration, Support Black-Owned Businesses',
      };
    default:
      return {
        icons: {
          icon: [
            { url: '/favicon96.png', sizes: '96x96' },
            { url: '/favicon192.png', sizes: '192x192' },
            { url: '/favicon256.png', sizes: '256x256' },
          ],
        },
        title: 'User Type',
        description: 'User type information and details.',
        keywords: 'User type keywords',
      };
  }
};

export async function generateMetadata({ params }) {
  const { userType } = params;
  return getMetadata(userType);
}

export default async function UserType({ params }) {
  const { userType } = params;

  if (
    ![
      'black-owned-businesses',
      'professionals',
      'experts',
      'mentors',
      'management-consultants',
      'partners',
      'investors',
      'advocates',
    ].includes(userType)
  ) {
    notFound();
  }
  return (
    <div>
      <div className="flex flex-col">
        <UserHero userType={userType} />
        <UserSection2 userType={userType} />
      </div>
      <div className="max-w-[1440px] 3xl:max-w-[1600px] 2k:max-w-[1800px] w-full mx-auto">
        <AllInOne isUserType={true} />
        <WhoUser />
        {userType !== 'partners' && <Exceptionally userType={userType} />}
        <CardSection userType={userType} />
        <Elevate userType={userType} />
      </div>
    </div>
  );
}
