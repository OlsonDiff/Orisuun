import React from 'react';
import Chip from '../ui/chip';
import AccountTree from '@/icons/account-tree';
import Distance from '@/icons/cofounder/distance';
import Handyman from '@/icons/handyman';
import CalenderClock from '@/icons/calender-clock';
import Image from 'next/image';
import Consultant from '@/icons/consultant';
import Favourite from '@/icons/favourite';
import Eye from '@/icons/eye';
import { cn } from '@/utils/utils';

const BusinessDevelopmentCard = ({ index, data }: { index: number, data?: any }) => {
  return (
    <div key={index} className="col-span-12 md:col-span-6">
      <div className="p-4 border border-grey-600 rounded-md space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-olblue-900">
            {data.StrategyName}
          </h5>
          <p
            className={cn(
              'text-h7 2xl:text-scaled-h7 font-semibold',
              data.bdtype == 'Seeking' ? 'text-olblue-500' : 'text-green-500'
            )}
          >
            {data.bdtype == 'Seeking' ? 'We Are Seeking' : 'We Can Facilitate'}
          </p>
        </div>
        <div className="flex items-center gap-2 pb-1">
          {
            data.bDTacticsSelections.map((tactic, index) => (

              <Chip key={index} text={tactic.TacticsName} className="" />
            ))
          }
        </div>
        <div className="grid grid-cols-12 gap-4 pb-4">
          <div className="flex items-start gap-2 col-span-6">
            <AccountTree className="w-6 h-6 text-omblue-500" />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
              Requesting Proposals
            </p>
          </div>
          <div className="flex items-start gap-2 col-span-6">
            <Distance className="w-6 h-6 text-omblue-500" />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
              {data.RegionName}
            </p>
          </div>
          <div className="flex items-start gap-2 col-span-6">
            <Handyman className="w-6 h-6 text-omblue-500" />
            <div>
              <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                Oilseed and Grain Farming
              </p>
              <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                Vegetable and Melon Farming
              </p>
              <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                Fruit and Tree Nut Farming
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 col-span-6">
            <CalenderClock className="w-6 h-6 text-omblue-500" />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
              {data.timeLine}
            </p>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-1/2">
            <div className="bg-profile-frame p-0.5 w-11 h-11 rounded-full flex items-center justify-center relative">
              <Image
                src={
                  'https://s3-alpha-sig.figma.com/img/d0cd/3adb/501c64c1b4cf766de6abb9fe8925fb5f?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mOviZVn7m1jIJBuoIHL0lfnGOLjWk1v25WirMfDSbMS6yzVVw55MjsftxrIt5QV5HssskRi0H2QZlng3GJSXamxa8Ge9rkGdVro5u~wOU2b55huiebIlTLB~5e9k3nKcotFmQ598SAChJndiCeHAExueRZUDItXwVwLDGNyUPtgRjWnSMXSrSSthzJysJI-AsKjL0pKe4UC68Wg4KyH~fhAPyWJvvVHTIVbI8w5hL7625I3QuOEe9m1Zyb3p1GmC-ut1QH-V5626ZnAzLFy-q6umgLZpJ0qubKm2421ZNsMKwkill~YPUbRmVnYpAa~Holv3Ev74CKFa8ldFTTaqHQ__'
                }
                alt="image"
                width={44}
                height={44}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="space-y-1">
              <p className="text-h8 2xl:text-scaled-h8 text-black-500 font-bold">
                Miles Freeman
              </p>
              <div className="flex items-center gap-1.5">
                <Consultant className="w-4 h-4 text-omblue-500" />
                <p className="text-blue-300 text-h10 2xl:text-scaled-h10 font-medium">
                  Consultant
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-end gap-4">
            <div className="w-10 h-10 flex items-center justify-center border border-green-500 bg-green-50 rounded-full p-2">
              <Favourite className="w-5 h-5 text-green-500 " />
            </div>
            <button className="flex items-center gap-2 border border-omblue-100 px-5 py-3.5 rounded-md">
              <Eye className="w-4 h-4 text-omblue-500" />
              <p className="text-h9 2xl:text-scaled-h9 text-omblue-500 font-medium">
                View Profile
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDevelopmentCard;
