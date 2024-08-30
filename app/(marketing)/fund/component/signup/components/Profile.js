'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  billingFrequency,
  planType,
  profileTypes,
} from '../../../../../../data/marketing/signupData';
import { Button } from '../../../../../../components/marketing';
import { PlanType } from './PlanType';
import { BillingFrequency } from './BillingFrequency';
import { ProfileDetails } from './ProfileDetails';
import { Select } from '../../../../../../components/marketing/Input';
import { profileSchema } from '../../../../../../utils/marketing/schemas';
import { toast } from 'react-toastify';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';



export const Profile = ({ setPage }) => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const profile = searchParams.get('profile');

  const filteredProfileTypes = profileTypes.filter(
    (type) => type !== 'Partners'
  );

  const [selectedPlan, setSelectedPlan] = useState(planType[0]);
  const [selectedBilling, setSelectedBilling] = useState(
    plan ? plan : billingFrequency[0]?.type
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availablePlanTypes, setAvailablePlanTypes] = useState(planType);
  const [priceResult, setPriceResult] = useState(null);
  const [billings, setBillings] = useState([]);
  const [profilesTypes, setProfileTypes] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const profileTypeValue = watch('profileType');

  useEffect(() => {
    setAvailablePlanTypes(
      selectedOption == 4 ? [planType[0]] : planType
    );
  }, [selectedOption]);

  console.log(selectedPlan, selectedOption, "selectedOption");


  // useEffect(() => {
  //   const fetchSubscriptionPrice = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       console.log("profileTypeValue ", profileTypeValue, selectedPlan);

  //       const response = await axios.post(
  //         'http://192.168.1.59:5017/api/Marketing/GetSubscriptionPrice',
  //         {
  //           ProfileType: 1,
  //           PlanType: selectedPlan == "Growth, visibility and collaboration" ? 2 : 1,
  //         },
  //         {
  //           headers: {
  //             XApiKey:
  //               'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       setPriceResult(response?.data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSubscriptionPrice();
  // }, [profileTypeValue, selectedPlan]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    console.log(data);
    try {
      const response = await axios.post(
        `${apiEndpoint}/User/Register`,
        {
          FirstName: data?.firstName,
          LastName: data?.lastName,
          Email: data?.email,
          Password: data?.password,
          PrivacyCheck: true,
          ProFileType: profileTypeValue,
          BillingFrequency: selectedBilling,
          // BillingPlanId: Object.keys(selectedPlan)[0],
          BillingPlanId: (billings?.filter((data) => data?.Name === selectedBilling)[0])?.Id,
          // SubscriptionPlanType
        },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        toast.success('Registration successful', { containerId: "containerA" });
        console.log("response.data?.data ", response.data);

        localStorage.setItem("registerUser", JSON.stringify(response.data?.Result));

        // navigate.push("/signin")
      } else {
        console.log("elseeee");

        toast.error(response?.data?.message || 'Registration failed', { containerId: "containerA" });
      }
      console.log(response.data, 'success');
      setPage(1);
    } catch (error) {
      toast.error(error?.response?.data?.Message || 'Registration failed', { containerId: "containerA" });
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
      // toast.error('Registration failed');
      console.log('attempted submit');
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const res = await axios.post('http://192.168.1.59:5017/api/Marketing/GetSubscriptionPrice', {
  //       ProfileType: selectedOption,
  //       PlanType: Object.keys(selectedPlan)[0],
  //     }, {
  //       headers: {
  //         XApiKey:
  //           'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     console.log("res ", res.data);

  //     if (res.status === 200) {
  //       setBillings(res.data?.Result)
  //     }
  //   })()
  // }, [selectedOption, selectedPlan])


  useEffect(() => {
    (async () => {
      const resUserProfileType = await axios.get(`${apiEndpoint}/Profile/UserProfileTypes`, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          'Content-Type': 'application/json',
        },
      })
      console.log("resUserProfileType ", resUserProfileType);

      if (resUserProfileType.status == 200) {
        console.log("resUserProfileType?.data?.Result ", resUserProfileType?.data?.Result);

        setProfileTypes(resUserProfileType?.data?.Result)

        setSelectedOption(resUserProfileType?.data?.Result[0]?.Id)
      }

    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (selectedOption && selectedPlan) {
        const resSubScriptionPlan = await axios.post(`${apiEndpoint}/Marketing/GetSubscriptionPlanBasedOnProfilePlan`, {
          ProfileType: selectedOption?.toString(),
          PlanType: selectedPlan == "Visibility and collaboration" ? "1" : "2"
        },
          {
            headers: {
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
              'Content-Type': 'application/json',
            },
          })
        console.log("subScriptionPlan ", resSubScriptionPlan);
        if (resSubScriptionPlan?.status == 200) {
          setBillings(resSubScriptionPlan?.data?.Result)
        }
      }
    })()
  }, [selectedOption, selectedPlan])


  return (
    <>
      <Suspense>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-4"
        >
          <div className="space-y-2">
            <p className="text-sm text-[#6E6E6E] font-medium">Profile Type</p>
            <select
              name="profileType"
              id=""
              onChange={handleChange}
              className="w-full bg-transparent py-3 px-4 select-wrapper text-sm font-medium outline-none !border border-[#B2B3B3] rounded-[8px]"
            >
              {profilesTypes?.map(({ UserProfileName, Id }) => (
                UserProfileName !== "Partners" && <option key={Id} value={Id}>
                  {UserProfileName}
                </option>
              ))}
            </select>
            {/* <Select
              options={filteredProfileTypes}
              name="profileType"
              variant="outlined"
              {...register('profileType')}
              value={selectedOption}
              onChange={handleChange}
              initialOption={profile}
              className="w-full bg-transparent py-3 px-4 select-wrapper text-sm font-medium outline-none !border border-[#B2B3B3] rounded-[8px]"
            /> */}
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[#6E6E6E] font-medium">Plan Type</p>
            <PlanType
              selected={selectedPlan}
              setSelected={setSelectedPlan}
              planType={availablePlanTypes}
              profileType={selectedOption}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[#6E6E6E] font-medium">
              Billing Frequency
            </p>
            <BillingFrequency
              selected={selectedBilling}
              setSelected={setSelectedBilling}
              billings={billings}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[#6E6E6E] font-medium">
              Profile details
            </p>
            <ProfileDetails register={register} errors={errors} />
          </div>
          <div className="flex gap-2 items-start md:items-center">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              className="mt-2 md:mt-0"
              required
            />
            <label htmlFor="agree">
              I agree to Orisuun&apos;s{' '}
              <Link href="/terms" className="text-nav-blue">
                Terms
              </Link>
              ,{' '}
              <Link href="/refund" className="text-nav-blue">
                Refund
              </Link>
              , and{' '}
              <Link href="/privacy" className="text-nav-blue">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          <Button className="w-full h-12" disabled={loading}>
            {loading ? 'Submitting...' : 'Proceed to Payment'}
          </Button>
        </form>
      </Suspense>
    </>
  );
};
