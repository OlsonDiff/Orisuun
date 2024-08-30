"use client";

import Image from "next/image";

import { Button } from "@/components";
import { accessTo } from "@/data/PricingData";
import { useJoinContext } from "@/context";
import { usePlanProfileContext } from "@/context/PlanProfileContext";

export const Prices = ({
  basicPlan,
  price = {},
  premiumPlan,
  isMonthly,
  loading,
  error,
  profile,
  planType,
}) => {
  const basicPrice = !loading ? price?.Result[0]?.Price : "0.00";
  const premiumPrice = !loading ? price?.Result[1]?.Price : "0.00";
  const { setOpenJoin } = useJoinContext();
  const {setProfile, setPlan} = usePlanProfileContext();

  const handleChoosePlan = () => {
    setProfile(profile);
    setPlan(planType);
    setOpenJoin(true);
  };
  return (
    <section className="max-w-[784px] mx-auto my-24 flex flex-col lg:flex-row gap-[100px] lg:gap-[40px]">
      <div className="border border-[#D8D9D9] shadow-priceCard w-[90%] md:w-[384px] mx-auto lg:mx-0 rounded-xl pt-8 pb-12">
        <div className="px-[30px] flex flex-col border-b pb-8 gap-4 items-center">
          <p className="text-[20px] text-[#34649E] font-semibold">
            Visibility and collaboration
          </p>
          <h4 className="text-[48px] font-semibold text-blue-strong">
            ${basicPrice}
            <span className="text-base font-medium">/Month</span>
          </h4>
          {!isMonthly && (
            <div className="flex gap-3 items-center">
              <p className="text-[#177B4C] font-medium py-[2px] px-3 border border-[#B8DACA] bg-[#F2FCF8] rounded-[30px]">
                Save 20%
              </p>
              <p className="text-[#5B657B] font-medium">$3.99/Month</p>
            </div>
          )}
          <Button className="w-full bg-[#68A9DC]" onClick={handleChoosePlan}>
            Choose Plan
          </Button>
        </div>
        <div className="px-[30px] pt-8 space-y-4">
          <p className="text-blue-strong font-bold">Functions</p>
          {basicPlan?.functions.map((item, i) => (
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
      </div>

      {/* card 2 */}

      <div className="relative border-x border-b border-[#D8D9D9] shadow-priceCard w-[90%] md:w-[384px] mx-auto lg:mx-0 rounded-b-xl pt-8 pb-12">
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
            ${premiumPrice}
            <span className="text-base font-medium">/Month</span>
          </h4>
          {!isMonthly && (
            <div className="flex gap-3 items-center">
              <p className="text-[#177B4C] font-medium py-[2px] px-3 border border-[#B8DACA] bg-[#F2FCF8] rounded-[30px]">
                Save 20%
              </p>
              <p className="text-[#5B657B] font-medium">$3.99/Month</p>
            </div>
          )}
          <Button className="w-full bg-premium" onClick={handleChoosePlan}>
            Choose Plan
          </Button>
        </div>
        <div className="px-[30px] pt-8 space-y-4">
          <p className="text-blue-strong font-bold">
            Everything included in Visibility and Collaboration, plus:
          </p>
          {premiumPlan?.functions.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <Image src={item?.icon} alt="icon" width={16} height={16} />
              <p className="text-sm text-text-gray font-medium">
                {item?.label}
              </p>
            </div>
          ))}
        </div>
        <p className="px-[30px] text-blue-strong mt-10 text-sm font-medium">
          *Requires Verification ($99/Lifetime)
        </p>
      </div>
    </section>
  );
};
