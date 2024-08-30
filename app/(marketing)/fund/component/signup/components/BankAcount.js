'use client';

import { useState } from 'react';

import { Input } from '../../../../../../components/marketing/Input';
import { AccountType } from './AccountType';
import { accountType } from '../../../../../../data/marketing/signupData';

export const BankAccount = ({ register, errors, setSelectedAccountType, selectedAccountType }) => {
  // const [selectedAccountType, setSelectedAccountType] = useState(
  //   accountType[0]
  // );
  return (
    <div className="grid grid-cols-1 gap-4 pb-4">
      <Input
        name="nameOnAccount"
        {...register('nameOnAccount')}
        errors={errors}
        placeHolder="Name on Account"
      />
      <Input
        name="routingNumber"
        {...register('routingNumber')}
        errors={errors}
        placeHolder="ACH Routing Number"
      />
      <Input
        name="accountNumber"
        {...register('accountNumber')}
        errors={errors}
        placeHolder="Account Number"
      />
      <Input
        name="confirmAccountNumber"
        {...register('confirmAccountNumber')}
        errors={errors}
        placeHolder="Confirm Account Number"
      />
      <div className="space-y-2">
        <p className="text-sm text-[#6E6E6E] font-medium">Account Type</p>
        <AccountType
          accountType={accountType}
          selected={selectedAccountType}
          setSelected={setSelectedAccountType}
        />
      </div>
    </div>
  );
};
