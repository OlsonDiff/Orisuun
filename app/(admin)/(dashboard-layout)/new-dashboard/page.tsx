'use client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import BusinessDevelopment from './_section/business-development';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 xl:col-span-8">
          <BusinessDevelopment />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
