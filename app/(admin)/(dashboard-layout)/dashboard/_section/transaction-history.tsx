import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import escrow from '@/public/images/vector/escrow.svg';
import Tag from '@/components/ui/tag';
import { useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { escrowTransactionHistoryList } from '@/server-actions/dashboard';

const TransactionHistory = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [data, setData] = useState([]);

  const fetchEscrowTransactionHistory = useCallback(async () => {
    try {
      const response = await escrowTransactionHistoryList(currentUser.UserId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchEscrowTransactionHistory();
    }
  }, [currentUser, fetchEscrowTransactionHistory]);

  return (
    <div className="shadow-custom-combined border border-[#E3E3E2] rounded-xl  h-[332px] 2xl:h-[calc(332px*var(--scale-factor))] flex flex-col">
      <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold mb-4 pt-4 px-4">
        Posts
      </h6>

      <div className="flex flex-col flex-grow overflow-hidden pb-4">
        <div className="grid grid-cols-10 bg-omblue-25">
          <div className="col-span-2 p-3 text-blue-500 text-h10 2xl:text-scaled-h10 font-semibold">
            Profile
          </div>
          <div className="col-span-2 p-3 text-blue-500 text-h10 2xl:text-scaled-h10 font-semibold">
            Services
          </div>
          <div className="col-span-2 p-3 text-blue-500 text-h10 2xl:text-scaled-h10 font-semibold">
            Date and Time
          </div>
          <div className="col-span-2 p-3 text-blue-500 text-h10 2xl:text-scaled-h10 font-semibold">
            Amount
          </div>
          <div className="col-span-2 p-3 text-blue-500 text-h10 2xl:text-scaled-h10 font-semibold">
            Status
          </div>
        </div>

        {data && data.length > 0 ? (
          <div className="overflow-y-scroll hide-scrollbar">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-10 border-b border-grey-600"
              >
                <div className="col-span-2 p-3 text-h10 2xl:text-scaled-h10 font-medium flex items-center text-black-500">
                  Irie Mitchell
                </div>
                <div className="col-span-2 text-h10 2xl:text-scaled-h10 font-medium flex items-center p-3 text-black-500">
                  Contract Review
                </div>
                <div className="col-span-2 p-3 text-h10 2xl:text-scaled-h10 font-medium flex items-center text-black-500">
                  05 Jan, 2024 07:39 am
                </div>
                <div className="col-span-2 p-3 text-h10 2xl:text-scaled-h10 font-semibold text-olblue-500">
                  $1200
                </div>
                <div className="col-span-2 p-3 text-h10 2xl:text-scaled-h10 font-semibold text-black-500">
                  <Tag text="Deposit" status="processing" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={escrow}
                alt="escrow"
                width={32}
                height={32}
                className="mx-auto"
              />
              <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-400 mx-auto">
                No recent transaction found.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
