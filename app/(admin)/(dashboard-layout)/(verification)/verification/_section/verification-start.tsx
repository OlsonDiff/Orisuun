import Modal from '@/components/modal';
import Button from '@/components/ui/button';
import Note from '@/components/ui/note';
import Featured from '@/icons/verification/featured';
import Like from '@/icons/verification/like';
import Megaphone from '@/icons/verification/megaphone';
import Money from '@/icons/verification/money';
import StyledTick from '@/icons/verification/styled-tick';
import Tag from '@/icons/verification/tag';
import Tick from '@/icons/verification/tick';
import Visibility from '@/icons/verification/visibility';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import PaymentForm from '@/components/payment-form';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  checkUserVerificationStatus,
  getVerificationPaymentIntent,
} from '@/server-actions/verification';
import { RootState } from '@/data/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const VerificationStart: React.FC<IProps> = ({ step, setStep }) => {
  const stripePromise = loadStripe(
    (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string) ||
      'pk_test_51OssK1BOyWHELjbjy7d77ajLCS43yxCfnvkVOzl62EZ36HiaBWBf1ljqTgfSzTtJlFOwrAY9JqpKo02omvRWpQ5z00kfqqqo1K'
  );
  const [clientSecret, SetClientSecret] = useState<any | null>(null);
  const [paymentIntent, SetPaymentIntent] = useState<any | null>(null);
  const [isVerificationFeePaid, SetisVerificationFeePaid] =
    useState<boolean>(false);

  const [userDetails, SetUserDetails] = useState<any | null>(null);

  const [paymentIntentDetails, SetPaymentIntentDetails] = useState<any | null>(
    null
  );
  const [paypalTransactionId, SetPaypalTransactionId] = useState<any | null>(
    null
  );

  const { currentUser } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  const getPaymentVerificationDetailsData = useCallback(async () => {
    try {
      if (currentUser.UserId !== null) {
        const result = await getVerificationPaymentIntent({
          Id: currentUser.UserId,
        });
        if (result.success) {
          SetPaymentIntentDetails(result.data.PaymentIntent);
          SetUserDetails(result.data.User);
          SetisVerificationFeePaid(result.data.isVerificationFeePaid);
          SetClientSecret(result.data.PaymentIntent.ClientSecret);
          SetPaypalTransactionId(
            result.data.verificationPaymentRecord.PayPalTransactionId
          );

          // toast.error(result.message);
          // SetClientSecret(
          //   'pi_3PcR8LBOyWHELjbj3FwXlLGe_secret_MjQJY3uxJjsbxkfYOY12k1dA0'
          // );
          // SetPaymentIntent('pi_3Pc4sFKwjZqBW5VI2R3Yk0WN');
          // setShowModal(true);
        } else {
        }
      }
    } catch (error) {
      console.error(error, 'Error');
    }
  }, [dispatch, currentUser?.UserId]);

  const getCurrentUserVerificationDetailsData = useCallback(async () => {
    try {
      if (currentUser.UserId !== null) {
        const result = await checkUserVerificationStatus({
          Id: currentUser.UserId,
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
  }, [dispatch, currentUser?.UserId]);

  useEffect(() => {
    if (currentUser) {
      getCurrentUserVerificationDetailsData();
      getPaymentVerificationDetailsData();
    }
  }, [currentUser, getCurrentUserVerificationDetailsData]);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=AaUvowFTOcB5La2vMnaWOsGyhZJMNUwRibg4wLIZ2IWTdl9fuG_hAppYHztt5Qd4EuojyYQBJzmfshRN"
        data-sdk-integration-source="button-factory"
      ></Script>

      <div className="grid grid-cols-8 gap-5 p-4 md:p-6">
        <div className="col-span-8 my-4 lg:col-span-4 md:mx-4 md:my-11">
          <div className="mb-6">
            <StyledTick className="mb-2 text-green-700" />
            <h1 className="font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">{`Let's Get You Verified!`}</h1>
          </div>
          <div className="mb-10">
            <h3 className="mb-4 font-semibold text-omblue-800 text-h7 2xl:text-scaled-h7">
              Verification Benefits
            </h3>
            <ul className="flex flex-col gap-4 font-medium text-blue-400 text-h8 2xl:text-scaled-h8">
              <li className="flex items-center gap-2">
                <Visibility />
                <p>2x-3x visibility</p>
              </li>
              <li className="flex items-center gap-2">
                <Like />
                <p>Increased credibility</p>
              </li>
              <li className="flex items-center gap-2">
                <Featured />
                <p>The chance to be featured on our pages</p>
              </li>
              <li className="flex items-center gap-2">
                <Money />
                <p>The ability to launch a fundraiser</p>
              </li>
              <li className="flex items-center gap-2">
                <Tag />
                <p>Access to the partner discount portal</p>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="mb-4 font-semibold text-omblue-800 text-h7 2xl:text-scaled-h7">
              To apply to become verified, you must
            </h3>
            <ul className="flex flex-col gap-4 font-medium text-blue-400 text-h8 2xl:text-scaled-h8">
              <li className="flex items-center gap-2">
                <Tick />
                <p>Be a premium member</p>
              </li>
              <li className="flex items-center gap-2">
                <Tick />
                <p>Submit the required documentation</p>
              </li>
              <li className="flex items-center gap-2">
                <Tick />
                <p>
                  Pay the review fee :{' '}
                  <span className="font-semibold cursor-pointer text-h5 2xl:text-scaled-h5 text-omblue-500">
                    $99
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="max-w-[320px] mx-auto my-4">
            {isVerificationFeePaid ? (
              <button className="bg-green-100 border border-green-700 border-dotted text-green-800 p-4 text-h9 2xl:text-scaled-h9 py-3 mb-4 w-full rounded-md">
                Verification fee: <span className="font-semibold">Paid</span>
              </button>
            ) : (
              <button
                className="bg-omblue-500 text-white p-4 font-semibold text-h9 2xl:text-scaled-h9 py-3 mb-4 w-full rounded-md"
                onClick={() => setShowModal(!showModal)}
              >
                Pay verification fee
              </button>
            )}
          </div>
          <Note text="For team verifications, each member of the team must be individually verified. Verifications may require a video call." />
        </div>
        <div className="flex flex-col col-span-8 lg:col-span-4 lg:col-start-5 md:mx-4 md:my-11">
          <div className="flex-grow mb-4">
            <div className="flex flex-col w-full gap-4 p-6 border rounded-lg border-ol-blue-100 bg-olblue-50">
              <Megaphone />
              <h4 className="font-semibold text-h5 2xl:text-scaled-h5 text-olblue-800">
                Disclaimer / Statement on documents
              </h4>
              <p className="font-medium text-h8 2xl:text-scaled-h8 text-olblue-800">
                Although we do take every measure to protect your documents
                while they are in our possession and delete them after 90 days,
                we do ask, for your protection and as a matter of good data
                hygiene, that you not send any sensitive documents we did not
                ask for and that you redact any non-pertinent sensitive personal
                information in the documents we do need (e.g., personal
                addresses, etc.).
              </p>
            </div>
          </div>
          <div className="py-4">
            <Button
              className="mt-auto ml-auto px-4 py-3 bg-omblue-500 text-white md:w-[170px] rounded-md text-h9 2xl:text-scaled-h9 font-semibold w-full"
              title="Agree"
              onClick={() => setStep(step + 1)}
            />
          </div>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Verification Fee Payment"
      >
        {clientSecret && paymentIntentDetails && (
          <Elements stripe={stripePromise}>
            <PaymentForm
              paymentClientSecret={clientSecret}
              paymentAmount={'$99'}
              paymentDuration={'One time'}
              paymentIntent={paymentIntent}
              paypalPlanID={paypalTransactionId}
              paymentType={'VerificationFee'}
            />
          </Elements>
        )}
      </Modal>
    </>
  );
};

export default VerificationStart;
