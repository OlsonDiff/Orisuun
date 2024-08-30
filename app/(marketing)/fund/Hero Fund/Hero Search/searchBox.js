'use client';

import { SearchBar } from '../../../../../components/marketing/Search Bar/searchBar';
import { ScrollBox } from './scrollBox';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { mockData } from "@/data/hero search/mock-data";
const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';
export const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);


  const searchResult = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = results.filter((result) =>
      result.FirstName.toLowerCase().includes(value) ||
      result.LastName.toLowerCase().includes(value) ||
      result.Email.toLowerCase().includes(value) ||
      result.CityName.toLowerCase().includes(value)
    );

    setFilteredResults(filteredData);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${apiEndpoint}/Marketing/GetFundRaisingData`,
        {
          headers: {
            accept: '/',
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("response ", response);
      if (response.status === 200) {
        setResults(response.data?.Result); // Assuming the response data structure matches the expected results
        setFilteredResults(response.data?.Result || []); // Initialize filteredResults with all data
      }

    })()
  }, [])

  console.log("results ", results);


  return (
    <div className={`flex flex-col gap-[22.71px] `}>
      <div
        className="mx-[18.3px] text-[11px] text-[#808181] h-[33.34px] py-[9.17px] px-[12.22px]"
        style={{ borderRadius: '4px', border: '1px solid #B2B3B3' }}
      >
        <SearchBar
          onChange={searchResult}
          value={searchTerm}
          placeholder={'Find contributor'}
        />
      </div>
      <div className="w-[207.1px] h-[195px] ml-[18.3px] mr-[6px]">
        <ScrollBox data={filteredResults} />
      </div>
    </div>
  );
};
