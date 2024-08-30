import React, { useState } from 'react';
import CircleHalfDotted from './icons/circle-half-dotted';
import Nodes from './icons/nodes';
import UserSearch from './icons/user-search';
import Earth from './icons/earth';
import CellPhone from '@/icons/cofounder/cell-phone';
import MailEmail from '@/icons/cofounder/mail-email';
import AlarmClock from './icons/alarm-clock';
import UsersBasic from './icons/users-basic';
import Calendar from '@/icons/cofounder/calendar';
import Language from './icons/language';
import Handyman from '@/icons/handyman';
import CorporateFare from '@/icons/cofounder/corporate-fare';
import { cn } from '@/utils/utils';
import ImageIcon from './icons/image-icon';
import VideoIcon from './icons/video-icon';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Video from 'yet-another-react-lightbox/plugins/video';

const tabs = [
  {
    name: 'All',
    icon: null,
  },
  {
    name: 'Photos',
    icon: <ImageIcon className={'w-6 h-6'} />,
  },
  {
    name: 'Videos',
    icon: <VideoIcon className={'w-6 h-6'} />,
  },
];

const OverviewTab = () => {
  const { profileData } = useSelector((state: RootState) => state.user);
  console.log(profileData, 'Profile');

  const [selectedTab, setSelectedTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // const photos = profileData.BusinessPhotos || [];
  // const videos = profileData.BusinessVideos || [];

  // Filter based on the selected tab
  const allMedia = [
    ...(profileData.BusinessPhotos?.map(
      (photo: { ProfilePicture: string }) => ({
        type: 'image',
        url: photo.ProfilePicture,
      })
    ) || []),
    ...(profileData.BusinessVideos?.map((video: { ProfileVideo: string }) => ({
      type: 'video',
      url: video.ProfileVideo,
    })) || []),
  ];
  console.log(allMedia, profileData, 'allMedia');

  // Filter based on the selected tab
  const filteredItems = allMedia?.filter(
    (item) =>
      selectedTab === 0 || item.type === (selectedTab === 1 ? 'image' : 'video')
  );
  console.log(filteredItems, 'filteredItems');
  const handleItemClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // if (!profileData.AdditionalInfo) return null;
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-12 md:col-span-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CircleHalfDotted className="text-omblue-500" />
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
              Orissun Member Since:
            </h6>
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-omblue-500">
              {profileData.BusinessSince || new Date().getFullYear()}
            </h6>
          </div>
          <div className="flex items-center gap-2">
            <UserSearch className="text-omblue-500" />
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
              Black ownership percentage:
            </h6>
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-omblue-500">
              {profileData.BlackOwnerShipPercentage}
            </h6>
          </div>
          <div className="flex items-center gap-2">
            <Nodes className="text-omblue-500" />
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
              Ethnicity of Black ownership
            </h6>
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-omblue-500"></h6>
            {/* Todo add ethinicity */}
          </div>

          <div className="grid grid-cols-12 gap-4 pt-4">
            <div className="col-span-12 md:col-span-6 space-y-3">
              <div className="flex items-center gap-2">
                <Earth className={'text-omblue-500 w-6 h-6'} />
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                  {profileData.WebsiteURL}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CellPhone className={'text-omblue-500 w-6 h-6'} />
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                  {profileData.PhoneNumber}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MailEmail className={'text-omblue-500 w-6 h-6'} />
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                  {profileData.UserEmailId}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <AlarmClock className={'text-omblue-500 w-6 h-6'} />
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                  {profileData.Hours}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <UsersBasic className={'text-omblue-500 w-6 h-6'} />
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                  {profileData.NumberOfEmployess}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className={'text-omblue-500 w-6 h-6'} />
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                  In Business Since {profileData.BusinessSince}
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 space-y-3">
              <div className="flex items-start gap-2">
                <Language className={'text-omblue-500 w-6 h-6'} />
                <ul className="list-none space-y-3">
                  {profileData?.Languages?.map((language, index) => (
                    <li className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500" key={index}>
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-start gap-2">
                <Handyman className={'text-omblue-500 w-6 h-6'} />
                <ul className="list-none space-y-3">
                  <li className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                    Oilseed and Grain Farming
                  </li>
                  <li className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                    Vegetable and Melon Farming
                  </li>
                  <li className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                    Fruit and Tree Nut Farming
                  </li>
                </ul>
              </div>
              <div className="flex items-start gap-2">
                <CorporateFare className={'text-omblue-500 w-6 h-6'} />
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                  {profileData.BussinessType}
                </p>
              </div>
            </div>
            <div className="col-span-12 flex items-start gap-3">
              {/* <CircleHalfDotted className="text-omblue-500" /> */}
              <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
                Location:
              </h6>
              <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500 break-all">
                {profileData.Address}
              </h6>
              <a
                target="_blank"
                href={`https://www.google.com/maps?q=${encodeURIComponent(
                  profileData.Address
                )}`}
                rel="noreferrer"
                className="text-h6 2xl:text-scaled-h6 font-semibold text-omblue-500 underline whitespace-nowrap"
              >
                See on map
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="space-y-4">
          <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
            Gallery
          </h6>
          <div className="flex items-center gap-0 overflow-x-auto hide-scrollbar mb-10">
            {tabs?.map((tab, index) => (
              <div
                key={index}
                className={cn(
                  'min-w-[60px] px-4 py-3 border-b text-h8 2xl:text-scaled-h8 flex items-center gap-2 cursor-pointer',
                  selectedTab === index
                    ? 'border-omblue-600 text-omblue-600 font-semibold'
                    : 'border-transparent text-[#797B82] font-medium'
                )}
                style={{
                  fontVariationSettings:
                    selectedTab === index ? "'wght' 600" : "'wght' 500",
                  textRendering: 'optimizeLegibility',
                }}
                onClick={() => setSelectedTab(index)}
              >
                {tab.icon ?? null}
                <p>{tab.name}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-4">
            {filteredItems &&
              filteredItems?.map((item, index) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-6"
                  onClick={() => handleItemClick(index)}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.url}
                      alt="placeholder image"
                      width={260}
                      height={170}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full aspect-w-16 aspect-h-9">
                      <iframe
                        src={item.url}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-md"
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {lightboxOpen && (
            <div
              className="custom-lightbox-container"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 999,
                margin: 0,
              }}
            >
              <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={filteredItems?.map((item) => ({
                  type: item.type,
                  src: item.url,
                }))}
                plugins={[Video]}
                index={lightboxIndex}
                styles={{
                  container: {
                    width: '80vw',
                    height: '80vh',
                    margin: 'auto',
                    zIndex: 1000, // Ensure it stays above the backdrop
                  },
                  button: {
                    padding: 0,
                    margin: '0 10px 10px 10px',
                    background: 'black',
                    borderRadius: '50%',
                  },
                  icon: {
                    opacity: 0.8,
                    boxShadow: 'none',
                  },
                }}
                className="custom-lightbox"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
