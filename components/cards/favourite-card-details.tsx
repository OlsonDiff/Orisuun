'use client';

import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import Briefcase from '@/icons/briefcase';
import Favourite from '@/icons/favourite';
import Globe from '@/icons/globe';
import GoTo from '@/icons/go-to';
import FileIconAlt from '@/icons/upload-icons/file-icon-alt';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import Modal from '../modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../ui/input';
import Note from '../ui/note';
import BottomSheet from '../bottom-sheet';
import DeFavourite from '@/icons/deFavourite';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';


const FavouriteCardDetails = ({
  showGlobe = false,
  discoutData
}: {
  showGlobe?: boolean;
  discoutData?: any
}) => {
  const isMobile = useMobileMediaQuery();
  const [showDiscountCode, setShowDiscountCode] = useState(false);
  const [showDiscountCodeSheet, setShowDiscountCodeSheet] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [coupne, setCoupon] = useState('');
  const [remainingCode, setRemainingCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showTerms, setShowTerms] = useState(false)


  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleGetCode = async (id: any) => {

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const getCoupne = await axios.get(`${apiEndpoint}/DiscountPortal/GetCompanyWiseCouponCodeV1?Id=${id}&UserId=${userData?.Id}`, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      })

      if (getCoupne.status == 200) {
        console.log("getCoupne.data ", getCoupne.data);
        // setCoupon(getCoupne.data?.Result);
        setCoupon(getCoupne.data?.Result?.Code);
        setRemainingCode(getCoupne.data?.Result?.RemainingDiscount)
        isMobile
          ? setShowDiscountCodeSheet(!showDiscountCodeSheet)
          : setShowDiscountCode(!showDiscountCode)

      }
      console.log("getCoupne ", getCoupne);
    } catch (error) {
      console.log("error ", error);
      setErrorMessage(error?.response?.data?.Message || "Failed to get coupon code");
      toast.error(error?.response?.data?.Message || "Failed to get coupon code");
    }
  }


  const handleFavourite = async (id: number, isFavourite: boolean) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const res = await axios.get(`${apiEndpoint}/DiscountPortal/SetFavouriteDiscount?Id=${id}&UserId=${userData?.Id}&IsFavourite=${isFavourite}`, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      })
      if (res.status == 200) {
        toast.success("Favourite updated successfully");
      }
    } catch (error) {
      console.log("Error ", error?.response?.data?.Message || "Failed to update favourite");
      toast.error(error?.response?.data?.Message || "Failed to update favourite");
    }
  }


  return (
    <div className="md:p-4 md:border border-grey-600 rounded-md">
      <div className="flex flex-col xl:flex-row items-start md:items-center gap-2 justify-between">
        <div className="flex items-center gap-2 w-full xl:w-1/2">
          <Image
            src={discoutData?.CompanyLogo}
            alt="profile"
            width={56}
            height={56}
            className="w-14 h-14 rounded-full"
          />
          <div className="flex-1">
            <p className="text-h8 2xl:text-scaled-h8 font-bold text-black-500">
              {discoutData?.CompanyName}
            </p>
            <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
              {discoutData?.CompanySlogan}
            </p>
          </div>
          <div className="space-x-1 flex items-center">
            {!discoutData?.IsFavourite ?
              <button onClick={() => {
                handleFavourite(discoutData?.Id, !discoutData?.IsFavourite)
              }}>
                <DeFavourite className="w-4 h-4" />
              </button>
              :
              <button className="bg-green-50 border border-green-400 text-green-400 p-2 rounded-full">
                <Favourite onClick={() => handleFavourite(discoutData?.Id, !discoutData?.IsFavourite)} />
              </button>}
            <button
              className={cn(
                'bg-white border border-omblue-100 text-omblue-400 p-2 rounded-full',
                showGlobe ? 'block' : 'hidden md:block'
              )}
            >
              <Globe />
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between gap-4 w-full xl:w-1/2">
          <button
            className="flex items-center gap-2 border text-omblue-600 border-omblue-600 p-3 rounded-md"
            onClick={() =>
              setShowTerms(true)
            }
          >
            Terms of using <FileIconAlt className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 border bg-omblue-600 text-white border-omblue-100 p-3 rounded-md"
            onClick={() => {
              handleGetCode(discoutData?.Id)
            }

            }
          >
            Get the code <GoTo className="text-white w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 my-4">
        <div className="col-span-1 order-2 md:order-1">
          <div className="pe-6 h-full border-r border-grey-600">
            <p className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500 mb-4">
              Company Description
            </p>
            <p className="text-blue-400 text-h10 2xl:text-scaled-h10 font-medium mb-4">
              {discoutData?.CompanyDescription}
            </p>
            {/* <ul className="text-blue-400 text-h10 2xl:text-scaled-h10 font-medium list-disc pl-4 space-y-4">
              <li>
                We believe in the power of collaboration. Our team works closely
                with clients to understand their unique challenges and develop
                customized tech solutions that drive success.
              </li>
              <li>
                Stay ahead in the ever-evolving tech landscape with our team of
                experts who are passionate about exploring and mastering the
                latest technological trends.
              </li>
            </ul> */}
          </div>
        </div>

        <div className="space-y-4 col-span-1 order-1 md:order-2">
          <p className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
            Discount Details
          </p>
          {/* {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-omblue-600" />
              <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
                {'Company Type'}
              </p>
            </div>
          ))} */}
          <div className="flex items-center gap-2">
            <Image
              src="/icons/business.svg"
              // className=" rotate-[270deg]"
              alt="right arrow"
              width={20}
              height={20}
            />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
              {discoutData?.CompanyType}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/handyman.svg"
              // className=" rotate-[270deg]"
              alt="right arrow"
              width={20}
              height={20}
            />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
              {discoutData?.CompanyIndustry}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/shop.svg"
              // className=" rotate-[270deg]"
              alt="right arrow"
              width={20}
              height={20}
            />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
              {discoutData?.DiscountActivation}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/user.svg"
              // className=" rotate-[270deg]"
              alt="right arrow"
              width={20}
              height={20}
            />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
              {discoutData?.ActiveDiscount}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/stopwatch.svg"
              // className=" rotate-[270deg]"
              alt="right arrow"
              width={20}
              height={20}
            />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
              Expiry: {discoutData?.ExpiryDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/tasks.svg"
              // className=" rotate-[270deg]"
              alt="right arrow"
              width={20}
              height={20}
            />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
              {discoutData?.NumberOfDiscount} discounts per Orisuun member
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/user-search.svg"
              // className=" rotate-[270deg]"
              alt="right arrow"
              width={20}
              height={20}
            />
            <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
              Member discounts
            </p>
          </div>
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between gap-4">
        <button
          className="flex items-center justify-center gap-2 border text-omblue-600 border-omblue-600 p-3 rounded-md w-full md:w-auto"
          onClick={() =>
            setShowTerms(true)
          }
        >
          Terms of using <FileIconAlt className="w-4 h-4" />
        </button>
        <button
          className="flex items-center justify-center gap-2 border bg-omblue-600 text-white border-omblue-100 p-3 rounded-md w-full md:w-auto"
          onClick={() =>
            isMobile
              ? setShowDiscountCodeSheet(!showDiscountCodeSheet)
              : setShowDiscountCode(!showDiscountCode)
          }
        >
          Get the code <GoTo className="text-white w-4 h-4" />
        </button>
      </div>
      <Modal
        showModal={showDiscountCode}
        setShowModal={setShowDiscountCode}
        modalSize="xs"
        title={`Your discount code for ${discoutData?.CompanyName}`}
      >
        <p className="mb-4">Your code is valid until {discoutData?.ExpiryDate}</p>
        <div className="flex items-center gap-1 mb-4">
          <Input placeholder="GHWINWHJHWHJ" value={coupne} containerClass="w-full flex-1" />
          <div>
            <button
              onClick={() => {
                copyToClipboard(coupne)
              }}
              className="text-white bg-omblue-500 py-3 px-4 rounded-md"
            >
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        <Note
          text={`${errorMessage ? errorMessage : `You can get a code from this company ${remainingCode} more times`}`}
          status="info"
        />
      </Modal>
      <Modal
        showModal={showTerms}
        setShowModal={setShowTerms}
        modalSize="xs"
        title={`${discoutData?.CompanyName}`}
      >
        <div className="flex items-center gap-2 p-2">
          <Image
            src="/icons/shop.svg"
            // className=" rotate-[270deg]"
            alt="right arrow"
            width={20}
            height={20}
          />
          <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
            {discoutData?.DiscountActivation}
          </p>
        </div>
        <div className="flex items-center gap-2 p-2">
          <Image
            src="/icons/user.svg"
            // className=" rotate-[270deg]"
            alt="right arrow"
            width={20}
            height={20}
          />
          <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
            {discoutData?.ActiveDiscount}
          </p>
        </div>
        <div className="flex items-center gap-2 p-2">
          <Image
            src="/icons/stopwatch.svg"
            // className=" rotate-[270deg]"
            alt="right arrow"
            width={20}
            height={20}
          />
          <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
            Expiry: {discoutData?.ExpiryDate}
          </p>
        </div>
        <div className="flex items-center gap-2 p-2">
          <Image
            src="/icons/tasks.svg"
            // className=" rotate-[270deg]"
            alt="right arrow"
            width={20}
            height={20}
          />
          <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
            {discoutData?.NumberOfDiscount} discounts per Orisuun member
          </p>
        </div>
      </Modal>
      <BottomSheet
        isOpen={showDiscountCodeSheet}
        onClose={() => setShowDiscountCodeSheet(false)}
      >
        <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-blue-500">
          Your discount code for{' '}
          <span className="text-omblue-600">{discoutData?.CompanyName}</span>
        </h5>
        <p className="mb-4">Your code is valid until {discoutData?.ExpiryDate}</p>
        <div className="flex items-center gap-1 mb-4">
          <Input placeholder="GHWINWHJHWHJ" containerClass="w-full flex-1" />
          <div>
            <button
              onClick={() => copyToClipboard('')}
              className="text-white bg-omblue-500 py-3 px-4 rounded-md"
            >
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        <Note
          text={`${errorMessage ? errorMessage : `You can get a code from this company ${remainingCode} more times`}`}
          status="info"
        />
      </BottomSheet>
    </div>
  );
};

export default FavouriteCardDetails;
