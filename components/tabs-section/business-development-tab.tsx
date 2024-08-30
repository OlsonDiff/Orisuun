import React from 'react';
import BusinessDevelopmentCard from '../cards/business-development-card';
import { useSelector } from 'react-redux';
import { RootState } from '@/data/store';

const BusinessDevelopmentTab = () => {
  const { profileData } = useSelector((state: RootState) => state.user);
  return (
    <div className="w-full grid grid-cols-12 gap-5">
      {profileData.BdList?.map((BD, index) => (
        <BusinessDevelopmentCard index={index} key={index} data={BD} />
      ))}
    </div>
  );
};

export default BusinessDevelopmentTab;
