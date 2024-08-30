'use client';

import Breadcrumbs from '@/components/breadcrumbs';
import FavouriteCardDetails from '@/components/cards/favourite-card-details';
import ChevronLeft from '@/icons/chevron-left';
import ChevronRight from '@/icons/chevron-right';
import Hamburger from '@/icons/sidebar/hamburger';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';


const Discount = () => {
  const params = useParams();
  const id = params.id as string;
  const [discoutData, setDiscountData] = useState(null);


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    (async () => {
      const res = await axios.get(`${apiEndpoint}/DiscountPortal/GetDiscountCodeDetailsIdWise?Id=${id}&UserId=${userData?.Id}`, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          'Content-Type': 'multipart/form-data',
        },
      })
      if (res.status === 200) {
        console.log("resss ", res);

        setDiscountData(res.data?.Result)
      }
    })()
  }, [])

  console.log("discoutData ", discoutData);


  return (
    <div className="px-2 md:px-6">
      <div className="lg:hidden flex items-center justify-between py-4">
        <ChevronLeft className="w-6 h-6" />
      </div>
      <div className="md:py-8 py-4">
        <div className="hidden md:block">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Discount Portal', url: '/discount-portal' },
              { title: discoutData?.CompanyName },
            ]}
          />
        </div>

        <div>
          <h3 className="md:hidden block text-[26px] leading-8 2xl:text-scaled-[26px] font-bold text-olblue-900 pb-6">
            Discount Title
          </h3>
        </div>
        <div className="md:my-8">
          <FavouriteCardDetails showGlobe={true} discoutData={discoutData} />
        </div>
      </div>
    </div>
  );
};

export default Discount;
