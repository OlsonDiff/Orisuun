import React, { useState } from 'react';
import WorkDescription from '../work-description';
import Attachments from '../attachments';
import ProfileCard from '../cards/profile-card';
import { cn } from '@/utils/utils';
import Image from 'next/image';

const messages = [
  { text: `Absolutely! I'd be happy to assist you.` },
  {
    text: `I see you're interested in market penetration in Southern California.`,
  },
  {
    text: `Exactly. I'm thinking we can adapt our product just a little for California taste, but I don't know what the approach should look like.`,
  },
  {
    text: `Of course. You're on the right track. I've done exactly what you're talking about a few times. Are you available for a video call?`,
  },
  { text: `Absolutely! How about at 4pm EST?` },
  { text: `Yes, that works. I'll send you an invite.` },
];

const ContractOverview = ({ admin = false, selectedSection = 0 }) => {
  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file.name);
  };
  return (
    <>
      {selectedSection === 0 && (
        <>
          <WorkDescription
            title="Headline description of work"
            description="This is for a full SaaS website with a subscription-based platform  Changes are for desktop and mobile versions  Quick turnaround for design: - payment screen, including PayPal, ACH, Apple Pay, Google Pay - pricing page  Quick turnaround for redesign and touch up of: - menu/navigation system - member type explanation pages - homepage  Need illustrations to showcase our platform  Need dynamic and adaptive design for desktop and mobile"
            amount="$1,000"
            status="In Progress"
            expiryDate="05 Jan, 2024"
          />
          <Attachments onFileSelect={handleFileSelect} />
        </>
      )}
      {selectedSection === 1 && (
        <div className="space-y-4 w-full pe-4">
          {messages.map((message, index) => {
            return (
              <div
                className="flex items-center gap-4 text-black-500"
                key={index}
              >
                <Image
                  src="https://s3-alpha-sig.figma.com/img/dac5/a3ff/5be85d0f6bc0bd1a076017beb8ff1fd5?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hRU7BuxPw6dLRlu11a1lvCq5kqNtuJzOgTbSw6aJ0B-5NJ3f-4RpcweDywp6~-rBJB9WMTn2Qu2Vkcl1Zleq2dxHKHZiBKqv8uZrSU5pdk8RVIMXfBA3yFLHzIVc2npq80BUQ6YC2c1Bj1IVbPweOy2zVwYacztjf-uJTZKBUtLkLcN3QnP-uwGAOyu6AD4ZMJ1BrMwOtEmjNIwhEi4-MZPrlllgmcJOVuy8MljsvWrkou~OsICxeplqF40DjMi7tTZT0VYZR-sDXpePVqPP9R4K9liInCdKf771ifdUCKZVLwndIWy5nRUHykiiERf8Ozd7qtlbF6lKroa8h5PlIQ__"
                  alt="user"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div
                  className={cn(
                    'p-3 rounded-md flex w-full items-start gap-2 justify-between',
                    index % 2 === 0 ? 'bg-olblue-50' : 'bg-grey-500'
                  )}
                >
                  <p className="w-[calc(100%-5rem)]">{message.text}</p>
                  <p
                    className={cn(
                      'w-20 text-end',
                      index % 2 === 0 ? 'text-olblue-500' : 'text-black-200'
                    )}
                  >
                    02:15 PM
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ContractOverview;
