'use client';

import React, { useEffect, useState } from 'react';
import Close from '@/icons/close';
import StepZero from './_sections/step-zero';
import CofounderMatchSteps from './_sections/cofounder-match-steps';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateBusinessMemberOpportunityData,
  createBusinessMemberOpportunitySchema,
} from '@/utils/schema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { updateCurrentUser } from '@/data/slices/user-slice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { createBusinessMemberOpportunityAction } from '@/server-actions/matches';
import axios from 'axios';
import { stepCoFounderSchemas } from '@/utils/coFounderSchema';

const steps = [
  {
    name: 'Co-Founder & Board  Matcher',
    id: 0,
  },
  {
    name: 'Business Info',
    id: 1,
  },
  {
    name: 'Contact',
    id: 2,
  },
  {
    name: 'Role',
    id: 3,
  },
  {
    name: 'Post Duration',
    id: 4,
  },
];

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

const CreateNewBusiness = () => {
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(0);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setWidth(Math.round(((step / steps.length) * 100 * 100) / 100));
  }, [step]);

  // const currentSchema = stepCoFounderSchemas[step] || createBusinessMemberOpportunitySchema;
  // const methods = useForm({
  //   resolver: zodResolver(currentSchema), // Apply the schema for the current step
  //   defaultValues: {
  //     BusinessName: "",
  //     YearsInBusiness: "",
  //     BusinessType: "",
  //     BusinessLocation: "",
  //     BusinessIndustry: "",
  //     BusinessWebsite: "",
  //     BusinessDescription: "",
  //     ContactName: "",
  //     ContactEmail: "",
  //     ContactPhone: "",
  //     RoleSought: "",
  //     RoleDescription: "",
  //     PostDuration: "",
  //     InvestmentRequired: "",
  //     PreferredExperience: "",
  //     MatchType: "",
  //     PostTitle: "",
  //     DurationDescription: "",
  //     PreferredExperienceDescription: "",
  //     Tags: "",
  //   },
  // });

  const methods = useForm<CreateBusinessMemberOpportunityData>({
    resolver: zodResolver(createBusinessMemberOpportunitySchema),
    mode: "onChange", // Validate on blur
    defaultValues: {
      MatchType: 2,
      BusinessName: "",
      // YearsInBusiness: "",
      BusinessType: "",
      BusinessLocation: null,
      BusinessIndustry: "",
      BusinessWebsite: "",
      BusinessDescription: "",
      ContactName: "",
      ContactEmail: "",
      ContactPhone: "",
      RoleSought: "",
      RoleDescription: "",
      PostDuration: "3",
      InvestmentRequired: true,
      PreferredExperience: "",
      // MatchType: "",
      PostTitle: "",
      DurationDescription: "",
      PreferredExperienceDescription: "",
      // Tags: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("data ", data);
      const userData = JSON.parse(localStorage.getItem('userData'));
      // const userId = "00b38024-eafa-4e61-a5b5-4554e32c67e2"
      let matchData;
      if (userData) {
        matchData = {
          UserId: userData.Id,
          BusinessName: data.BusinessName,
          YearsInBusiness: data.YearsInBusiness,
          BusinessType: data.BusinessType,
          BusinessLocation: data.BusinessLocation,
          BusinessIndustry: data.BusinessIndustry,
          BusinessWebsite: data.BusinessWebsite,
          BusinessDescription: data.BusinessDescription,
          ContactName: data.ContactName,
          ContactEmail: data.ContactEmail,
          ContactPhone: data.ContactPhone,
          RoleSought: data.RoleSought,
          RoleDescription: data.RoleDescription,
          PostDuration: data.PostDuration,
          InvestmentRequired: data.InvestmentRequired ? data.InvestmentRequired : false,
          PreferredExperience: data.PreferredExperience,
          MatchType: data.MatchType,
          PostTitle: data.PostTitle,
          DurationDescription: data.DurationDescription,
          PreferredExperienceDescription: data.PreferredExperienceDescription,
          Tags: data.Tags,
        };
        console.log(data, matchData);
        const response = await axios.post(
          `${apiEndpoint}/BusinessMember/CreateBusinessMemberOpportunity`,
          matchData,
          {
            headers: {
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        );
        // const result: any = await createBusinessMemberOpportunityAction(
        //   matchData
        // );

        // console.log("result ", result);


        if (response.status == 200) {
          // dispatch(updateCurrentUser(response.data?.Result));
          toast.success("Business Member Saved!");
          setTimeout(() => {
            router.push('/cofounder-and-board-matcher');
          }, 200);
        }
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      toast.error(error?.response?.data?.Message || 'Something went wrong')
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="w-full md:hidden">
            <div className="relative flex items-center justify-between px-4 py-6 w-100 md:hidden">
              <p className="mx-auto font-semibold text-blue-600 text-h7 2xl:text-scaled-h7">
                {steps[step - 1]?.name || 'Co-Founder & Board  Matcher'}
              </p>
              <Close className="absolute -translate-y-1/2 right-2 top-1/2" />
            </div>
            <div
              className={`relative z-10 h-1 overflow-hidden rounded-md bg-omblue-100 w-full`}
            >
              <div
                className={`absolute inset-0 z-10 h-1 bg-omblue-600 transition-all duration-300 ease-in-out`}
                style={{ width: `${width}%` }}
              ></div>
            </div>
          </div>
          {step === 0 ? (
            <StepZero step={step} setStep={setStep} />
          ) : (
            <CofounderMatchSteps steps={steps} step={step} setStep={setStep} />
          )}

        </form >
      </FormProvider >
    </>
  );
};

export default CreateNewBusiness;
