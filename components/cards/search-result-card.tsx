import UserSearch from '@/components/tabs-section/icons/user-search';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import Add from '@/icons/add';
import ChevronRight from '@/icons/chevron-right';
import Eye from '@/icons/eye';
import Favourite from '@/icons/favourite';
import Feather from '@/icons/feather';
import Globe from '@/icons/globe';
import LocationPin from '@/icons/location-pin';
import MessageIcon from '@/icons/message-icon';
import Star from '@/icons/star';
import Users from '@/icons/users';
import StyledTick from '@/icons/verification/styled-tick';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import StarRatings from 'react-star-ratings';

const SearchResultCard = ({ index, data }: { index: number; data: any }) => {
  console.log(data, 'data');
  const router = useRouter()

  const isMobile = useMobileMediaQuery();
  return (
    <div className="p-4 shadow-filter-primary">
      <div className="space-y-4">
        <div className="w-full flex items-start md:items-center justify-between gap-4">
          <div className="w-full flex items-start flex-1 gap-3">
            <div className="bg-profile-frame p-0.5 w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center relative">
              <Image
                src={
                  data?.ProfilePicture ? data?.ProfilePicture : 'https://s3-alpha-sig.figma.com/img/ea21/e159/b04a9bd139fa644ac1f73366a8088a58?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pqGHkuzv-N2VmmNwPX5eMpRPmnosmOw5oaupUdi3WMo0fuLkIWcoJVroLH6Xc8VC8R0IQ92GEs13A8okfC1mes-0WlE8Znw9KwFMdPLL7R6sQBAwCPdG4x39hKHb1nN0XsEHRYNc36UcEohLzQWQ-3HeuoyzIggTzo6s7XhUdHlFk-QBsxXq0d-MFZvOwCm5Oe8W1jIo3D2rkq2BA23zIvpqwXK21lIyAw8odeTBXndH2DbRrsFHsgC3sWWYilEzDZxsAgznFM1gJmdkTUEEMKa3ZYZF0Q3rVkxFb7494-7fJGPPjTQQpX7tyTSWTeIunceWp-kWQZoDrz7XJeqxyA__'
                }
                alt="techwave"
                width={isMobile ? 40 : 64}
                height={isMobile ? 40 : 64}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="space-y-2">
              <p className="text-h8 md:text-h8 2xl:text-scaled-h8 font-bold text-black-500 text-wrap">
                {data.CompanyName || ''}
              </p>
              {data.tagline && (
                <div className="flex items-center gap-2">
                  <Users className="text-omblue-500 w-4 h-4 2xl:w-scaled-4 2xl:h-scaled-4" />
                  <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-500">
                    {data.tagline}
                  </p>
                </div>
              )}
              <div className="hidden md:flex items-center gap-4">
                <div className="text-omblue-500 flex items-center gap-2">
                  <h6 className="text-h6 2xl:text-scaled-h6">{data.Rating}</h6>
                  <div className="flex items-center flex-row">
                    <StarRatings
                      starDimension="25px"
                      rating={data.Rating}
                      starRatedColor="rgba(35, 87, 198, 1)"
                      numberOfStars={5}
                      name="rating"
                      starSpacing="0px"
                      starHoverColor="#01AFD7"
                      svgIconViewBox="0 0 25 25"
                      svgIconPath="M21.9668 8.16346L21.9672 8.16461C22.0078 8.28943 22.0108 8.42343 21.9759 8.54996C21.941 8.67649 21.8697 8.78998 21.7708 8.87632L21.7701 8.87696L16.9704 13.0854L16.7465 13.2817L16.8124 13.5721L18.2277 19.8066L18.2278 19.8068C18.2569 19.9349 18.2478 20.0687 18.2015 20.1916C18.1552 20.3145 18.0738 20.421 17.9675 20.498L17.9672 20.4982C17.7495 20.656 17.4614 20.668 17.2332 20.5307L17.232 20.53L11.7567 17.2564L11.5001 17.103L11.2436 17.2563L5.7663 20.53L5.76615 20.53C5.65828 20.5946 5.54069 20.626 5.42339 20.626C5.28679 20.626 5.15017 20.5836 5.03147 20.4978C4.81444 20.341 4.71199 20.0706 4.77149 19.8064C4.77152 19.8063 4.77155 19.8062 4.77158 19.806L6.1868 13.5721L6.25271 13.2818L6.02889 13.0855L1.22916 8.87613L1.22821 8.87531C1.02694 8.69969 0.949845 8.42048 1.03307 8.16452L1.03324 8.164C1.0736 8.0394 1.14965 7.92937 1.25195 7.84758C1.35426 7.76579 1.47832 7.71582 1.60876 7.70387L7.95917 7.12734L8.25645 7.10035L8.37374 6.82586L10.8844 0.950474C10.991 0.70175 11.2325 0.542969 11.5001 0.542969C11.7676 0.542969 12.009 0.701641 12.1158 0.949201C12.1158 0.949426 12.1159 0.949651 12.116 0.949876L14.6264 6.82578L14.7437 7.1003L15.041 7.12729L21.3908 7.70391L21.3915 7.70397C21.5219 7.71564 21.646 7.76543 21.7483 7.84714C21.8506 7.92885 21.9266 8.03886 21.9668 8.16346Z"
                      style={{ margin: 'auto' }}
                    />
                  </div>
                  <div className="text-omblue-900 flex items-center">
                    <p className="text-h9 2xl:text-scaled-h9">
                      {data.Review} Reviews
                    </p>
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 w-8 h-8 border border-green-400 flex items-center justify-center rounded-full">
              <Favourite className="w-5 h-5 text-green-400" />
            </div>
            <button className="hidden flex-1 px-5 py-3.5 md:flex items-center gap-2 text-white bg-omblue-500 rounded-md" onClick={() => router.push(`/profile/${data?.ProfileDetailId}`)}>
              <Eye className="w-4 h-4" />
              <p className="text-h9 2xl:text-scaled-h9 font-semibold">
                View Profile
              </p>
            </button>
          </div>
        </div>
        <div className="text-omblue-500 md:hidden flex items-center gap-2 ml-[54px] mobile:flex-wrap" style={{ marginTop: 0 }}>
          <h6 className="text-h6 2xl:text-scaled-h6">{data.Rating}</h6>
          <div className="flex items-center">
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} />
            ))} */}
            <StarRatings
              starDimension="25px"
              rating={data.Rating}
              starRatedColor="rgba(35, 87, 198, 1)"
              numberOfStars={5}
              name="rating"
              starSpacing="0px"
              starHoverColor="#01AFD7"
              svgIconViewBox="0 0 25 25"
              svgIconPath="M21.9668 8.16346L21.9672 8.16461C22.0078 8.28943 22.0108 8.42343 21.9759 8.54996C21.941 8.67649 21.8697 8.78998 21.7708 8.87632L21.7701 8.87696L16.9704 13.0854L16.7465 13.2817L16.8124 13.5721L18.2277 19.8066L18.2278 19.8068C18.2569 19.9349 18.2478 20.0687 18.2015 20.1916C18.1552 20.3145 18.0738 20.421 17.9675 20.498L17.9672 20.4982C17.7495 20.656 17.4614 20.668 17.2332 20.5307L17.232 20.53L11.7567 17.2564L11.5001 17.103L11.2436 17.2563L5.7663 20.53L5.76615 20.53C5.65828 20.5946 5.54069 20.626 5.42339 20.626C5.28679 20.626 5.15017 20.5836 5.03147 20.4978C4.81444 20.341 4.71199 20.0706 4.77149 19.8064C4.77152 19.8063 4.77155 19.8062 4.77158 19.806L6.1868 13.5721L6.25271 13.2818L6.02889 13.0855L1.22916 8.87613L1.22821 8.87531C1.02694 8.69969 0.949845 8.42048 1.03307 8.16452L1.03324 8.164C1.0736 8.0394 1.14965 7.92937 1.25195 7.84758C1.35426 7.76579 1.47832 7.71582 1.60876 7.70387L7.95917 7.12734L8.25645 7.10035L8.37374 6.82586L10.8844 0.950474C10.991 0.70175 11.2325 0.542969 11.5001 0.542969C11.7676 0.542969 12.009 0.701641 12.1158 0.949201C12.1158 0.949426 12.1159 0.949651 12.116 0.949876L14.6264 6.82578L14.7437 7.1003L15.041 7.12729L21.3908 7.70391L21.3915 7.70397C21.5219 7.71564 21.646 7.76543 21.7483 7.84714C21.8506 7.92885 21.9266 8.03886 21.9668 8.16346Z"
              style={{ margin: 'auto' }}
            />
          </div>
          <div className="text-omblue-900 flex items-center mobile:w-full">
            <p className="text-h9 2xl:text-scaled-h9">{data.Review} Reviews</p>
            <ChevronRight />
          </div>
        </div>
        <hr className="border-b border-[#D2D4DA]" />
        <div className="grid grid-cols-12 gap-4">
          <div className="border-b md:border-0 border-[#D2D4DA] py-4 col-span-12 md:col-span-3 space-y-1">
            <div className="grid grid-cols-2 md:grid-cols-1">
              {data.IsVerified ? (
                <div className="text-[#1A9E78] flex items-center gap-2 py-1">
                  <StyledTick className="w-6 h-6" />
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
              <div className="text-omblue-500 flex items-center gap-2 py-1">
                <Users className="w-6 h-6" />
                <p className="text-blue-500 text-h9 2xl:text-scaled-h9 font-medium">
                  {data.Timeline || 0}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1">
              <div className="text-omblue-500 flex items-center gap-2 py-1">
                <LocationPin className="w-6 h-6" />
                <p className="text-blue-500 text-h9 2xl:text-scaled-h9 font-medium">
                  {data?.Country + ' , ' + data.City}
                </p>
              </div>
              <div className="text-omblue-500 flex items-center gap-2 py-1">
                <UserSearch className="w-6 h-6" />
                <p className="text-blue-500 text-h9 2xl:text-scaled-h9 font-medium">
                  {data.BlackOwnedPercent}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b md:border-0 border-[#D2D4DA] py-4 col-span-12 md:col-span-3 space-y-3">
            <p className="text-black-500 text-h9 2xl:text-scaled-h9 font-semibold">
              Services or Product
            </p>
            {!!data?.ServiceModels?.length ? (
              data.ServiceModels.map((service, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <p className="px-2 py-1 bg-olblue-50 text-omblue-500 text-xs rounded">
                    {service.ServicePercentage}
                  </p>
                  <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                    {service.ServiceName}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2">
                No Sevice Model Found
              </div>
            )}
          </div>

          <div className="col-span-12 md:col-span-3 space-y-2">
            <p className="text-black-500 text-h9 2xl:text-scaled-h9 font-semibold">
              Latest Review
            </p>

            {data.LatestReview ? (
              <>
                <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-400">
                  {data.LatestReview}
                </p>

                <div className="flex items-center gap-2">
                  <div className="text-olblue-700 ">
                    <Feather />
                  </div>
                  <p className="text-h10 2xl:text-scaled-h10 font-semibold text-olblue-700">
                    - {data.ReviewedBy}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-400">
                {`No reviews received yet`}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-row md:flex-col gap-2 text-omblue-600 ">
              <a
                className="flex items-center justify-center w-full ipad:w-auto sm:flex-1 border border-omblue-100 rounded-md gap-2 px-4 py-3.5 text-h9 2xl:text-scaled-h9 "
                href={data.CompanyWebsite || 'https://google.com'}
                target="_blank"
              >
                <Globe />
                <p className='hidden sm:flex'>View Website</p>
              </a>
              <button className="flex items-center justify-center w-full ipad:w-auto sm:flex-1 border border-omblue-100 rounded-md gap-2 px-4 py-3.5 text-h9 2xl:text-scaled-h9 ">
                <MessageIcon className="w-4 h-4" />
                <p className='hidden sm:flex'>Chat</p>
              </button>
              <button className="flex flex-1 px-5 py-3.5 md:hidden items-center justify-center gap-2 text-white bg-omblue-500 rounded-md" onClick={() => router.push(`/profile/${data?.ProfileDetailId}`)}>
                <Eye className="w-4 h-4" />
                <p className="text-h9 2xl:text-scaled-h9 font-semibold">
                  View Profile
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;