import { RootState } from '@/data/store';
import ChevronRight from '@/icons/chevron-right';
import Dollars from '@/icons/dollars';
import Star from '@/icons/star';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

const Reviews = () => {
  const { profileData } = useSelector((state: RootState) => state.user);
  return (
    <div className="grid grid-cols-12 gap-8">
      {profileData.ReviewList?.map((review, index) => (
        <div key={index} className="col-span-12 md:col-span-6 3xl:col-span-4">
          <div className="border border-grey-600 rounded-md px-3.5 py-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <Image
                  src={
                    review.ProfilePicture || 'https://s3-alpha-sig.figma.com/img/83fb/3e04/056cc892636460bee5791aa3f243854c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gXfL-vabZk7rQ9cexBV~h77OUbIGUi96NUPGyGghnlcRoBCFTf6a81dmLBuyPBgiSUV8~go~rByVaEcwVqihO~KM7VQgxiwLTW38KH87jPe~xwDq9tx-6lqayRRIDnVwn0CV9A3jaKHhIZB0XrKAmnVr4If11s49~M2Rx8U1muHRMMFHwkpj5dvJrt5EJSvhIK~48~pSKKzC3UJaTUk7Po0RNkFNRVwxgjY9w2UdxBZoMHzpvtHaXHEgstxWHwW8IwscaXmSAA0TtCe8PfwE1cbPhAh5uVom2P32~ekTpZAqXemy3~JIKEWno35-tGwpTcXAeLsuK90g1qQvse2XIQ__'
                  }
                  alt="image"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full"
                />
                <div className="space-y-0.5">
                  <p className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                    {review.ProfileReviewedbyName}
                  </p>
                  <div className="inline-flex items-center gap-1.5">
                    <Dollars className="w-4 h-4 text-omblue-600" />
                    <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
                      {review.ProfileReviewedbyUserType}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-omblue-600 inline-flex cursor-pointer">
                <p className="text-h9 2xl:text-scaled-h9 font-semibold">
                  See Full Review
                </p>
                <ChevronRight className="rotate-90" />
              </div>
            </div>
            <div>
              <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-400">
                {review.Description}
              </p>
            </div>
            <hr className="my-3" />
            <div className="space-y-3 block mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 w-[10%]">
                  <Star className="text-olblue-500 w-4 h-4" />
                  <h6 className="text-h9 2xl:text-scaled-h6 font-medium text-blue-500 w-6">
                    {review.Quality}
                  </h6>
                </div>
                <div className="bg-[#C7E8FF] w-[65%] h-2 py-1 rounded-3xl relative">
                  <div className={`bg-olblue-500 h-full w-[${review.Quality * 2 * 10}%] absolute inset-0 rounded-3xl`}></div>
                </div>
                <div className='w-3/12'>
                  <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                    Quality
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 w-[10%]">
                  <Star className="text-olblue-500 w-4 h-4" />
                  <h6 className="text-h9 2xl:text-scaled-h6 font-medium text-blue-500 w-6">
                    {review.Service}
                  </h6>
                </div>
                <div className="bg-[#C7E8FF] w-[65%] h-2 py-1 rounded-3xl relative">
                  <div className={`bg-olblue-500 h-full w-[${review.Service * 2 * 10}%] absolute inset-0 rounded-3xl`}></div>
                </div>
                <div className='w-3/12'>
                  <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                    Service
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 w-[10%]">
                  <Star className="text-olblue-500 w-4 h-4" />
                  <h6 className="text-h9 2xl:text-scaled-h6 font-medium text-blue-500 w-6">
                    {review.Cost}
                  </h6>
                </div>
                <div className="bg-[#C7E8FF] w-[65%] h-2 py-1 rounded-3xl relative">
                  <div className={`bg-olblue-500 h-full w-[${review.Cost * 2 * 10}%] absolute inset-0 rounded-3xl`}></div>
                </div>
                <div className='w-3/12'>
                  <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                    Cost
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 w-[10%]">
                  <Star className="text-olblue-500 w-4 h-4" />
                  <h6 className="text-h9 2xl:text-scaled-h6 font-medium text-blue-500 w-6">
                    {review.Refer}
                  </h6>
                </div>
                <div className="bg-[#C7E8FF] w-[65%] h-2 py-1 rounded-3xl relative">
                  <div className={`bg-olblue-500 h-full w-[${review.Refer * 2 * 10}%] absolute inset-0 rounded-3xl`}></div>
                </div>
                <div className='w-3/12'>
                  <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-500">
                    Willing For Refer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
