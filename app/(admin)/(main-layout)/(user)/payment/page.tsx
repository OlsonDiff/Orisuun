'use client';

import Logo from '@/icons/logo';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import signupBanner from '@/public/images/signup-banner.png';
import PaymentForm from '@/components/payment-form';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { decryptQueryParamsToObject } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import Tick from '@/icons/tick';
import { fetchUserDetails } from '@/server-actions/payment';
import Script from 'next/script';
import { setUserDetails } from '@/data/slices/auth-slice';

const stripePromise = loadStripe(
  (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string) ||
  'pk_test_51OssK1BOyWHELjbjy7d77ajLCS43yxCfnvkVOzl62EZ36HiaBWBf1ljqTgfSzTtJlFOwrAY9JqpKo02omvRWpQ5z00kfqqqo1K'
);

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const userDetails = useSelector((state: RootState) => state.auth.userDetails);

  const [stripeClientSecrect, SetStripeClientSecret] = useState(null);
  const [paypalPlanId, SetPaypalPlanId] = useState(null);

  const fetchUserDetailsFunc = useCallback(
    async (userId: string) => {
      const result = await fetchUserDetails(userId);
      const userDetailsData = result.data;

      SetStripeClientSecret(
        userDetailsData?.UserStripeDetails?.paymentIntent?.ClientSecret
      );
      SetPaypalPlanId(userDetails?.UserPaypalDetails?.paypalSubcriptionId);
      dispatch(setUserDetails(result?.data));
    },
    [dispatch]
  );

  useEffect(() => {
    const userId = searchParams.get('userId');
    if (!userId) {
      router.push('/signup'); // Redirect to signup page if userId is not present
    } else if (!userDetails) {
      fetchUserDetailsFunc(userId);
    }
  }, [searchParams, userDetails, fetchUserDetailsFunc]);

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
          'AaUvowFTOcB5La2vMnaWOsGyhZJMNUwRibg4wLIZ2IWTdl9fuG_hAppYHztt5Qd4EuojyYQBJzmfshRN'
          }&vault=true&intent=subscription`}
        data-sdk-integration-source="button-factory"
      ></Script>

      <Elements stripe={stripePromise}>
        <div className="flex h-screen overflow-hidden">
          <div className="flex-grow overflow-y-auto max-h-[150rem] w-full md:w-1/2">
            <div className="px-4 py-6 pb-16 mx-auto max-w-[40rem] md:w-3/5">
              <Logo className="w-40 h-12 mb-10" />

              {/* <Elements stripe={stripePromise}> */}
              <div className="flex items-center justify-between w-full my-6 border-t border-b border-black-50">
                <h6 className="my-6 font-semibold text-h6 2xl:text-scaled-h6 text-black-200">
                  Profile Details
                </h6>
                <Tick />
              </div>
              {stripeClientSecrect && (
                <PaymentForm
                  paymentClientSecret={stripeClientSecrect}
                  paymentAmount={`$${userDetails?.UserSubscriptionDetails?.Amount}`}
                  paymentDuration={`${userDetails?.UserSubscriptionDetails.BillingFrequency}`}
                  paymentIntent={userDetails?.UserStripeDetails?.paymentIntent}
                  paypalPlanID={
                    userDetails?.UserPaypalDetails?.paypalSubscriptionId
                  }
                  paymentType={'SignupSubscription'}
                />
              )}
              {/* </Elements> */}
            </div>
          </div>
          <div className="relative items-start hidden xl:flex xl:w-2/5">
            <Image
              src={signupBanner}
              alt="Orisuun - Take your business to the next level"
              quality={100}
              priority
              className="w-full"
            />
          </div>
        </div>
      </Elements>
    </>
  );
};

export default PaymentPage;
