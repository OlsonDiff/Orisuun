import { TheBlack } from './Offer Features/theBlack';
import { TheExperts } from './Offer Features/theExperts';
import { TheInvestors } from './Offer Features/theInvestors';
import { TheManagement } from './Offer Features/theManagement';
import { TheMentors } from './Offer Features/theMentors';
import { ThePartners } from './Offer Features/thePartners';
import { ThePeople } from './Offer Features/thePeople';
import { TheProfessionals } from './Offer Features/theProfessionals';
import { Database } from './Offers/database';
import { Discount } from './Offers/discount';
import { Explore } from './Offers/exploreOffer';
import { FundRaising } from './Offers/fundRaising';
import { Platform } from './Offers/platform';
import { PrivateChat } from './Offers/private';
import { Public } from './Offers/public';
import { Team } from './Offers/team';
import { Tools } from './Tools/toolsHome';
import { ExploreTDB } from './Offers/exploreTDB';
import { Business } from './Offers/business';
import { Cofounder } from './Offers/cofounder';
import { BoardMatching } from './Offers/boardmatching';

export const WeOffer = () => {
  return (
    <div className="w-full flex flex-col lg:pb-[200px] md:pb-[120px]">
      <div className="w-full flex flex-col md:mb-[250px] sm:mb-[120px] small-500:mb-[120px] xl:gap-[250px] lg:gap-[120px] md:gap-[180px] small-500:gap-[120px]">
        <div className="w-full lg:pl-20 md:pl-10 sm:pl-0 small-500:pl-0 md:h-full">
          <Explore />
        </div>
        <div
          id="peer-to-peer"
          className="w-full lg:pl-[81px] lg:pr-20 md:px-20 px-4"
        >
          <Platform />
        </div>
        <div
          id="public-profile"
          className="w-full lg:pr-[115px] lg:pt-[60px] lg:pb-[50px] lg:pl-[81px] md:px-20 px-4"
        >
          <Public />
        </div>
        <div
          id="team-forming"
          className="w-full lg:pl-[81px] lg:pr-20 md:px-20 px-4"
        >
          <Team />
        </div>
        <div
          id="fundraising"
          className="w-full lg:pl-20 lg:pr-20 lg:pt-[60px] lg:pb-[53.6px] md:px-20 px-4"
        >
          <FundRaising />
        </div>
        <div
          id="private-chat"
          className="w-full lg:pt-[60px] lg:pb-[50px] lg:pl-[81px] lg:pr-20 md:px-20 px-4"
        >
          <PrivateChat />
        </div>
        <div
          id="sophisticated-database"
          className="w-full lg:pl-[81px] lg:pr-[115px] lg:pt-[60px] lg:pb-[53.6px] md:px-20 px-4"
        >
          <Database />
        </div>
        <div
          id="discount-portal"
          className="w-full lg:pl-[81px] lg:pt-[59px] lg:pb-[54.6px] lg:pr-20 md:px-20 px-4"
        >
          <Discount />
        </div>
        {/* more functions */}
        <div
          id="business-section"
          className="w-full lg:pl-[81px] lg:pr-20 lg:pt-[59px] lg:pb-[54.6px] md:px-20 px-4"
        >
          <Business />
        </div>
        <div
          id="board-match-section"
          className="w-full lg:pl-[81px] lg:pt-[59px] lg:pb-[54.6px] lg:pr-20 md:px-20 px-4"
        >
          <BoardMatching />
        </div>
        <div
          id="cofounder-section"
          className="w-full lg:pl-[81px] lg:pr-[115px] lg:pt-[60px] lg:pb-[53.6px] md:px-20 px-4"
        >
          <Cofounder />
        </div>
        <div
          id="explore-section"
          className="w-full lg:pl-[81px] lg:pr-[115px] lg:pt-[60px] lg:pb-[53.6px] md:px-20 px-4"
        >
          <ExploreTDB />
        </div>
      </div>
      <div className="w-full flex flex-col xl:gap-[100px] lg:gap-[200px] mb-[100px] sm:mb-[120px] sm:gap-[32px] small-500:mb-[120px] small-500:gap-[32px]">
        <div
          id="people-section"
          className="w-full lg:px-[81px] md:px-10 small-500:px-4"
        >
          <ThePeople />
        </div>
        <div
          id="professionals-section"
          className="w-full lg:px-[81px] md:px-10 small-500:px-4"
        >
          <TheProfessionals />
        </div>
        <div
          id="experts-section"
          className="w-full lg:px-[81px] md:px-10 small-500:px-4"
        >
          <TheExperts />
        </div>
        <div
          id="mentorship-section"
          className="w-full lg:pl-[81px] lg:pr-[110px] md:px-10 small-500:px-4"
        >
          <TheMentors />
        </div>
        <div
          id="management-consultant-section"
          className="w-full lg:px-[81px] md:px-10 small-500:px-4"
        >
          <TheManagement />
        </div>
        <div className="w-full py-[60px] bg-[#F8F8F8] flex flex-col xl:gap-[100px] md:gap-[200px] sm:gap-[32px] small-500:gap-[32px] small-500:py-2">
          <div className="w-full lg:pl-[81px] lg:pr-[110px] md:px-10 small-500:px-4">
            <ThePartners />
          </div>
          <div className="w-full lg:px-[81px] md:px-10 small-500:px-4">
            <TheInvestors />
          </div>
          <div className="w-full lg:px-[81px] md:px-10 small-500:px-4">
            <TheBlack />
          </div>
        </div>
      </div>
      <Tools />
    </div>
  );
};
