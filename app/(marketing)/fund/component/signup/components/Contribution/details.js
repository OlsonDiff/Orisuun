'use client';

import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { MonthlyDetails } from '../Contribution/monthlyDetails.js';
import { ProfileDetails } from '../ProfileDetails.js';
import { Button } from '../../../../../../../components/marketing';
import { detailsSchema } from '../../../../../../../utils/marketing/schemas';
import { PaymentMethod } from '../PaymentMethod.js';
import { createBWFSubscription } from '../../../../../../../server-actions/bWFPayments.ts';
import PaymentForm from '@/components/payment-form.tsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Script from 'next/script.js';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_BWF_PUBLIC_KEY ||
  'pk_test_51P4UjQKwjZqBW5VIvk8RbJoraD18wyieJK8PnCSnpTgTb8yKXk33vdZjV2MjHdd6z9N7BXHAqbjkYUwVL5enKfHY00wY3cbzVA'
);

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

export const Details = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [stripeClientSecrect, SetStripeClientSecret] = useState(null);
  const [stripePaymentIntent, SetStripePaymentIntent] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('100');
  const [paypalDetails, setPaypalDetails] = useState(null);
  const [bwfDetails, setBwfDetails] = useState(null);

  const [userData, setUserData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(detailsSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    console.log(data, selectedAmount, 'data is here');
    try {
      // const result = await createBWFSubscription(data);
      const requestData = {
        FirstName: data.firstName,
        LastName: data.lastName,
        City: data.city,
        Email: data.email,
        Amount: Number(selectedAmount),
      };
      const response = await axios.post(
        `${apiEndpoint}/Marketing/CreateBwfSubscription`,
        requestData,
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      );

      console.log(response, 'response');
      if (response.status === 200) {
        toast.success(response?.data?.Message || 'Subscription created successfully', { containerId: "containerA" });
        const payload = {
          FirstName: data.firstName,
          LastName: data.lastName,
          CityName: data.city,
          Email: data.email,
          // Amount: Number(selectedAmount),
          StripeCustomerId: response?.data?.Result?.bwfPaymentRecord?.StripeCustomerId,
          // IsSubscribed: "",
          StripeSubscriptionId: response?.data?.Result?.bwfPaymentRecord?.StripeSubscriptionId
        }
        const responseCustomer = await axios.post(
          `${apiEndpoint}/Marketing/CreateCustomer`,
          payload,
          {
            headers: {
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        );
        console.log(responseCustomer, "responseCustomer");

      }
      SetStripeClientSecret(response.data?.Result?.paymentIntent?.ClientSecret);
      SetStripePaymentIntent(response.data?.Result?.paymentIntent);
      setPaypalDetails(response.data?.Result?.paypalSubscription);
      setBwfDetails(response.data?.Result?.bwfPaymentRecord);
      setShowPaymentMethod(true);
    } catch (error) {
      setError(error.message);
      toast.error(error.response?.data?.Message || 'Failed to create subscription', { containerId: "containerA" });
      console.log(error);
    } finally {
      setLoading(false);
      console.log('attempted submit');
    }
  };

  console.log("errors ", errors);

  console.log("stripePaymentIntent ", stripeClientSecrect, stripePaymentIntent, bwfDetails?.Amount?.toString(), stripePaymentIntent, paypalDetails?.id);


  return (
    <main className="lg:max-w-[1117px] lg:h-[785px] h-full w-full small-1000:px-4 small-1000:pt-4 small-1000:pb-6">
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process?.env?.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
          'AaUvowFTOcB5La2vMnaWOsGyhZJMNUwRibg4wLIZ2IWTdl9fuG_hAppYHztt5Qd4EuojyYQBJzmfshRN'
          }&vault=true&intent=subscription`}
        data-sdk-integration-source="button-factory"
      ></Script>
      <section className="w-full h-full flex small-1000:flex-col small-1000:overflow-y-scroll hide-scrollbar">
        <MonthlyDetails />
        <div className="h-full lg:pt-[92px] small-1000:w-full lg:px-[58px] overflow-y-auto hide-scrollbar overflow-x-hidden">
          <div className="h-full lg:w-[443px] w-full flex flex-col gap-10 ">
            <Suspense>
              {showPaymentMethod ? (
                <div className="pb-[42px]">
                  {stripeClientSecrect && (
                    <Elements stripe={stripePromise}>
                      <PaymentForm
                        paymentClientSecret={stripeClientSecrect}
                        paymentAmount={`$${bwfDetails.Amount.toString()}`}
                        paymentDuration={'Month'}
                        paymentIntent={stripePaymentIntent}
                        paypalPlanID={paypalDetails?.id}
                        paymentType={'BWFSubscription'}
                      />
                    </Elements>
                  )}
                  {/* <PaymentMethod userData={userData} /> */}
                </div>
              ) : (
                <div className="pb-[42px]">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="lg:space-y-6"
                  >
                    <div className="space-y-2">
                      <p className="text-sm text-[#6E6E6E] font-medium small-1000:hidden">
                        Personal details
                      </p>
                      <p className="text-sm lg:hidden text-[#6E6E6E] font-medium">
                        Profile details
                      </p>
                      <div className=" w-full">
                        <ProfileDetails
                          register={register}
                          errors={errors}
                          includeCity={true}
                          includeAmount={true}
                          includePassword={false}
                          includeContribution={true}
                          setSelectedAmount={setSelectedAmount}
                          selectedAmount={selectedAmount}
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full h-12"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? 'Submitting...' : 'Proceed to payment'}
                    </Button>
                  </form>
                  <p className="text-sm text-[#6E6E6E] mt-4 text-center font-medium">
                    All contributions are made on a monthly basis
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
};
