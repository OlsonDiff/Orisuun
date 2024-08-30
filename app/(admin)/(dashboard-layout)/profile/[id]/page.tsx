'use client';

import ChevronRight from '@/icons/chevron-right';
import EditIcon from '@/icons/edit-icon';
import Share from '@/icons/share';
import Star from '@/icons/star';
import Trash from '@/icons/trash';
import Users from '@/icons/users';
import StyledTick from '@/icons/verification/styled-tick';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import tanzania from '@/public/countries/tanzania-flag.png';
import Tooltip from '@/components/ui/tooltip';
import Youtube from '@/icons/socials/youtube';
import X from '@/icons/socials/x';
import Facebook from '@/icons/socials/facebook';
import Instagram from '@/icons/socials/instagram';
import Linkedin from '@/icons/socials/linkedin';
import { cn, getProfileTypeCategory } from '@/utils/utils';
import OverviewTab from '@/components/tabs-section/overview';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import Reviews from '@/components/tabs-section/reviews';
import Credentials from '@/components/tabs-section/credentials';
import Fundamentals from '@/components/tabs-section/fundamentals';
import Funds from '@/components/tabs-section/funds';
import BusinessDevelopmentTab from '@/components/tabs-section/business-development-tab';
import SkillsAndExperience from '@/components/tabs-section/skills-and-experience';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import {
  getBusinessProfileDetailsByUserId,
  getIndividualProfileDetailsByUserId,
} from '@/server-actions/profile';
import { addProfileData } from '@/data/slices/user-slice';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import BlackOwnedBusinessIcon from '@/icons/profile-types/black-owned-business-icon';
import ExpertsIcon from '@/icons/profile-types/experts-icon';
import MentorsIcon from '@/icons/profile-types/mentors-icon';
import ProfessionalsIcon from '@/icons/profile-types/professionals-icon';
import ConsultantIcon from '@/icons/profile-types/consultant-icon';
import InvestorsIcon from '@/icons/profile-types/investors-icon';
import AdvocatesIcon from '@/icons/profile-types/advocates-icon';
import Add from '@/icons/add';
import Link from 'next/link';
import axios from 'axios';

const icons = {
  'Black-owned Businesses': (
    <BlackOwnedBusinessIcon className="text-omblue-500 w-5 h-5" />
  ),
  Experts: <ExpertsIcon className="text-omblue-500 w-5 h-5" />,
  Mentors: <MentorsIcon className="text-omblue-500 w-5 h-5" />,
  Professionals: <ProfessionalsIcon className="text-omblue-500 w-5 h-5" />,
  Consultant: <ConsultantIcon className="text-omblue-500 w-5 h-5" />,
  Investors: <InvestorsIcon className="text-omblue-500 w-5 h-5" />,
  Advocates: <AdvocatesIcon className="text-omblue-500 w-5 h-5" />,
};

const TABS = [
  { id: 'overview', name: 'Overview', notification: 0 },
  { id: 'fundamentals', name: 'Fundamentals', notification: 0 },
  { id: 'credentials', name: 'Credentials', notification: 7 },
  { id: 'reviews', name: 'Reviews', notification: 2 },
  {
    id: 'business-development-opportunities',
    name: 'Business Development Opportunities',
    notification: 3,
  },
  { id: 'fundraising-campaign', name: 'Fundraising Campaign', notification: 0 },
  { id: 'skills-and-experience', name: 'Skills & Experience', notification: 0 },
];

const renderTabContent = (selectedTab: string) => {
  switch (selectedTab) {
    case 'overview':
      return <OverviewTab />;
    case 'credentials':
      return <Credentials />;
    case 'reviews':
      return <Reviews />;
    case 'fundamentals':
      return <Fundamentals />;
    case 'fundraising-campaign':
      return <Funds />;
    case 'business-development-opportunities':
      return <BusinessDevelopmentTab />;
    case 'skills-and-experience':
      return <SkillsAndExperience />;
    default:
      return null;
  }
};

interface PageProps {
  params: { id: string };
  searchParams: { userProfileTypeId: string };
}

const Profile = ({ params, searchParams }: PageProps) => {
  const { currentUser, profileData } = useSelector(
    (state: RootState) => state.user
  );
  const [selectedTab, setSelectedTab] = useState(TABS[0].id);
  const isMobile = useMobileMediaQuery();

  const dispatch = useDispatch();


  const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
    ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
    : 'https://api.orisuun.com/api';

  const fetchProfileData = useCallback(async () => {
    // if (!currentUser?.UserId) return;

    // const profileType = getProfileTypeCategory(currentUser.UserProfileType);

    // let response;
    try {
      const response = await axios.post(
        `${apiEndpoint}/Profile/ViewUserProfileV1`,
        {
          UserId: JSON.parse(localStorage.getItem("userData")).Id,
          UserProfileDetailId: 1,
          UserName: JSON.parse(localStorage.getItem("userData")).UserName,
        },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      );
      if (response.status === 200) {
        dispatch(addProfileData(response.data.Result));
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast('Failed to load profile data', { type: 'error' });
    }


  }, [dispatch, params.id]);

  useEffect(() => {
    fetchProfileData();
    // if (currentUser) {
    // }
  }, [currentUser, fetchProfileData]);

  if (!profileData) {
    return <Loader />;
  }
  console.log(profileData, "profileData");


  return (
    <div className="px-4 py-6 md:p-6 overflow-x-hidden">
      <div className="grid grid-cols-12 gap-10 mb-20">
        <div className="col-span-12 md:col-span-6">
          <div className="flex items-start gap-6">
            <div className="bg-profile-frame p-1 w-20 h-20 md:w-36 md:h-36 rounded-full flex items-center justify-center relative">
              <Image
                src={`${profileData.ProfilePicture}`}
                alt={profileData.CompanyName}
                width={isMobile ? 64 : 148}
                height={isMobile ? 64 : 148}
                className="w-full h-full rounded-full"
              />

              <div className="absolute bottom-2 md:bottom-7 -left-1.5 border border-warning-600 bg-warning-50 text-warning-600 rounded-full p-1">
                <Star className="w-3 h-3 md:w-5 md:h-5" />
              </div>
            </div>
            <div className="space-y-3 mt-1">
              <div className="flex items-center gap-2.5">
                <h3 className="text-h5 md:text-h3 2xl:text-scaled-h3 font-bold text-black-500 text-wrap capitalize">
                  {profileData.CompanyName ||
                    profileData.Name}
                </h3>
                <Tooltip content={profileData.CountryOfOrigin}>
                  {/* <Image
                    src={profileData.BasicInfo.CountryOfOrigin}
                    alt={profileData.BasicInfo.CountryOfOrigin}
                    className="xs:w-5 xs:h-5 2xl:w-scaled-5 2xl:h-scaled-5"
                  /> */}
                  <>{profileData.CountryOfOrigin}</>
                </Tooltip>
              </div>
              <p className="text-h7 2xl:text-scaled-h7 font-medium text-blue-300">
                {profileData.Tagline ||
                  profileData.WorkTitle}
              </p>
              <div className="flex items-center gap-2">
                {icons[profileData.UserProfileType]}
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                  {profileData.UserProfileType}
                </p>
              </div>
              {currentUser?.isVerified ? (
                <div className="flex items-center gap-2 text-[#1A9E78]">
                  <StyledTick className="xs:w-5 xs:h-5 2xl:w-scaled-5 2xl:h-scaled-5" />
                  <p className="text-h9 2xl:text-scaled-h9 font-medium">
                    Verified
                  </p>
                </div>
              ) : (
                <div className="text-[#E88206] flex items-center gap-2 py-1">
                  <div className="p-0.5 flex items-center justify-center rounded-full bg-[#E88206] text-white">
                    <Add className="rotate-45 w-5 h-5" />
                  </div>
                  <p className="text-h9 2xl:text-scaled-h9 font-medium">
                    Not Verified
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 space-y-4">
          <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
            About{' '}
            {profileData.CompanyName || profileData.Name}
          </h6>
          <div className="text-black-300 text-h8 2xl:text-scaled-h8 font-medium space-y-4">
            <p className="">
              {profileData.AboutCompany || profileData.AboutYou}
            </p>
            <ul className="list-disc space-y-1 ps-4">
              {profileData.CompanyDetails &&
                profileData.CompanyDetails?.map(
                  (detail: string, index: number) => (
                    <li key={index}>{detail}</li>
                  )
                )}
              {profileData.AdditionalAboutYou &&
                profileData.AdditionalAboutYou?.map(
                  (detail: string, index: number) => (
                    <li key={index}>{detail}</li>
                  )
                )}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {profileData.SocialMediaLinks &&
              profileData.SocialMediaLinks?.map(
                (social: { LinkType: string; Url?: string }, index: number) => {
                  switch (social.LinkType) {
                    case 'Youtube':
                      return (
                        <Link key={index} href={social.Url}>
                          <Youtube />
                        </Link>
                      );
                    case 'Facebook':
                      return (
                        <Link key={index} href={social.Url}>
                          <Facebook />
                        </Link>
                      );
                    case 'Linkedin':
                      return (
                        <Link key={index} href={social.Url}>
                          <Linkedin />;
                        </Link>
                      );
                    case 'Twitter':
                      return (
                        <Link key={index} href={social.Url}>
                          <X />;
                        </Link>
                      );
                    case 'Instagram':
                      return (
                        <Link key={index} href={social.Url}>
                          <Instagram />;
                        </Link>
                      );
                    default:
                      return null;
                  }
                }
              )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0 overflow-x-auto hide-scrollbar mb-10">
        {TABS?.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              'px-4 py-3 border-b text-h8 2xl:text-scaled-h8 flex items-center gap-2 cursor-pointer',
              selectedTab === tab.id
                ? 'border-omblue-600 text-omblue-600 font-semibold'
                : 'border-transparent text-[#797B82] font-medium'
            )}
            style={{
              fontVariationSettings:
                selectedTab === tab.id ? "'wght' 600" : "'wght' 500",
              textRendering: 'optimizeLegibility',
            }}
            onClick={() => setSelectedTab(tab.id)}
          >
            <p className="w-max">{tab.name}</p>
            {tab.notification > 0 && (
              <p className="bg-[#F3F4F7] rounded-full text-blue-400 w-5 h-5 p-2 flex items-center justify-between text-h10 2xl:text-scaled-h10">
                {tab.notification}
              </p>
            )}
          </div>
        ))}
      </div>
      {renderTabContent(selectedTab)}
    </div>
  );
};

export default Profile;
