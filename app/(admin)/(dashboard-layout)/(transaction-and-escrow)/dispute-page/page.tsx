'use client';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import CustomSelect from '@/components/ui/select';
import Image from 'next/image';
import React from 'react';
import filterIcon from '@/public/images/vector/filter.svg';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import Card from '@/components/cards/card';

const DisputeAdmin = () => {
  const isMobile = useMobileMediaQuery();
  return (
    <div className="w-full px-6 py-7">
      <div className="flex items-start md:items-center flex-col md:flex-row justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-1 bg-blue-500 rounded-e-md"></div>
          <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold">
            Dispute page
          </h6>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="p-2 border border-omblue-100 rounded-md flex items-center">
            <Image src={filterIcon} alt="filter icon" />
          </div>
        </div>
      </div>
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row my-4">
        <div className="text-h9 2xl:text-scaled-h9 font-medium text-black-500 hidden md:flex items-center gap-2 mb-2">
          <p>Shows</p>
          <CustomSelect
            options={[]}
            onChange={() => {}}
            error={undefined}
            value={undefined}
            placeholder="10"
          />
          <p>entries</p>
        </div>
        <div className="flex gap-2 md:w-auto w-full">
          <Input placeholder="Search" />
          <div className="p-2 border border-omblue-100 rounded-md flex md:hidden items-center">
            <Image src={filterIcon} alt="filter icon" />
          </div>
        </div>
        <Button className="mt-4 md:hidden" title="Start New Contract"></Button>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      ) : (
        <Table />
      )}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-h9 2xl:text-scaled-h9 font-medium text-black-500">
          Showing 1 to 10 of 57 entries
        </p>
        <Pagination
          total={50}
          show={3}
          currentPage={0}
          onPageChange={function (page: number): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
};

export default DisputeAdmin;
