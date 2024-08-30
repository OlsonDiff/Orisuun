'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '../../../../components/marketing/Button/Button';
import {
  accessTo,
  partnerPlan,
  partnerPlanDetails,
} from '../../../../data/marketing/PricingData';

export const Prices = ({
  basicPlanList,
  premiumPlanList,
  basicPlanDetails,
  premiumPlanDetails,
  loading,
  error,
  profile,
  planType,
}) => {
  const router = useRouter();

  const handleChoosePlan = (subscriptionType) => {
    router.push(
      `/signup?profile=${profile.id}&billingfrequency=${planType}&planType=${subscriptionType}`
    );
  };

  const basicPlanPrices = basicPlanList?.find((plan) => plan.Name === planType);
  const premiumPlanPrices = premiumPlanList?.find(
    (plan) => plan.Name === planType
  );

  const getBillingPeriodText = () => {
    if (planType === 'Monthly') return '/Month';
    if (planType === 'Quarterly') return '/Quarter';
    return '/Year';
  };

  const calculateSavings = (price, originalMonthlyPrice) => {
    let monthlyEquivalent;
    if (planType === 'Quarterly') {
      monthlyEquivalent = price / 3;
    } else if (planType === 'Annually') {
      monthlyEquivalent = price / 12;
    } else {
      return null; // No savings for monthly plan
    }

    const savedAmount = monthlyEquivalent.toFixed(2);
    const savedPercentage = (savedAmount / originalMonthlyPrice) * 100;

    return {
      amount: savedAmount,
      percentage: savedPercentage.toFixed(0),
    };
  };

  const renderSavings = (price, planList) => {
    const originalMonthlyPlan = planList?.find(
      (plan) => plan.Name === 'Monthly'
    );
    const savings = calculateSavings(price, originalMonthlyPlan?.Price);
    if (!savings) return null;
    return savings.amount; // Return the percentage
  };

  const renderSavingsPercentage = (price, planList) => {
    const originalMonthlyPlan = planList?.find(
      (plan) => plan.Name === 'Monthly'
    );
    const savings = calculateSavings(price, originalMonthlyPlan?.Price);
    if (!savings) return null;
    return savings.percentage; // Return the percentage
  };
  return (
    <section className="max-w-[784px] mx-auto small-500:mx-0 my-24 flex flex-col justify-center sm:flex-row gap-[100px] sm:gap-[40px]">
      {/* card 1 */}
      <div className="border border-[#D8D9D9] shadow-priceCard w-full md:w-[384px] mx-auto lg:mx-0 rounded-xl pt-8 pb-12">
        <div className="px-[30px] flex flex-col border-b pb-8 gap-4 items-center">
          <p className="text-[20px] text-[#34649E] font-semibold">
            Visibility and collaboration
          </p>
          {profile?.value === 'Partners' ? (
            <h4 className="text-[48px] font-semibold text-blue-strong">
              Contact Us
            </h4>
          ) : (
            <h4 className="text-[48px] font-semibold text-blue-strong">
              ${basicPlanPrices?.Price.toFixed(2)}
              <span className="text-base font-medium">
                {getBillingPeriodText()}
              </span>
            </h4>
          )}
          {planType !== 'Monthly' && (
            <div className="flex gap-3 items-center">
              <p className="text-[#177B4C] font-medium py-[2px] px-3 border border-[#B8DACA] bg-[#F2FCF8] rounded-[30px]">
                Save{' '}
                {renderSavingsPercentage(basicPlanPrices?.Price, basicPlanList)}
                %
              </p>
              <p className="text-[#5B657B] font-medium">
                ${renderSavings(basicPlanPrices?.Price, basicPlanList)}/Month
              </p>
            </div>
          )}
          <Button
            className="w-full bg-[#68A9DC]"
            onClick={() => handleChoosePlan('Standard')}
          >
            Choose Plan
          </Button>
        </div>
        <div className="px-[30px] pt-8 space-y-4">
          <p className="text-blue-strong font-bold">Functions</p>
          {profile?.value === 'Partners'
            ? partnerPlanDetails?.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Image src={item?.icon} alt="icon" width={16} height={16} />
                  <div>
                    <p className="text-sm text-text-gray font-medium">
                      {item?.label}
                    </p>
                    <p className="text-nav-blue text-xs font-medium">
                      {item?.coming}
                    </p>
                  </div>
                </div>
              ))
            : basicPlanDetails?.functions.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Image src={item?.icon} alt="icon" width={16} height={16} />
                  <div>
                    <p className="text-sm text-text-gray font-medium">
                      {item?.label}
                    </p>
                    <p className="text-nav-blue text-xs font-medium">
                      {item?.coming}
                    </p>
                  </div>
                </div>
              ))}
        </div>
        {profile?.value !== 'Partners' && (
          <div className="px-[30px] pt-8 space-y-4">
            <p className="text-blue-strong font-bold">Access to</p>
            {accessTo.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="border grid place-items-center border-[#D5E8FA] rounded-full h-[20px] w-[20px]">
                  <Image
                    src="/icons/check.svg"
                    className=""
                    alt="icon"
                    width={10}
                    height={10}
                  />
                </div>
                <p className="text-sm text-text-gray font-medium">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* card 2 */}

      {profile?.value !== 'Advocates' && profile?.value !== 'Partners' && (
        <div className="relative border-x border-b border-[#D8D9D9] shadow-priceCard w-full md:w-[384px] mx-auto lg:mx-0 rounded-b-xl pt-8 pb-12">
          <div className="absolute -top-10 left-0 w-full flex gap-3 items-center py-2.5 justify-center bg-premium rounded-t-xl ">
            <Image
              src="/icons/pricing/jet.svg"
              alt="jet.svg"
              width={16}
              height={16}
            />
            <p className="text-sm text-white font-medium">
              For those, who wants to move faster
            </p>
          </div>
          <div className="px-[30px] flex flex-col border-b pb-8 gap-4 items-center">
            <p className="text-[20px] leading-[26px] text-center text-[#2357C6] font-semibold">
              Growth, Visibility and Collaboration
            </p>
            <h4 className="text-[48px] font-semibold text-blue-strong">
              ${premiumPlanPrices?.Price.toFixed(2)}
              <span className="text-base font-medium">
                {' '}
                {getBillingPeriodText()}
              </span>
            </h4>
            {planType !== 'Monthly' && (
              <div className="flex gap-3 items-center">
                <p className="text-[#177B4C] font-medium py-[2px] px-3 border border-[#B8DACA] bg-[#F2FCF8] rounded-[30px]">
                  Save{' '}
                  {renderSavingsPercentage(
                    basicPlanPrices?.Price,
                    basicPlanList
                  )}
                  %
                </p>
                <p className="text-[#5B657B] font-medium">
                  ${renderSavings(basicPlanPrices?.Price, basicPlanList)}/Month
                </p>
              </div>
            )}
            <Button
              className="w-full bg-premium"
              onClick={() => handleChoosePlan('Premium')}
            >
              Choose Plan
            </Button>
          </div>
          <div className="px-[30px] pt-8 space-y-4">
            <p className="text-blue-strong font-bold">
              Everything included in Visibility and Collaboration, plus:
            </p>
            {premiumPlanDetails.map((item, i) => (
              <div className="space-y-4" key={i}>
                {profile?.value === item?.type &&
                  item?.functions.map((data, j) => (
                    <div key={j} className="flex items-start gap-4">
                      <Image
                        src={data?.icon}
                        alt="icon"
                        width={16}
                        height={16}
                      />
                      <p className="text-sm text-text-gray font-medium">
                        {data?.label}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          {profile?.value !== 'Partners' && (
            <p className="px-[30px] text-blue-strong mt-10 text-sm font-medium">
              *Requires Verification ($99/Lifetime)
            </p>
          )}
        </div>
      )}
    </section>
  );
};
