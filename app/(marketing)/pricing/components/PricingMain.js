'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';

import { Prices } from './Prices';
import {
  basicPlanDetails,
  premiumPlanDetails,
} from '../../../../data/marketing/PricingData';
import { CustomTab } from '../../../../components/marketing';
import {
  getSubscriptionPlanBasedOnProfileType,
  getUserProfileType,
} from '@/server-actions/signup';
const sizes = {
  sm: 'p-2 border-r-[8px] rounded-md text-sm',
  md: 'p-2.5 border-r-[10px] rounded-lg text-sm font-medium',
  lg: 'p-4 border-r-[16px] rounded-xl text-base',
};

const variants = {
  primary: 'border-transparent',
  outlined: 'select-wrapper',
};

export const PricingMain = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileTypeList, setProfileTypeList] = useState([]);
  const [basicPlans, setBasicPlans] = useState([]);
  const [premiumPlans, setPremiumPlans] = useState([]);

  const profileRef = useRef(null);
  const profileTypesRef = useRef([]);
  const [priceResult, setPriceResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const plans = [
    { plan: 'Monthly', free: '' },
    { plan: 'Quarterly', free: '1 month free' },
    { plan: 'Annually', free: '5 months free' },
  ];

  const ProfileSelect = ({
    name,
    options,
    size = 'md',
    variant = 'primary',
    className,
    ...props
  }) => {
    return (
      <select
        name={name}
        {...props}
        className={clsx(
          'outline-none',
          sizes[size],
          variants[variant],
          className
        )}
      >
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const handleTabChange = (index) => {
    setSelectedIndex(index);
  };
  const handleProfileTypeChange = async (event) => {
    const selectedProfileId = event.target.value;
    const profile = profileTypeList.find(
      (profile) => profile.id == selectedProfileId
    );
    setSelectedProfile(profile);
    await getSubscriptionPlansForProfile(selectedProfileId);
  };

  const planType = useMemo(() => {
    switch (selectedIndex) {
      case 0:
        return 'Monthly';
      case 1:
        return 'Quarterly';
      case 2:
        return 'Annually';
      default:
        return 'Monthly';
    }
  }, [selectedIndex]);

  const getSubscriptionPlansForProfile = useCallback(async (profileTypeId) => {
    const response = await getSubscriptionPlanBasedOnProfileType(profileTypeId);

    const standardPlans = response?.SubscriptionPlan.filter(
      (plan) => plan.SubscriptionId === 1
    );
    const premiumPlans = response?.SubscriptionPlan.filter(
      (plan) => plan.SubscriptionId === 2
    );

    setBasicPlans(standardPlans);
    setPremiumPlans(premiumPlans);
  }, []);

  const getUserProfileTypefunc = useMemo(() => {
    return async () => {
      try {
        if (profileTypesRef.current.length === 0) {
          const profileTypes = await getUserProfileType();
          const result = profileTypes.map((item) => ({
            id: item.Id,
            label: item.UserProfileName,
            value: item.UserProfileName,
          }));
          profileTypesRef.current = result;
          profileRef.current = result[0];

          setProfileTypeList(result);
          setSelectedProfile(result[0]);
          await getSubscriptionPlansForProfile(result[0].id);
          // setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  }, [getSubscriptionPlansForProfile]);

  useEffect(() => {
    getUserProfileTypefunc();
  }, [getUserProfileTypefunc]);

  console.log(
    basicPlans?.find((plan) => plan.Name === planType),
    basicPlans
  );

  return (
    <main className="pt-[88px] p-4 lg:px-16">
      <header className="flex justify-center flex-col items-center small-500:items-start ">
        <h2 className="text-blue-strong md:text-[48px] text-[28px] text-center  font-semibold  md:leading-[52.8px]  small-500:text-left w-full max-w-[799px] pb-[32px]">
          {' '}
          We have a plan that suits you perfectly!
        </h2>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 small-500:mx-0 w-full ">
          <ProfileSelect
            name="profileType"
            className="bg-[#F8F8F8] h-[50px] md:h-[62px] w-[300px] small-500:w-full !text-xl font-medium text-[#1B3C7B] pl-6 border-r-[24px] !rounded-[66px]"
            options={profileTypeList}
            onChange={handleProfileTypeChange}
            value={selectedProfile?.id}
          />
          <CustomTab
            selectedIndex={selectedIndex}
            setSelectedIndex={handleTabChange}
            tabList={plans}
            // className="w-full"
          />
        </div>
      </header>
      <Prices
        loading={loading}
        error={error}
        basicPlanList={basicPlans}
        premiumPlanList={premiumPlans}
        basicPlanDetails={basicPlanDetails}
        premiumPlanDetails={premiumPlanDetails}
        planType={planType}
        profile={selectedProfile}
      />
    </main>
  );
};
