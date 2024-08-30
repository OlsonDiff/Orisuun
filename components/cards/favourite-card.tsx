'use client';

import Favourite from '@/icons/favourite';
import Globe from '@/icons/globe';
import GoTo from '@/icons/go-to';
import Image from 'next/image';
import React, { useState } from 'react';
import Modal from '../modal';
import Input from '../ui/input';
import BottomSheet from '../bottom-sheet';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import Note from '../ui/note';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import DeFavourite from '@/icons/deFavourite';

interface IProps {
  data?: any
  setGetListing?: any
  setUsedData?: any
  setFavouriteData?: any
  setExpireData?: any
  setIsNewData?: any
  setMostPopulatedData?: any
}

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';


const FavouriteCard: React.FC<IProps> = ({ data, setUsedData, setFavouriteData, setExpireData, setIsNewData, setMostPopulatedData }: any) => {
  const router = useRouter()
  console.log("data ==>", data);

  const [showDiscountCode, setShowDiscountCode] = useState(false);
  const [showDiscountCodeSheet, setShowDiscountCodeSheet] = useState(false);
  const [FailedCode, setFailedCode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [coupne, setCoupon] = useState('');
  const [remainingCode, setRemainingCode] = useState()
  // const [setError, setError] = useState('');
  const isMobile = useMobileMediaQuery();


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
      const getCoupne = await axios.get(`${apiEndpoint}/DiscountPortal/GetCompanyWiseCouponCode?Id=${id}&UserId=${userData?.Id}`, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      })

      if (getCoupne.status == 200) {
        console.log("getCoupne.data ", getCoupne.data);

        setCoupon(getCoupne.data?.Result?.Code);
        setRemainingCode(getCoupne.data?.Result?.RemainingDiscount)
        const userData = JSON.parse(localStorage.getItem('userData'));
        const res = await axios.get(`${apiEndpoint}/DiscountPortal/GetDiscountDetails?UserId=${userData?.Id}`, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        })
        console.log("dataaa ", res.data);

        if (res.status == 200) {
          setFavouriteData(res.data?.Result?.filter((item: any) => item.IsFavourite === true));
          setExpireData(res.data?.Result?.filter((item: any) => item.IsExpiringSoon === true));
          setUsedData(res.data?.Result?.filter((item: any) => item.IsExpired === true));
          setIsNewData(res.data?.Result?.filter((item: any) => item.IsNew === true));
          setMostPopulatedData(res.data?.Result?.filter((item: any) => item.IsMostPopulated === true));
          isMobile
            ? setShowDiscountCodeSheet(!showDiscountCodeSheet)
            : setShowDiscountCode(!showDiscountCode)
        }

      }
      console.log("getCoupne ", getCoupne);
    } catch (error) {
      console.log("error ", error);
      toast.error(error?.response?.data?.Message || "Failed to get coupon code");
      // setFailedCode(true)
    }
  }

  const handleFavourite = async (id: number, isFavourite: boolean) => {
    try {
      console.log("ca;lll");

      const userData = JSON.parse(localStorage.getItem('userData'));
      const res = await axios.get(`${apiEndpoint}/DiscountPortal/SetFavouriteDiscount?Id=${id}&UserId=${userData?.Id}&IsFavourite=${isFavourite}`, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      })
      if (res.status == 200) {
        toast.success("Favourite updated successfully");
        const res = await axios.get(`${apiEndpoint}/DiscountPortal/GetDiscountDetails?UserId=${userData?.Id}`, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        })
        console.log("dataaa ", res.data);

        if (res.status == 200) {
          setFavouriteData(res.data?.Result?.filter((item: any) => item.IsFavourite === true));
          setExpireData(res.data?.Result?.filter((item: any) => item.IsExpiringSoon === true));
          setUsedData(res.data?.Result?.filter((item: any) => item.IsExpired === true));
          setIsNewData(res.data?.Result?.filter((item: any) => item.IsNew === true));
          setMostPopulatedData(res.data?.Result?.filter((item: any) => item.IsMostPopulated === true));
        }
      }
    } catch (error) {
      console.log("Error ", error?.response?.data?.Message || "Failed to update favourite");
      toast.error(error?.response?.data?.Message || "Failed to update favourite");
    }
  }


  return (
    <div className="w-full p-4 border border-grey-600 rounded-md cursor-pointer" onClick={() => router.push(`/discount-portal/${data?.Id}`)}>
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="gradient-border">
            <Image
              src={data?.CompanyLogo}
              alt="profile"
              width={64}
              height={64}
              className="w-14 h-14 p-2 rounded-md"
            // style={{
            //   border: "1px solid transparent",
            //   background: "padding-box linear-gradient(rgb(30 41 59), rgb(30 41 59)), border-box linear-gradient(rgb(255 255 255), rgb(255 255 255 / 0.5))"
            // }}
            />
          </div>
          <div className="flex-1">
            <p className="text-h8 2xl:text-scaled-h8 font-bold text-black-500">
              {data?.CompanyName}
            </p>
            <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
              {data?.CompanySlogan}
            </p>
          </div>
          <div className="space-x-1 flex items-center">
            {!data?.IsFavourite ?
              <button onClick={(e) => {
                e.stopPropagation();
                handleFavourite(data?.Id, !data?.IsFavourite)
              }}>
                <DeFavourite className="w-4 h-4" />
              </button> :
              <button className="bg-green-50 border border-green-400 text-green-400 p-2 rounded-full">
                <Favourite className="w-4 h-4" onClick={(e) => {
                  e.stopPropagation();
                  handleFavourite(data?.Id, !data?.IsFavourite)
                }} />
              </button>}
            <button className="bg-white border border-omblue-100 text-omblue-400 p-2 rounded-full hidden md:block">
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button className="bg-white border border-omblue-100 text-omblue-400 p-2 rounded-md md:hidden flex items-center justify-center w-full gap-2">
          <Globe /> <p className="">View Website</p>
        </button>
        <div className="p-4 border border-dashed border-green-500 bg-green-50">
          <p className="text-[#107C5D] text-h7 2xl:text-scaled-h7 font-semibold">
            {data?.DiscountOff ? data?.DiscountOff : 0}% OFF of the subscription
          </p>
        </div>

        <p className="text-h8 2xl:text-scaled-h8 font-medium text-blue-300">
          {data?.CompanyDescription ? data?.CompanyDescription : "TechWave Innovations is a dynamic technology company dedicated to creating cutting-edge solutions that redefine industry standards."}
        </p>

        <div className="flex items-end justify-between gap-4">
          <button
            className="flex items-center gap-2 border border-omblue-100 p-3 rounded-md"
            onClick={(e) => {

              handleGetCode(data?.Id)
              // isMobile
              //   ? setShowDiscountCodeSheet(!showDiscountCodeSheet)
              //   : setShowDiscountCode(!showDiscountCode)

              e.stopPropagation();
            }

            }
          >
            Get Link <GoTo className="w-4 h-4" />
          </button>
          <p className="text-blue-400 text-h10 2xl:text-scaled-h10 font-medium">
            Expiry: {data?.ExpiryDate}
          </p>
        </div>
      </div>
      <Modal
        showModal={showDiscountCode}
        setShowModal={setShowDiscountCode}
        modalSize="xs"
        title={`Your discount code for ${data?.CompanyName}`}
      >
        <p className="mb-4">Your code is valid until {data?.ExpiryDate}</p>
        <div className="flex items-center gap-1 mb-4">
          <Input placeholder="GHWINWHJHWHJ" value={coupne} containerClass="w-full flex-1" />
          <div>
            <button
              onClick={(e) => {
                copyToClipboard(coupne)
                e.stopPropagation()
              }}
              className="text-white bg-omblue-500 py-3 px-4 rounded-md"
            >
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        <Note
          text={`You can get a code from this company ${remainingCode} more times`}
          status="info"
        />
      </Modal>
      <BottomSheet
        isOpen={showDiscountCodeSheet}
        onClose={(e) => {
          setShowDiscountCodeSheet(false)
          e.stopPropagation();
        }}
      >
        <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-blue-500">
          Your discount code for{' '}
          <span className="text-omblue-600">{data?.CompanyName}</span>
        </h5>
        <p className="mb-4">Your code is valid until {data?.data?.ExpiryDate}</p>
        <div className="flex items-center gap-1 mb-4">
          <Input placeholder="GHWINWHJHWHJ" value={coupne} containerClass="w-full flex-1" />
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                copyToClipboard(coupne)
              }}
              className="text-white bg-omblue-500 py-3 px-4 rounded-md"
            >
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        <Note
          text={`You can get a code from this company ${remainingCode} more times`}
          status="info"
        />
      </BottomSheet>
    </div>
  );
};

export default FavouriteCard;
