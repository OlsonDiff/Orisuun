"use client"
import React, { useEffect, useState } from 'react';
import Close from '@/icons/close';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateBusinessMemberOpportunityData,
  createBusinessMemberOpportunitySchema,
} from '@/utils/schema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import StepZero from './step-zero';
import CofounderMatchSteps from './cofounder-match-steps';

const steps = [
  { name: 'Co-Founder & Board  Matcher', id: 0 },
  { name: 'Business Info', id: 1 },
  { name: 'Contact', id: 2 },
  { name: 'Role', id: 3 },
  { name: 'Post Duration', id: 4 },
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
  const { id } = useParams();
  const [cofounderData, setCofounderData] = useState(null);

  useEffect(() => {
    setWidth(Math.round(((step / steps.length) * 100 * 100) / 100));
  }, [step]);

  const methods = useForm<CreateBusinessMemberOpportunityData>({
    resolver: zodResolver(createBusinessMemberOpportunitySchema),
    mode: 'onBlur', // Validate on blur
    defaultValues: {
      MatchType: 0,
      BusinessName: '',
      // YearsInBusiness: "",
      BusinessType: '',
      BusinessLocation: null,
      BusinessIndustry: '',
      BusinessWebsite: '',
      BusinessDescription: '',
      ContactName: '',
      ContactEmail: '',
      ContactPhone: '',
      RoleSought: '',
      RoleDescription: '',
      PostDuration: '3',
      PreferredExperience: '',
      PostTitle: '',
      DurationDescription: '',
      PreferredExperienceDescription: '',
      InvestmentRequired: true
    },
  });

  const { reset } = methods;

  useEffect(() => {
    (async () => {
      const getUserData = JSON.parse(localStorage.getItem('userData'));
      const getBussinessData = await axios.get(
        `${apiEndpoint}/BusinessMember/GetBusinessMemberDetailsByOpportunityId?Id=${id}&UserId=${getUserData?.Id}`,
        {
          headers: {
            XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      );
      if (getBussinessData.status === 200) {
        const fetchedData = getBussinessData.data?.Result;
        setCofounderData(fetchedData);

        // Reset the form with fetched data
        reset({
          MatchType: fetchedData.MatchType || 0,
          BusinessName: fetchedData.BusinessName || '',
          YearsInBusiness: fetchedData.YearsInBusiness || null,
          BusinessType: fetchedData.BusinessType || '',
          BusinessLocation: fetchedData.BusinessLocation || null,
          BusinessIndustry: fetchedData.BusinessIndustry || '',
          BusinessWebsite: fetchedData.BusinessWebsite || '',
          BusinessDescription: fetchedData.BusinessDescription || '',
          ContactName: fetchedData.ContactName || '',
          ContactEmail: fetchedData.ContactEmail || '',
          ContactPhone: fetchedData.ContactPhone || '',
          RoleSought: fetchedData.RoleSought || '',
          RoleDescription: fetchedData.RoleDescription || '',
          PostDuration: fetchedData.PostDuration || '3',
          PreferredExperience: fetchedData.PreferredExperience || '',
          PostTitle: fetchedData.PostTitle || '',
          DurationDescription: fetchedData.DurationDescription || '',
          PreferredExperienceDescription: fetchedData.PreferredExperienceDescription || '',
          InvestmentRequired: fetchedData.InvestmentRequired,
        });
      }
    })();
  }, [id, reset]);

  const onSubmit = async (data: CreateBusinessMemberOpportunityData) => {
    try {
      console.log('data ', data, cofounderData);
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        const matchData = {
          ...data,
          UserId: cofounderData?.UserId,
          Id: Number(id)
        };
        console.log(data, matchData);
        const response = await axios.put(
          `${apiEndpoint}/BusinessMember/UpdateBusinessMemberOpportunity`,
          matchData,
          {
            headers: {
              XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        );

        if (response.status === 200) {
          toast.success('Update Business Member!');
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
      </form>
    </FormProvider>
  );
};

export default CreateNewBusiness;
