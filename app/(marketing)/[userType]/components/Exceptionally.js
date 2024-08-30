'use client';

import { CustomTab } from '../../../../components/marketing';
import { programs, usersTypes } from '../../../../data/marketing';
import {
  accessTo,
  basicPlanDetails,
  premiumPlanDetails,
} from '../../../../data/marketing/PricingData';
import axios from 'axios';
import { clsx } from 'clsx';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const plans = [
  { plan: 'Monthly', free: '' },
  { plan: 'Quarterly', free: '1 month free' },
  { plan: 'Annually', free: '5 months free' },
];

export const Exceptionally = ({ userType }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);

  const [priceResult, setPriceResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIsOpenOne = () => {
    setIsOpenOne(!isOpenOne);
  };

  const handleIsOpenTwo = () => {
    setIsOpenTwo(!isOpenTwo);
  };

  const handleTabChange = (index) => {
    setSelectedIndex(index);
    const plan = plans[index].plan.toLowerCase();
    setSelectedPlan(plan);
  };
  const profile = useMemo(() => {
    if (userType === 'black-owned-businesses') {
      return 'Black-Owned Businesses';
    } else if (userType === 'management-consultants') {
      return 'Management Consultants';
    } else {
      return userType;
    }
  }, [userType]);
  useEffect(() => {
    const fetchSubscriptionPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          'https://api.orisuun.com/api/Marketing/GetSubscriptionPrice',
          {
            ProfileType: profile,
            PlanType: selectedPlan,
          },
          {
            headers: {
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data, 'success');
        setPriceResult(response?.data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
        console.log('attempted submit');
      }
    };

    fetchSubscriptionPrice();
  }, [profile, selectedPlan]);

  const basicPrice = priceResult?.Result[0]?.Price;
  const premiumPrice = priceResult?.Result[1]?.Price;
  return (
    <section className="p-4 py-16 lg:px-16">
      <div className="flex flex-col items-center w-full">
        <h3 className="text-blue-strong sm:text-[40px] text-[24px] leading-[44px] text-center font-semibold">
          Exceptionally Affordable
        </h3>
        <div className="my-8">
          <CustomTab
            selectedIndex={selectedIndex}
            setSelectedIndex={handleTabChange}
            tabList={plans}
          />
        </div>
        <div>
          {usersTypes.map((item, i) => (
            <div key={i}>
              {item?.userType === userType && (
                <div
                  className={clsx(
                    'grid grid-cols-1 gap-[40px] w-full',
                    item?.priceCards[selectedPlan]?.card1 &&
                      item?.priceCards[selectedPlan]?.card2 &&
                      'grid-cols-1 sm:grid-cols-2 w-full'
                  )}
                >
                  {item?.priceCards[selectedPlan]?.card1 && (
                    <div
                      tabindex="1"
                      className=" xl:w-[515px] !w-full cursor-default rounded-xl group relative"
                    >
                      <div className="bg-[#68A9DC] bg-[url('/userTypes/bg/arc.svg')] bg-no-repeat bg-right-bottom p-[40px] flex flex-col gap-5 rounded-xl border border-[#4C85BD] w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-1 w-full items-center  justify-between">
                          <p className="text-white sm:text-[24px] w-full sm:whitespace-normal whitespace-nowrap text-[18px] leading-[36px] font-semibold">
                            {item?.priceCards?.[selectedPlan]?.card1?.title}
                          </p>
                          <div
                            className=" size-[18px] relative justify-self-end  sm:hidden"
                            onClick={handleIsOpenOne}
                          >
                            {isOpenOne ? (
                              <Image
                                fill
                                src="/userTypes/up1.svg"
                                alt="arrow up"
                                className="!size-[18px]"
                              />
                            ) : (
                              <Image
                                fill
                                src="/userTypes/down1.svg"
                                alt="arrow up"
                                className="!size-[18px]"
                              />
                            )}
                          </div>
                        </div>
                        <p className="text-white font-medium text-[16px] leading-[17px]">
                          <span className="text-[40px] leading-[44px] font-semibold">
                            ${basicPrice}
                          </span>
                          {item?.priceCards?.[selectedPlan]?.card1?.period}
                        </p>
                        {selectedPlan !== 'monthly' && (
                          <div className="flex gap-[7px]">
                            <div className="bg-[#F2F7FC] border border-[#D5E8FA] text-[16px] text-[#2357C6] py-[2px] px-[12px] flex justify-center items-center font-medium leading-150 rounded-full">
                              {item?.priceCards[selectedPlan]?.card1?.button1}
                            </div>
                            <div className="bg-[#F2F7FC] border border-[#D5E8FA] text-[16px] text-[#2357C6] py-[2px] px-[12px] flex justify-center items-center font-medium leading-150 rounded-full">
                              {item?.priceCards[selectedPlan]?.card1?.button2}
                            </div>
                          </div>
                        )}
                      </div>
                      {
                        /* on mobile */
                        isOpenOne && (
                          <div
                            className={`block sm:hidden z-50  w-full mt-[12px] px-10 py-8 bg-white rounded-xl shadow-xl`}
                          >
                            <div className="flex flex-col gap-8">
                              <div>
                                <p className="mb-5 font-bold text-blue-strong">
                                  Functions
                                </p>
                                {basicPlanDetails?.functions.map((item, i) => (
                                  <div
                                    key={i}
                                    className={`flex items-center gap-4 ${
                                      item?.label ? 'mb-4' : 'mb-0'
                                    } `}
                                  >
                                    <Image
                                      src={item?.icon}
                                      alt="icon"
                                      width={16}
                                      height={16}
                                    />
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-text-gray">
                                        {item?.label}
                                      </p>
                                      <p className="text-xs font-medium text-nav-blue">
                                        {item?.coming}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <p className="mb-5 font-bold text-blue-strong">
                                  Access to
                                </p>
                                <div className="flex flex-col gap-4">
                                  {accessTo.map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-4"
                                    >
                                      <div className="border grid place-items-center border-[#D5E8FA] rounded-full h-[20px] w-[20px]">
                                        <Image
                                          src="/icons/check.svg"
                                          className=""
                                          alt="icon"
                                          width={10}
                                          height={10}
                                        />
                                      </div>
                                      <p className="text-sm font-medium text-text-gray">
                                        {item}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      <div
                        className={`absolute sm:group-hover:block hidden z-50 sm:group-focus:block w-full mt-[12px] px-10 py-8 bg-white rounded-xl shadow-xl`}
                      >
                        <div className="flex flex-col gap-8">
                          <div>
                            <p className="mb-5 font-bold text-blue-strong">
                              Functions
                            </p>
                            {basicPlanDetails?.functions.map((item, i) => (
                              <div
                                key={i}
                                className={`flex items-center gap-4 ${
                                  item?.label ? 'mb-4' : 'mb-0'
                                } `}
                              >
                                <Image
                                  src={item?.icon}
                                  alt="icon"
                                  width={16}
                                  height={16}
                                />
                                <div className="flex flex-col">
                                  <p className="text-sm font-medium text-text-gray">
                                    {item?.label}
                                  </p>
                                  <p className="text-xs font-medium text-nav-blue">
                                    {item?.coming}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div>
                            <p className="mb-5 font-bold text-blue-strong">
                              Access to
                            </p>
                            <div className="flex flex-col gap-4">
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
                                  <p className="text-sm font-medium text-text-gray">
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {item?.priceCards[selectedPlan]?.card2 && (
                    <div>
                      <div
                        tabindex="0"
                        className="bg-userType rounded-xl xl:w-[515px] w-full relative group"
                      >
                        <div className="bg-[url('/userTypes/bg/spike.svg')] flex flex-col gap-5 bg-no-repeat bg-right p-[40px] rounded-xl border border-[#4C85BD]">
                          <div className="grid grid-cols-2 sm:grid-cols-1 w-full items-center  justify-between">
                            <p className="text-white sm:text-[24px] w-full sm:whitespace-normal whitespace-nowrap small-500:whitespace-pre-wrap text-[18px] leading-[36px] font-semibold">
                              {item?.priceCards?.[selectedPlan]?.card2?.title}
                            </p>
                            <div
                              className=" size-[18px] relative justify-self-end  sm:hidden"
                              onClick={handleIsOpenTwo}
                            >
                              {isOpenTwo ? (
                                <Image
                                  fill
                                  src="/userTypes/up1.svg"
                                  alt="arrow up"
                                  className="!size-[18px]"
                                />
                              ) : (
                                <Image
                                  fill
                                  src="/userTypes/down1.svg"
                                  alt="arrow up"
                                  className="!size-[18px]"
                                />
                              )}
                            </div>
                          </div>
                          <p className="text-white font-medium text-[16px] leading-[17px]">
                            <span className="text-[40px] leading-[44px] font-semibold">
                              ${premiumPrice}
                            </span>
                            {item?.priceCards?.[selectedPlan]?.card2?.period}
                          </p>
                          {selectedPlan !== 'monthly' && (
                            <div className="flex gap-[7px]">
                              {item?.priceCards[selectedPlan]?.card2
                                ?.button1 && (
                                <div className="bg-[#F2F7FC] border border-[#D5E8FA] text-[16px] text-[#2357C6] py-[2px] px-[12px] flex justify-center items-center font-medium leading-150 rounded-full">
                                  {
                                    item?.priceCards[selectedPlan]?.card2
                                      ?.button1
                                  }
                                </div>
                              )}
                              {item?.priceCards[selectedPlan]?.card2
                                ?.button2 && (
                                <div className="bg-[#F2F7FC] border border-[#D5E8FA] text-[16px] text-[#2357C6] py-[2px] px-[12px] flex justify-center items-center font-medium leading-150 rounded-full">
                                  {
                                    item?.priceCards[selectedPlan]?.card2
                                      ?.button2
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {/* on mobile */}

                        <div
                          className={`absolute sm:group-hover:block hidden z-50 sm:group-focus:block w-full mt-[12px] px-10 py-8 bg-white rounded-xl shadow-xl`}
                        >
                          <div className="">
                            <p className="font-bold text-[16px] mb-5 leading-150 text-blue-strong">
                              Everything included in Visibility and
                              Collaboration, plus: {userType}
                            </p>
                            <div className="flex flex-col">
                              {premiumPlanDetails.map((item, i) => (
                                <div className="space-y-4" key={i}>
                                  {userType.replace(/-/g, '') ===
                                    item?.type
                                      .toLocaleLowerCase()
                                      .replace(/-/g, '')
                                      .replace(' ', '') &&
                                    item?.functions.map((data, j) => (
                                      <div
                                        key={j}
                                        className="flex items-start gap-4"
                                      >
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

                            <p className="mt-8 text-sm font-medium text-blue-strong">
                              *Requires Verification ($99/Lifetime)
                            </p>
                          </div>
                        </div>
                      </div>
                      {isOpenTwo && (
                        <div
                          className={`block sm:hidden z-50  w-full px-10 py-8 bg-white rounded-xl shadow-xl`}
                        >
                          <div className="">
                            <p className="font-bold text-[16px] mb-5 leading-150 text-blue-strong">
                              Everything included in Visibility and
                              Collaboration, plus: {userType}
                            </p>
                            <div className="flex flex-col">
                              {premiumPlanDetails.map((item, i) => (
                                <div className="space-y-4" key={i}>
                                  {userType.replace(/-/g, '') ===
                                    item?.type
                                      .toLocaleLowerCase()
                                      .replace(/-/g, '')
                                      .replace(' ', '') &&
                                    item?.functions.map((data, j) => (
                                      <div
                                        key={j}
                                        className="flex items-start gap-4"
                                      >
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

                            <p className="mt-8 text-sm font-medium text-blue-strong">
                              *Requires Verification ($99/Lifetime)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {usersTypes.map((item, i) => (
          <div key={i}>
            {item?.userType === userType && (
              <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-y-[60px] gap-y-12 py-8 relative">
                {item?.programs?.map((program, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:gap-[28px] gap-4 items-center md:items-start text-center md:text-start"
                  >
                    <div className="size-[40px] md:size-[52px] relative">
                      <Image src={program?.img} alt={program?.title} fill />
                    </div>
                    <div className="flex flex-col gap-2 md:gap-3">
                      <p className="text-blue-strong sm:text-[20px] text-[16px] leading-[26px] font-semibold">
                        {program?.title}
                      </p>
                      <p className="text-blu-ray-300 sm:text-[20px] text-[16px] leading-[30px] font-medium">
                        {program?.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
