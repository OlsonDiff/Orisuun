'use client';
import { cn } from '@/utils/utils';
import React, { useState } from 'react';
import ProfileSectionCard from './sections/profile-section-card';
import BusinessDevelopmentPost from './sections/business-development-post';
import CofounderMatch from './sections/cofounder-match';

const tabs = [
  {
    id: 'profiles',
    name: 'Profiles',
  },
  {
    id: 'business-development-posts',
    name: 'Business Development Posts',
  },
  {
    id: 'cofounder-match',
    name: 'Co-Founder Match',
  },
  {
    id: 'board-of-directors-member-match',
    name: 'Board of Directors Member Match',
  },
];

const Favourites = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  console.log('work');

  const renderContent = () => {
    switch (selectedTab) {
      case 'profiles':
        return <ProfileSectionCard />;
      case 'business-development-posts':
        return <BusinessDevelopmentPost />;
      case 'cofounder-match':
        return <CofounderMatch />;
      case 'board-of-directors-member-match':
        return <div>Board of Directors Member Match Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="md:p-6 w-full">
      <div className="w-full flex items-center gap-6">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={cn(
              'border-b-2 cursor-pointer',
              selectedTab === tab.id
                ? 'border-omblue-600'
                : 'border-transparent'
            )}
            onClick={() => setSelectedTab(tab.id)}
          >
            <p
              className={cn(
                'px-4 py-3 text-h8 2xl:text-scaled-h8',
                selectedTab === tab.id
                  ? 'text-omblue-600 font-semibold'
                  : 'text-[#797B82] font-medium'
              )}
            >
              {tab.name}
            </p>
          </div>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default Favourites;
