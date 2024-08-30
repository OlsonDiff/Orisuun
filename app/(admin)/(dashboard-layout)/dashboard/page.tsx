'use client';
import React, { useEffect } from 'react';
import BusinessDevelopment from './_section/business-development';
import Rating from './_section/rating';
import TransactionHistory from './_section/transaction-history';
import Favourites from './_section/favourites';
import RecentChats from './_section/recent-chats';
import { toast } from 'react-toastify';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 xl:col-span-8">
          <BusinessDevelopment />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <Rating />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 xl:col-span-6">
          <RecentChats />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <Favourites />
        </div>
      </div>
      <div className="">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;
