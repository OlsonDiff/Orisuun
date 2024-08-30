'use client';

import { useCallback, useEffect, useState } from 'react';
import Select from './ui/select';
import { useForm } from 'react-hook-form';
import Toggle from './ui/toggle';
import Image from 'next/image';
import Input from './ui/input';
import Checkbox from './ui/checbox';
import Link from 'next/link';
import Button from './ui/button';
import { cn } from '@/utils/utils';
import { SignupFormData, signupSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getSubscriptionPlanBasedOnProfileType,
  getUserProfileType,
  signupAction,
} from '@/server-actions/signup';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '@/data/slices/auth-slice';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from './loader';
import giftWrap from '@/public/images/vector/gift-wrap.svg';
import { toast } from 'react-toastify';

type ProfileTypeOption = {
  id: number;
  label: string;
  value: string;
};

type SubscriptionTypeOption = {
  id: number;
  isActive: boolean;
  name: string;
};

type SubscriptionPlansOption = {
  id: number;
  isActive: boolean;
  name: string;
  price: any;
  subscriptionTypeId: number;
};

const SignupForm = () => {
  const [profileTypeOptions, SetProfileTypeOptions] = useState<
    ProfileTypeOption[]
  >([]);

  const [subscriptionTypeOptions, SetSubscriptionTypeOptions] = useState<
    SubscriptionTypeOption[]
  >([]);

  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<
    number | null
  >(null);

  const [subscriptionPlanOptions, setSubscriptionPlanOptions] = useState<
    SubscriptionPlansOption[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [subscriptonPlanLoading, setSubscriptionPlanLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoader(true);
      const result: any = await signupAction(data);

      if (result.success) {
        const responseData = result.data.Result;

        dispatch(setUserDetails(responseData));

        toast.success(result.message);
        setLoader(false);
        // Here you can handle successful signup (e.g., show a success message, redirect user)
        // router.push(`/payment?userId=${responseData.UserId}`);
        window.location.href = `/payment?userId=${responseData.UserId}`;

        // change it to window.href
      } else {
        toast.error(result.message);

        if (result.message === 'User already exists with this email address') {
          setLoader(false);
          setTimeout(() => {
            router.push('/signin');
            toast.info('Try Loggging In');
          }, 2000);
        }
        // Here you can handle validation errors (e.g., display error messages to the user)
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      // Handle any unexpected errors
    }
  };

  const getSubscriptionPlansForProfile = useCallback(
    async (profileTypeId: number) => {
      const response = await getSubscriptionPlanBasedOnProfileType(
        profileTypeId
      );
      let subscriptionTypes = response.Subscriptions;
      let subscriptionPlans = response.SubscriptionPlan;

      let subscriptionTypeResult = subscriptionTypes.map((item: any) => ({
        id: item.Id,
        name: item.Name,
        isActive: item.isActive,
      }));

      let subscriptionPlanOptionResult = subscriptionPlans.map((item: any) => ({
        id: item.Id,
        name: item.Name,
        isActive: item.IsActive,
        price: item.Price,
        subscriptionTypeId: item.SubscriptionId,
      }));

      SetSubscriptionTypeOptions(subscriptionTypeResult);
      setSubscriptionPlanOptions(subscriptionPlanOptionResult);

      // Set default values based on URL parameters
      const planTypeParam = searchParams.get('planType');
      const billingFrequencyParam = searchParams.get('billingfrequency');

      if (planTypeParam) {
        const matchingPlanType = subscriptionTypeResult.find(
          (type: any) => type.name.toLowerCase() === planTypeParam.toLowerCase()
        );
        if (matchingPlanType) {
          setValue('planType', matchingPlanType.id);
          setSelectedSubscriptionType(matchingPlanType.id);
        }
      } else {
        setValue('planType', subscriptionTypeResult[0].id);
        setSelectedSubscriptionType(subscriptionTypeResult[0].id);
      }

      if (billingFrequencyParam) {
        const matchingPlan = subscriptionPlanOptionResult.find(
          (plan: any) =>
            plan.name.toLowerCase() === billingFrequencyParam.toLowerCase()
        );
        if (matchingPlan) {
          setValue('billingFrequency', matchingPlan.id);
        }
      } else {
        setValue('billingFrequency', subscriptionPlanOptionResult[0].id);
      }
    },
    [setValue, searchParams]
  );

  const getUserProfileTypefunc = useCallback(async () => {
    try {
      setSubscriptionPlanLoading(true);
      const profileTypes = await getUserProfileType();

      let result = profileTypes.map((item: any) => ({
        id: item.Id,
        label: item.UserProfileName,
        value: item.UserProfileName,
      }));

      if (result) {
        SetProfileTypeOptions(result);
        const profileParam = searchParams.get('profile');

        if (profileParam) {
          const matchingProfile = result.find(
            (profile: any) => profile.id === parseInt(profileParam)
          );
          if (matchingProfile) {
            setValue('profileType', matchingProfile.id);
            await getSubscriptionPlansForProfile(matchingProfile.id);
            setSubscriptionPlanLoading(false);
          }
        } else {
          setValue('profileType', result[0].id);
          await getSubscriptionPlansForProfile(result[0].id);
          setSubscriptionPlanLoading(false);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setSubscriptionPlanLoading(false);
    }
  }, [getSubscriptionPlansForProfile, setValue]);

  useEffect(() => {
    getUserProfileTypefunc();
  }, [getUserProfileTypefunc]);

  if (isLoading) return <Loader />;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 pb-10">
        <div>
          <p className="mb-3 font-normal text-h9 2xl:text-scaled-h9">
            Profile Type
          </p>
          <Select
            options={profileTypeOptions?.filter(
              (item) =>
                item?.value !== 'SystemAdmin' && item?.value !== 'Partners'
            )}
            error={errors.profileType?.message}
            value={profileTypeOptions.find(
              (option) => option.id === watch('profileType')
            )}
            onChange={(e) => {
              setValue('profileType', e.id);
              getSubscriptionPlansForProfile(e.id);
            }}
          />
        </div>
        <div>
          <p className="mb-3 font-normal text-h9 2xl:text-scaled-h9">
            Plan Type
          </p>
          <div className="flex flex-col gap-2 md:flex-row flex-wrap md:flex-nowrap">
            {subscriptionTypeOptions &&
              // Todo: adding a condition for partner
              subscriptionTypeOptions
                .filter((option) => {
                  const selectedProfileType = profileTypeOptions.find(
                    (item) => item.id === watch('profileType')
                  )?.value;

                  if (
                    selectedProfileType === 'Partners' ||
                    selectedProfileType === 'Advocates'
                  ) {
                    return option.name !== 'Premium';
                  }
                  return true;
                })
                .map((option: any) => (
                  <Toggle
                    key={option.id} // Assuming each option has a unique id
                    {...register('planType')}
                    value={option.id} // Adjust the value according to your requirements
                    checked={watch('planType') === option.id}
                    onChange={async () => {
                      setValue('planType', option.id);

                      setSelectedSubscriptionType(option.id);
                      await trigger('planType');
                    }}
                    truncate={false}
                  >
                    {option.name === 'Standard' &&
                      'Visibility and collaboration'}
                    {option.name === 'Premium' &&
                      'Growth, visibility and collaboration'}
                  </Toggle>
                ))}
          </div>
          {errors.planType && (
            <p className="mt-1 text-sm text-scaled-sm text-red-500">
              {errors.planType.message}
            </p>
          )}
        </div>

        <div>
          <p className="mb-3 font-normal text-h9 2xl:text-scaled-h9">
            Billing Frequency
          </p>
          <div className="flex flex-col gap-2 md:flex-row">
            {subscriptionPlanOptions ? (
              !subscriptonPlanLoading ? (
                subscriptionPlanOptions.map(
                  (option) =>
                    selectedSubscriptionType === option.subscriptionTypeId && (
                      <Toggle
                        key={option.id}
                        {...register('billingFrequency')}
                        value={option.id}
                        checked={watch('billingFrequency') === option.id}
                        onChange={async () => {
                          setValue('billingFrequency', option.id);
                          await trigger('billingFrequency');
                        }}
                      >
                        <div>
                          <p className="mb-2">{option.name}</p>
                          <p className="text-[#808181] mb-3 font-normal">
                            $ {option.price} /{' '}
                            {option.name.toLowerCase() !== 'annually'
                              ? option.name.toLowerCase().replace(/ly$/, '')
                              : 'year'}
                          </p>
                          {option.name !== 'Monthly' && (
                            <div className="flex gap-1 font-normal text-omblue-500">
                              <Image
                                src={giftWrap}
                                alt="gift"
                                width={14}
                                height={14}
                              />
                              <p>
                                {option.name === 'Quarterly' && '1 month free'}
                                {option.name === 'Annually' && '5 months free'}
                              </p>
                            </div>
                          )}
                        </div>
                      </Toggle>
                    )
                )
              ) : (
                <></>
              )
            ) : null}
          </div>
          {errors.billingFrequency && (
            <p className="mt-1 text-sm text-red-500">
              {errors.billingFrequency.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <p className="font-normal text-h9 2xl:text-scaled-h9">
            Profile details
          </p>
          <div className="inline-flex w-full gap-3">
            <Input
              placeholder="First name"
              {...register('firstName')}
              error={errors.firstName?.message}
              containerClass="md:w-full"
            />
            <Input
              placeholder="Last name"
              {...register('lastName')}
              error={errors.lastName?.message}
              containerClass="md:w-full"
            />
          </div>
          <Input
            placeholder="Email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            placeholder="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div>
          <Checkbox {...register('agreeTerms')} checked={watch('agreeTerms')}>
            <span className="text-h9 2xl:text-scaled-h9">
              {`I agree to Orisuun's`}{' '}
              <Link className="text-omblue-500" href="/terms">
                Terms
              </Link>
              ,{' '}
              <Link className="text-omblue-500" href={'/refund'}>
                Refund
              </Link>
              , and{' '}
              <Link className="text-omblue-500" href="/privacy-policy">
                Privacy Policy
              </Link>
              .
            </span>
          </Checkbox>
          {errors.agreeTerms && (
            <p className="mt-1 text-sm text-red-500">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>
        <Button
          loading={loader}
          type="submit"
          className={cn('min-w-full btn-secondary', 'rounded-3xl')}
          title="Proceed to payment"
        />
      </div>
    </form>
  );
};

export default SignupForm;
