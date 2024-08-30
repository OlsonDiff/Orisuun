'use client';

import FavouriteCard from '@/components/cards/favourite-card';
import Input from '@/components/ui/input';
import ChevronRight from '@/icons/chevron-right';
import Hamburger from '@/icons/sidebar/hamburger';
import SearchIcon from '@/icons/sidebar/search-icon';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import allDiscount from '@/public/images/vector/discount-portal/discount.svg';
import businessType from '@/public/images/vector/discount-portal/business.svg';
import offer from '@/public/images/vector/discount-portal/offer.svg';
import online from '@/public/images/vector/discount-portal/online.svg';
import store from '@/public/images/vector/discount-portal/store.svg';
import person from '@/public/images/vector/discount-portal/person.svg';
import rocket from '@/public/images/vector/discount-portal/rocket.svg';
import handshake from '@/public/images/vector/handshake.svg';
import members from '@/public/images/vector/discount-portal/members.svg';
import axios from 'axios';
import { toast } from 'react-toastify';

const data = [
  { image: allDiscount, text: 'All Discounts', key: 'ByAllDiscounts' },
  { image: businessType, text: 'By Business Type', key: 'ByBusinessType' },
  { image: offer, text: 'By Offer Type', key: 'ByOfferType' },
  { image: online, text: 'Online', key: 'ByOnline' },
  { image: store, text: 'In store', key: 'ByInStore' },
  { image: person, text: 'New Customers Only', key: 'ByNewCustomers' },
  { image: rocket, text: 'For Start Ups', key: 'ByStartUps' },
  { image: handshake, text: 'Partner Discounts Only', key: 'ByPartnerDiscounts' },
  { image: members, text: 'Member Discounts Only', key: 'ByMemberDiscounts' },
];

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

const DiscountPortal = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    ByAllDiscounts: false,
    ByBusinessType: false,
    ByOfferType: false,
    ByOnline: false,
    ByInStore: false,
    ByNewCustomers: false,
    ByStartUps: false,
    ByPartnerDiscounts: false,
    ByMemberDiscounts: false,
  });
  // const [discountData, setDiscountData] = useState([]);
  const [faviouritData, setFavouriteData] = useState([]);
  const [expireData, setExpireData] = useState([]);
  const [isNewData, setIsNewData] = useState([]);
  const [isMostPopulatedData, setMostPopulatedData] = useState([]);
  const [usedData, setUsedData] = useState([]);
  const [loader, setLoader] = useState(false)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/discount-portal/search-results?q=${encodeURIComponent(searchQuery)}`
      );
    }
  };


  useEffect(() => {
    (async () => {

      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const res = await axios.get(`${apiEndpoint}/DiscountPortal/GetDiscountDetails?UserId=${userData?.Id}`, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        })
        console.log("dataaa ", res.data);

        if (res.status == 200) {
          // setDiscountData(res.data?.Result);
          setFavouriteData(res.data?.Result?.filter((item: any) => item.IsFavourite === true));
          setExpireData(res.data?.Result?.filter((item: any) => item.IsExpiringSoon === true));
          setUsedData(res.data?.Result?.filter((item: any) => item.IsExpired === true));
          setIsNewData(res.data?.Result?.filter((item: any) => item.IsNew === true));
          setMostPopulatedData(res.data?.Result?.filter((item: any) => item.IsMostPopulated === true));
        }
      } catch (error) {
        console.log("error ", error);
        toast.error('Failed to fetch data, please try again later.')
      }

    })()
  }, [])

  const handleFilterToggle = async (key) => {
    setLoader(true);

    let updatedFilters;

    if (key === 'ByAllDiscounts') {
      // If "All Discounts" is selected, deselect all other filters
      updatedFilters = {
        ByAllDiscounts: !filters.ByAllDiscounts,
        ByBusinessType: false,
        ByOfferType: false,
        ByOnline: false,
        ByInStore: false,
        ByNewCustomers: false,
        ByStartUps: false,
        ByPartnerDiscounts: false,
        ByMemberDiscounts: false,
      };
    } else {
      // If any other filter is selected, deselect "All Discounts"
      updatedFilters = {
        ...filters,
        [key]: !filters[key],
        ByAllDiscounts: false,
      };

      // If all filters are deselected, automatically select "All Discounts"
      const allDeselected = Object.keys(updatedFilters)
        .filter(k => k !== 'ByAllDiscounts')
        .every(k => !updatedFilters[k]);

      if (allDeselected) {
        updatedFilters.ByAllDiscounts = true;
      }
    }

    setFilters(updatedFilters);

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const res = await axios.post(`${apiEndpoint}/DiscountPortal/GetSelectedDiscountCodes`, {
        ...updatedFilters,
        UserId: userData?.Id || '',
      },
        {
          headers: {
            XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        });

      if (res.status === 200) {
        // Handle the response data
        setFavouriteData(res.data?.Result?.filter((item) => item.IsFavourite === true));
        setExpireData(res.data?.Result?.filter((item) => item.IsExpiringSoon === true));
        setUsedData(res.data?.Result?.filter((item) => item.IsExpired === true));
        setIsNewData(res.data?.Result?.filter((item) => item.IsNew === true));
        setMostPopulatedData(res.data?.Result?.filter((item) => item.IsMostPopulated === true));
        setLoader(false);
      }
    } catch (error) {
      console.log("Error applying filters:", error);
      toast.error(error?.response?.data?.Message || 'Failed to apply filters, please try again later.');
      setLoader(false);
    }
  };


  return (
    <div className="px-6">
      <div className="lg:hidden flex items-center justify-between py-4">
        <Hamburger />
        <p className="text-h7 2xl:text-scaled-h7 font-semibold text-blue-600">
          Profile Search
        </p>
        <Image
          src={
            'https://s3-alpha-sig.figma.com/img/dac5/a3ff/5be85d0f6bc0bd1a076017beb8ff1fd5?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fbq8-00tTn89qrFknVra54OEOZxXUv6gEBapDYp8O4rLEeirGr7tIZgBAhKx--cAblwfzvHi6jnmdWcuQHAT70Lbii-ZohFcFitXIviIUEnBQ-7f7ZbtvLqhlrW8ShZpTynL7brvs0guDJAZ7lM5VzZ1XLh7g66pmjS9KmOvjugVI~ZIhC27v3NbK5Fg-28J~ljwAdv1-TaQ4AJMXRvp1Ft0QTji5mJMphYf1gmISiou8uUwVIyU04hKvJXTu9i0n-7EtXwpCZ5Ztb0e3sw7vf9hjuCSV61BXvg2-Ojz7Mb1EGG3YqXLWoymTIDSexU0aeHfDLZiOungr2bQFTXOlQ__'
          }
          alt="user"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
      <div className="py-8">
        <form
          onSubmit={handleSearch}
          className="flex flex-row items-center gap-4 mx-auto w-full mb-3"
        >
          <Input
            icon={<SearchIcon />}
            placeholder="Search for discount"
            containerClass="flex-1"
            className="md:rounded-br-none md:rounded-tr-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="hidden md:block max-w-[170px] w-full bg-blue-500 text-white px-4 py-3 rounded-br-md rounded-tr-md"
          >
            Search
          </button>
        </form>
        {faviouritData.length > 0 && <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
              Favourite
            </h6>
            <div className="flex items-center cursor-pointer">
              <p className="text-h9 2xl:text-scaled-h9 font-semibold text-omblue-600">
                View all
              </p>
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
            {faviouritData.map((data, index) => (
              <FavouriteCard key={index} data={data} setIsNewData={setIsNewData} setMostPopulatedData={setMostPopulatedData} setFavouriteData={setFavouriteData} setExpireData={setExpireData} setUsedData={setUsedData} />
            ))}
          </div>
        </div>}
        {isNewData.length > 0 && <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
              New
            </h6>
            <div className="flex items-center cursor-pointer">
              <p className="text-h9 2xl:text-scaled-h9 font-semibold text-omblue-600">
                View all
              </p>
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
            {isNewData.map((data, index) => (
              <FavouriteCard key={index} data={data} setIsNewData={setIsNewData} setMostPopulatedData={setMostPopulatedData} setFavouriteData={setFavouriteData} setExpireData={setExpireData} setUsedData={setUsedData} />
            ))}
          </div>
        </div>}
        {isMostPopulatedData.length > 0 && <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
              Most Popular
            </h6>
            <div className="flex items-center cursor-pointer">
              <p className="text-h9 2xl:text-scaled-h9 font-semibold text-omblue-600">
                View all
              </p>
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
            {isMostPopulatedData.map((data, index) => (
              <FavouriteCard key={index} data={data} setIsNewData={setIsNewData} setMostPopulatedData={setMostPopulatedData} setFavouriteData={setFavouriteData} setExpireData={setExpireData} setUsedData={setUsedData} />
            ))}
          </div>
        </div>}
        {expireData.length > 0 && <div className="mb-10">
          <div className="flex  items-center justify-between gap-4 mb-4">
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
              Expiring soon
            </h6>
            <div className="flex items-center cursor-pointer">
              <p className="text-h9 2xl:text-scaled-h9 font-semibold text-omblue-600">
                View all
              </p>
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {expireData.map((data, index) => (
              <FavouriteCard key={index} data={data} setIsNewData={setIsNewData} setMostPopulatedData={setMostPopulatedData} setFavouriteData={setFavouriteData} setExpireData={setExpireData} setUsedData={setUsedData} />
            ))}
          </div>
        </div>}
        {usedData.length > 0 && <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
              Used
            </h6>
            <div className="flex items-center cursor-pointer">
              <p className="text-h9 2xl:text-scaled-h9 font-semibold text-omblue-600">
                View all
              </p>
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          {/* <div className="flex  md:flex-nowrap flex-wrap  overflow-x-scroll gap-4 hide-scrollbar">
            {discountData.map((data, index) => (
              <FavouriteCard key={index} data={data} />
            ))}
          </div> */}
          <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
            {usedData.map((data, index) => (
              <FavouriteCard data={data} key={index} setIsNewData={setIsNewData} setMostPopulatedData={setMostPopulatedData} setFavouriteData={setFavouriteData} setExpireData={setExpireData} setUsedData={setUsedData} />
            ))}
          </div>
        </div>}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4">
          {data.map((filter, index) => (
            <div key={index} onClick={() => handleFilterToggle(filter.key)} className={`border border-grey-600 rounded-lg p-6 ${filters[filter.key]
              ? 'bg-blue-50 text-blue-600 border border-blue-600'
              : 'bg-gray-100 text-gray-500 border border-transparent'}
              `}>
              <Image
                src={filter.image}
                alt={filter.text}
                width={32}
                height={32}
                className="w-8 h-8 mx-auto mb-2"
              />
              <h5 className="text-black-400 text-h5 2xl:text-scaled-h5 font-semibold text-center">
                {filter.text}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountPortal;
