import { Footer, Navbar } from '../../../components/marketing';
import FeedbackForm from './FeedbackForm';
import FeedbackInput from './FeedbackInput';
export const metadata = {
  icons: {
    icon: [
      { url: '/favicon96.png', sizes: '96x96' },
      { url: '/favicon192.png', sizes: '192x192' },
      { url: '/favicon256.png', sizes: '256x256' },
    ],
  },
  title: 'Orisuun | Share Your Insight',
  description:
    'Share your experience with Orisuun.com. Let us know how to make the platform better for you.',
  keywords:
    'Black-Owned Business, Black Business, Black Business Network, Black Business Directory, Black Business Database, Black Startups, Business Development, Investment, Opportunities, Fundraising, Networking, Platform, Global, US, Co-founders, Board Member Search, Co-founder search, Chat, Search, Business Development Opportunity Matching',
};

const Feedback = () => {
  return (
    <>
      <main className="w-full pt-12 pb-28 md:pb-40 small-500:px-4">
        <header
          className="text-center px-6 md:px-12 small-500:px-0 flex flex-col gap-6"
          data-aos="fade-up"
        >
          <h2 className="text-[48px] small-500:text-[36px] small-500:text-left md:text-[64px] text-blue-strong font-semibold small-500:w-[230px]">
            Your Opinion is Everything!
          </h2>
          <p className="text-lg md:text-xl small-500:text-[16px] small-500:text-left font-medium text-[#5B657B] w-full md:w-[450px] mx-auto">
            Please help us improve. Our anonymous survey takes{' '}
            <span className="whitespace-nowrap font-semibold text-gradient">
              less than two minutes.
            </span>{' '}
            Feel free to also answer the open-ended questions below.
          </p>
        </header>
        <FeedbackForm />
        <FeedbackInput />
      </main>
    </>
  );
};

export default Feedback;
