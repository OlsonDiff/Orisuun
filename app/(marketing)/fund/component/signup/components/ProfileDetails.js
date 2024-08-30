import React, { useState } from 'react';
import { Input } from '../../../../../../components/marketing/Input';

const defaultAmount = ['10', '25', '50', '100', '500', '1000'];

export const ProfileDetails = ({
  register,
  errors,
  includePassword = true,
  includeCity = false,
  includeAmount = false,
  includeContribution = false,
  includeSubcriptionKey = false,
  includeFirstName = true,
  includeLastName = true,
  includeEmail = true,
  setSelectedAmount,
  selectedAmount
}) => {
  // const [selectedAmount, setSelectedAmount] = useState('100');

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {includeFirstName && (
        <Input
          name="firstName"
          {...register('firstName')}
          placeholder="First Name"
          errors={errors}
          containClass="col-span-1 small-500:col-span-2"
        />
      )}
      {includeLastName && (
        <Input
          name="lastName"
          {...register('lastName')}
          placeholder="Last Name"
          errors={errors}
          containClass="col-span-1 small-500:col-span-2"
        />
      )}

      {includeEmail && (
        <Input
          name="email"
          {...register('email')}
          placeholder="Email"
          errors={errors}
          type="email"
          containClass="col-span-2"
        />
      )}

      {includeSubcriptionKey && (
        <Input
          name="subscriptionKey"
          {...register('subscriptionKey')}
          placeholder="Unique subscription key (from confirmation email)"
          errors={errors}
          containClass="col-span-2"
        />
      )}
      {includeCity && (
        <Input
          name="city"
          {...register('city')}
          placeholder="City"
          errors={errors}
          containClass="col-span-2"
        />
      )}
      {includeContribution && (
        <div className="flex flex-col mt-6 w-full col-span-2">
          <div className="flex flex-col sm:gap-10 gap-4">
            <p className="text-sm text-[#6E6E6E] font-medium">
              Contribution amount:
            </p>
            <div className="grid grid-cols-3 gap-4">
              {defaultAmount.map((amount, index) => (
                <div
                  key={index}
                  onClick={() => handleAmountClick(amount)}
                  className={`cursor-pointer border rounded-[54px] py-2 px-5 text-center ${amount === selectedAmount
                    ? 'border-[#2357C6] bg-[#F2F7FC] font-bold text-[#2357C6]'
                    : 'border-[#B2B3B3] text-[#6E6E6E]'
                    }`}
                >
                  <p>{amount}</p>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="flex flex-col w-full gap-3 mt-10 small-500:mt-8 col-span-2">
            <p className="text-sm text-[#6E6E6E] font-medium">Custom amount:</p>
          </div> */}
        </div>
      )}

      {/* {includeAmount && (
        <Input
          name="amount"
          {...register('amount')}
          placeholder="Amount"
          errors={errors}
          type="number"
          containClass="col-span-2 pb-10 lg:mb-[130px] no-spinner"
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(e.target.value)}
        />
      )} */}

      {includePassword && (
        <>
          <Input
            name="password"
            {...register('password')}
            errors={errors}
            placeholder="Password"
            type="password"
            containClass="col-span-2"
          />
          <Input
            name="confirmPassword"
            {...register('confirmPassword')}
            errors={errors}
            placeholder="Confirm Password"
            type="password"
            containClass="col-span-2"
          />
        </>
      )}
    </div>
  );
};
