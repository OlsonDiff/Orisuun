'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import filterIcon from '@/public/images/vector/filter.svg';
import Button from '@/components/ui/button';
import CustomSelect from '@/components/ui/select';
import Input from '@/components/ui/input';
import Table from '@/components/table';
import Pagination from '@/components/pagination';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import Link from 'next/link';
import { loadConnectAndInitialize } from '@stripe/connect-js';
import {
  ConnectPayments,
  ConnectComponentsProvider,
  ConnectAccountOnboarding,
  ConnectAccountManagement,
} from '@stripe/react-connect-js';
import Modal from '@/components/modal';
import { createConnectAccount } from '@/server-actions/contractEscrow';
import { useCallback, useEffect } from 'react';
import { checkUserVerificationStatus } from '@/server-actions/verification';
import { RootState } from '@/data/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllContractsbyUser } from '@/server-actions/contractEscrow';
import Card from '@/components/cards/card';

const TransactionAndEscrow = () => {
  const isMobile = useMobileMediaQuery();
  const [showModal, setShowModal] = useState(false);

  // We use `useState` to ensure the Connect instance is only initialized once
  // const [stripeConnectInstance] = useState(() => {
  //   const fetchClientSecret = async () => {
  //     // Fetch the AccountSession client secret
  //     // const response = await createConnectAccount("73209ba8-a8bc-43b2-b43b-84eae2e13e84");

  //     // if (!response.ok) {
  //     //   // Handle errors on the client side here
  //     //   const {error} = await response.json();
  //     //   console.error('An error occurred: ', error);
  //     //   // document.querySelector('#error').removeAttribute('hidden');
  //     //   return undefined;
  //     // } else {
  //     //   const {client_secret: clientSecret} = await response.json();
  //     //   // document.querySelector('#error').setAttribute('hidden', '');
  //       return response.data.ClientSecret;
  //     // }
  //   }

  //   return loadConnectAndInitialize({
  //     // This is your test publishable API key.
  //     publishableKey:
  //     "pk_test_51P4VZPLUJnO2hpuYz4UN4onEDLi6mLWY2IoWCGgwJ79O0Sjh8a1kAPoYzQzmddtqFTYhPKaghxekBfap64ZY2y2y00jVzHHzJW",
  //     fetchClientSecret: fetchClientSecret,
  //   })
  // });

  const { currentUser } = useSelector((state: RootState) => state.user);

  const getCurrentUserContracts = useCallback(async () => {
    try {
      if (currentUser.UserId !== null) {
        const result = await getAllContractsbyUser({
          ContractCreatorId: currentUser.UserId,
        });
        if (result.success) {
          // toast.error(result.message);
          // dispatch(addCurrentUser(result.data));
        } else {
          if (
            result.message &&
            result.message.toLowerCase().includes('this feature is not for')
          ) {
            toast.error(result.message);
            // router.push('/dashboard'); // Redirect to dashboard
          }
        }
      }
    } catch (error) {
      console.error(error, 'Error');
    }
  }, [currentUser?.UserId]);

  useEffect(() => {
    if (currentUser) {
      getCurrentUserContracts();
    }
  }, [currentUser]);

  return (
    <div className="w-full px-6 py-7">
      <div className="flex items-start md:items-center flex-col md:flex-row justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-1 bg-blue-500 rounded-e-md"></div>
          <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold">
            Escrow Status and Transaction History
          </h6>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button
            title="Stripe Connect"
            onClick={() => setShowModal(true)}
          ></Button>
          <div className="p-2 border border-omblue-100 rounded-md flex items-center">
            <Image src={filterIcon} alt="filter icon" />
          </div>
          <Link href={'/transactions-and-escrow/contract/new-contract'}>
            <Button title="Start New Contract"></Button>
          </Link>
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
      <div className="mt-4 flex justify-end">
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

export default TransactionAndEscrow;

//  <Modal
// showModal={showModal}
// setShowModal={setShowModal}
// title="Stripe Connect OnBoard"
// >
// <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
//  <ConnectAccountOnboarding onExit={()=> {console.log("hi")}} />

//  < ConnectAccountManagement/>
// {/* <ConnectPayments /> */}
// </ConnectComponentsProvider>
// </Modal>
