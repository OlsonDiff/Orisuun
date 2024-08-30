'use client';

import ProfileCard from '@/components/cards/profile-card';
import Loader from '@/components/loader';
import { setOpenSidebar } from '@/data/slices/common-slice';
import { RootState } from '@/data/store';
import Eye from '@/icons/eye';
import AdvocatesIcon from '@/icons/profile-types/advocates-icon';
import BlackOwnedBusinessIcon from '@/icons/profile-types/black-owned-business-icon';
import ConsultantIcon from '@/icons/profile-types/consultant-icon';
import ExpertsIcon from '@/icons/profile-types/experts-icon';
import InvestorsIcon from '@/icons/profile-types/investors-icon';
import MentorsIcon from '@/icons/profile-types/mentors-icon';
import ProfessionalsIcon from '@/icons/profile-types/professionals-icon';
import Hamburger from '@/icons/sidebar/hamburger';
import ThreeDots from '@/icons/three-dots';
import { getAllProfilesListOfUser } from '@/server-actions/createProfile';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const icons = {
  'Black-owned Businesses': (
    <BlackOwnedBusinessIcon className="w-4 h-4 text-omblue-600" />
  ),
  Experts: <ExpertsIcon className="w-4 h-4 text-omblue-600" />,
  Mentors: <MentorsIcon className="w-4 h-4 text-omblue-600" />,
  Professionals: <ProfessionalsIcon className="w-4 h-4 text-omblue-600" />,
  Consultant: <ConsultantIcon className="w-4 h-4 text-omblue-600" />,
  Investors: <InvestorsIcon className="w-4 h-4 text-omblue-600" />,
  Advocates: <AdvocatesIcon className="w-4 h-4 text-omblue-600" />,
};

const Profiles = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [profileList, setProfileList] = useState([]);

  const dispatch = useDispatch();

  const fetchDetails = useCallback(async () => {
    if (currentUser && !currentUser.UserId) return;
    try {
      const response = await getAllProfilesListOfUser(currentUser.UserId);
      if (response.success) {
        setProfileList(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast('Failed to load profile data', { type: 'error' });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchDetails();
    }
  }, [currentUser, fetchDetails]);

  if (profileList.length < 1) {
    return <Loader />;
  }

  return (
    <div className="px-2 py-5 md:p-6">
      <div className="w-full flex items-center gap-4 justify-between mb-6">
        <Hamburger
          className="md:hidden"
          onClick={() => dispatch(setOpenSidebar())}
        />
        <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500 flex-grow text-center md:text-left">
          Profiles
        </h6>
        <Link
          href={'/my-profiles/new-profile'}
          className="hidden md:flex px-4 py-3 rounded-md bg-omblue-500 text-white 2xl:max-w-[calc(170px*var(--scale-factor))] max-w-[170px] font-semibold disabled:bg-omblue-50 disabled:text-omblue-200"
        >
          Add Profile
        </Link>
        <Image
          src=""
          alt="user"
          width={32}
          height={32}
          className="rounded-full md:hidden"
        />
      </div>
      <Link
        href="/my-profiles/new-profile"
        className="md:hidden flex justify-end mb-6 w-full"
      >
        <button className="px-4 py-3 rounded-md bg-omblue-500 text-white 2xl:max-w-[calc(170px*var(--scale-factor))] max-w-[170px] font-semibold disabled:bg-omblue-50 disabled:text-omblue-200">
          Add Profile
        </button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {profileList.map((profile, index) => (
          <div
            key={index}
            className="border border-grey-600 rounded-md col-span-1 p-4 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4"
          >
            <ProfileCard
              name={profile.Name}
              icon={icons[currentUser.UserProfileType]}
              isImage={false}
              image={`${process.env.NEXT_PUBLIC_MEDIA_URL}/user-profile/${profile.ProfilePicture}`}
              company={currentUser.UserProfileType}
            />

            <div className="flex items-center gap-2 w-full xl:w-auto">
              <Link href={`/my-profiles/view-profile/${profile.Id}`}>
                <button className="flex-grow w-full flex items-center justify-center gap-0.5 text-omblue-600 border border-omblue-100 p-3 rounded-md">
                  <Eye className="w-6 h-6" />
                  <p className="text-h9 2xl:text-scaled-h9 font-medium">
                    View Profile
                  </p>
                </button>
              </Link>
              <button className="flex items-center gap-0.5 border border-omblue-100 rounded-full text-omblue-600 p-2">
                <ThreeDots />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
