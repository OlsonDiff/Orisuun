import Image from 'next/image';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CreditCard } from './CreditCard';
import { BankAccount } from './BankAcount';
import { Button } from '../../../../../../components/marketing';
import {
  bankSchema,
  cardSchema,
} from '../../../../../../utils/marketing/schemas';
import FundBtn from '../../FundBtn';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SuccessModal } from './Contribution/successModal';
import Modal from '@/components/marketing/Payment Modal/Modal';
import { useRouter } from 'next/navigation';
import { accountType } from '@/data/marketing';
import { CardElement, CardNumberElement, Elements, EmbeddedCheckout, EmbeddedCheckoutProvider, ExpressCheckoutElement, PaymentRequestButtonElement, useElements } from '@stripe/react-stripe-js';
import ApplePay from '@/icons/apple-pay';
import { loadStripe } from '@stripe/stripe-js';
import StripePayment from "./StripePayment"
import ApplePayPayment from "./ApplePayPayment"
import GooglePay from './GooglePayPayment';
// import PaymentRequestForm from './PaymentRequestForm';
// import { useRouter } from 'next/router';
// import Modal from '@/components/modal';
const stripePromise = loadStripe(
  (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) ||
  'pk_test_51OssK1BOyWHELjbjy7d77ajLCS43yxCfnvkVOzl62EZ36HiaBWBf1ljqTgfSzTtJlFOwrAY9JqpKo02omvRWpQ5z00kfqqqo1K'
);

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

const expressCheckoutOptions = {
  buttonType: {
    applePay: 'buy',
    googlePay: 'buy',
    paypal: 'buynow'
  }
}

export const PaymentMethod = ({ userData }) => {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState(
    accountType[0]
  );
  const [amount, setAmount] = useState()
  const elements = useElements();

  const handleChange = (option) => {
    setPaymentMethod(option);
  };
  const {
    register: cardRegister,
    handleSubmit: handleCardSubmit,
    formState: { errors: cardErrors },
  } = useForm({
    resolver: yupResolver(cardSchema),
  });

  const {
    register: bankRegister,
    handleSubmit: handleBankSubmit,
    formState: { errors: bankErrors },
  } = useForm({
    resolver: yupResolver(bankSchema),
  });

  const cardSubmit = async (data) => {
    console.log(data);
    try {
      const userData = JSON.parse(localStorage.getItem('registerUser'));
      const verifyPayment = await axios.post(`${apiEndpoint}/UserVerification/GetVerificationPaymentIntent`, {
        UserId: userData?.user?.Id,
        CardNumber: data?.cardNumber,
        CardExpiry: data?.expiry,
        CardCVV: data?.cvc,
        PlanId: userData?.BillingPlanId
      },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            // 'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (verifyPayment.status === 200) {
        const payload = {
          UserId: userData?.user?.Id,
          SubscriptionPlanType: userData?.user?.SubscriptionPlanType,
          PaymentStatus: userData?.user?.SubscriptionStatus,
          NameOfCardHolder: data?.nameOnCard,
          CardNumber: data?.cardNumber,
          CardExpiry: data?.expiry,
          CardCVV: data?.cvc,
          Amount: 0,
          BillingFrequency: userData?.user?.BillingFrequency,
          PlanId: userData?.BillingPlanId
        }
        const payment = await axios.post(`${apiEndpoint}/User/PayAccountPayment`, payload, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            // 'Content-Type': 'multipart/form-data',
          },
        })

        if (payment.status === 200) {
          // setIsOpen(true)
          toast.success('Payment Successful!', { containerId: "containerA" });
          router.push("/signin")
        }
      }
    } catch (error) {
      toast.error(error?.response?.Message || 'Payment Failed!', { containerId: "containerA" });
    }

  };

  const bankSubmit = async (data) => {
    console.log(data);
    try {
      const registerData = JSON.parse(localStorage.getItem("registerUser"))
      const payload = {
        AccountHolderName: data?.nameOnAccount,
        AccountType: selectedAccountType,
        RoutingNumber: data?.routingNumber,
        AccountNumber: data?.accountNumber,
        Country: "US",
        Currency: "USD",
        // Amount: "11.99",
        PlanId: registerData?.BillingPlanId,
        SubscriptionType: registerData?.user?.SubscriptionPlanType,
        BillingFrequency: registerData?.user?.BillingFrequency,
        UserProfileName: registerData?.user?.ProfileType
      }

      const res = await axios.post(`${apiEndpoint}/Marketing/CreateBankAccountPayment`, payload, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      })

      if (res.status == 200) {
        toast.success('Payment Successful!', { containerId: "containerA" });
        const userData = JSON.parse(localStorage.getItem('registerUser'))
        const resPayBankAccount = await axios.post(`${apiEndpoint}/User/PayBankAccountACHPayment`, {
          UserId: userData?.user?.Id,
          SubscriptionPlanType: registerData?.user?.SubscriptionPlanType,
          TransactionId: "",
          PaymentStatus: "Pending",
          NameOfCardHolder: data?.nameOnAccount,
          CardNumber: data?.accountNumber,
          CardExpiry: "",
          Amount: 0,
          BillingFrequency: registerData?.user?.BillingFrequency,
          PlanId: registerData?.BillingPlanId,
          ACHRoutingNumber: data?.routingNumber,
          AccountType: selectedAccountType
        },
          {
            headers: {
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        )
        if (resPayBankAccount.status === 200) {
          router.push("/signin")
        }
        // setIsOpen(true)
      }

    } catch (error) {
      console.log("Error ", error);
      toast.error(error?.response?.Message || 'Payment Failed!', { containerId: "containerA" });

    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      handleCardSubmit(cardSubmit)();
    } else if (paymentMethod === 'bank') {
      handleBankSubmit(bankSubmit)();
    } else {
      console.log('');
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  // const renderCardFields = () => {
  //   return (
  //     <div className="w-full space-y-4">
  //       <Input
  //         {...register('card_name')}
  //         placeholder="Name on card"
  //         error={errors.card_name?.message}
  //       />
  //       <div className="stripe-input border bg-white focus:border-omblue-500 focus:bg-[#f3f7f9] text-h9 2xl:text-scaled-h9 font-medium px-4 py-3 rounded-md w-full">
  //         <CardNumberElement options={{ showIcon: true }} />
  //       </div>
  //       <div className="flex items-center w-full gap-[18px]">
  //         <div className="stripe-input border bg-white focus:border-omblue-500 focus:bg-[#f3f7f9] text-h9 2xl:text-scaled-h9 font-medium px-4 py-3 rounded-md w-full">
  //           <CardExpiryElement />
  //         </div>
  //         <div className="stripe-input border bg-white focus:border-omblue-500 focus:bg-[#f3f7f9] text-h9 2xl:text-scaled-h9 font-medium px-4 py-3 rounded-md w-full">
  //           <CardCvcElement />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderBankFields = () => {
  //   return (
  //     <div className="space-y-4">
  //       <Input
  //         {...register('bank_name')}
  //         placeholder="Name on Account"
  //         error={errors.bank_name?.message}
  //       />
  //       <Input
  //         {...register('routing_number')}
  //         placeholder="ACH Routing Number"
  //         error={errors.routing_number?.message}
  //       />
  //       <Input
  //         {...register('account_number')}
  //         placeholder="Account Number"
  //         error={errors.account_number?.message}
  //       />
  //       <Input
  //         {...register('confirm_account_number')}
  //         placeholder="Confirm account number"
  //         error={errors.confirm_account_number?.message}
  //       />
  //     </div>
  //   );
  // };


  useEffect(() => {
    if (typeof window.localStorage !== 'undefined') {
      const registerUser = JSON.parse(localStorage.getItem('registerUser'))
      if (registerUser?.paymentIntent) {
        setAmount(registerUser?.paymentIntent?.Amount)
      }
    }
  }, [])

  return (
    <>
      <form onSubmit={handlePayment} className=" space-y-4">

        {/* <Elements stripe={stripePromise}>   <StripePayment /> </Elements> */}
        {/* <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options="sk_test_51OssK1BOyWHELjbjyacWkCinqS6DnVG7xmd63A6jawPzJ8TlfifAITHdovubHVNqDUa6wAfomfxcElk04muc5XIK00EpDa4NfU"
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider> */}
        {/* <Elements stripe={stripePromise}> <ExpressCheckoutElement options={expressCheckoutOptions} /> </Elements> */}
        <div className="flex justify-between items-center border-y border-[#D8D9D9] py-4">
          <p className="text-lg font-semibold text-[#808181]">
            Profile details
          </p>
          <Image
            src="/icons/check.svg"
            className=""
            width={20}
            height={20}
            alt="check"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#6E6E6E]">Payment methods</p>
          <div className="grid grid-cols-3 gap-4">

            {/* <Elements stripe={stripePromise}>  <GooglePay /></Elements> */}
            {/* <div className="border border-[#B2B3B3] rounded-lg py-3 px-4 grid place-items-center">
              <Image
                src="/icons/applePay.svg"
                width={53}
                height={22}
                alt="Apple Pay"
              />
            </div> */}
            {/* <div className="border border-[#B2B3B3] rounded-lg py-3 px-4 grid place-items-center">
              <Image
                src="/icons/googlepay.svg"
                width={55}
                height={24}
                alt="Google Pay"
              />
            </div> */}
            <Elements stripe={stripePromise}>  <StripePayment amount={amount} /></Elements>
            <div className="border border-[#B2B3B3] rounded-lg py-3 px-4 grid place-items-center">
              <Image
                src="/icons/paypal.svg"
                width={78}
                height={20}
                alt="Paypal"
              />
            </div>

            {/* <StripePayment /> */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[45%] h-[1px] bg-[#D8D9D9]" />
          <p className="px-1">or</p>
          <div className="w-[45%] h-[1px] bg-[#D8D9D9]" />
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="space-x-2 md:space-x-4">
            <input
              type="radio"
              name="payment"
              id="card"
              value="card"
              onChange={() => handleChange('card')}
            />
            <label
              htmlFor="card"
              className={clsx(
                'text-lg font-medium text-[#6E6E6E] cursor-pointer',
                paymentMethod === 'card' && 'text-nav-blue font-semibold'
              )}
            >
              Credit Card
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src="/icons/cardGroup.svg"
              className=""
              width={148}
              height={24}
              alt="card group"
            />
            <Popover className="relative">
              <PopoverButton className="text-[#6E6E6E] font-medium">
                +more
              </PopoverButton>
              <PopoverPanel anchor="top start" className="flex flex-col">
                <Image
                  src="/icons/methodGp.svg"
                  className=""
                  width={148}
                  height={24}
                  alt="card group"
                />
              </PopoverPanel>
            </Popover>
          </div>
        </div>
        {paymentMethod === 'card' && (
          <CreditCard register={cardRegister} errors={cardErrors} />
        )}
        <div className="space-x-4">
          <input
            type="radio"
            name="payment"
            id="bank"
            value="bank"
            onChange={() => handleChange('bank')}
          />
          <label
            htmlFor="bank"
            className={clsx(
              'text-lg font-medium text-[#6E6E6E] cursor-pointer',
              paymentMethod === 'bank' && 'text-nav-blue font-semibold'
            )}
          >
            Bank Account (ACH Transaction)
          </label>
        </div>
        {paymentMethod === 'bank' && (
          <BankAccount setSelectedAccountType={setSelectedAccountType} selectedAccountType={selectedAccountType} register={bankRegister} errors={bankErrors} />
        )}

        {paymentMethod !== '' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-blue-strong text-lg font-semibold">Total</p>
              <p className="text-blue-strong font-medium text-sm">
                <span className="text-lg font-semibold">$11.99</span> / month
              </p>
            </div>
            <Button className='w-full' onClick={handlePayment}>I&apos;m ready to build!</Button>
            {/* <FundBtn
              defaultContent="success"
              className={`px-5 py-[10px] text-white text-[16px] w-full small-1000:text-[14px] font-bold leading-150 whitespace-nowrap rounded-full bg-nav-blue flex justify-center items-center`}
            >
              I&apos;m ready to build!
            </FundBtn> */}
            {/* <Button className="w-full">I&apos;m ready to build!</Button> */}
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/icons/lock.svg"
                className=""
                width={14}
                height={16}
                alt="lock"
              />
              <p className="text-sm font-medium text-text-gray">
                Payments are secure and encrypted
              </p>
            </div>
          </div>
        )}
      </form>
      <Modal isOpen={isOpen} onClose={handleCloseModal} className={`z-30`}>
        <SuccessModal onClose={handleCloseModal} />;
      </Modal>
    </>
  );
};
