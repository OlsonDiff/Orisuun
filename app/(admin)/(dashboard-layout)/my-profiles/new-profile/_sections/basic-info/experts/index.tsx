'use client';

import { updateCurrentUser } from '@/data/slices/user-slice';
import { RootState } from '@/data/store';
import { addIndividualBasicDetailsAction } from '@/server-actions/createProfile';
import {
  ProfileExpertBasicFormData,
  profileExpertBasicInfoSchema,
} from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BasicDetailsExperts from './user-details-experts';
import UserDetailsExpertsAdditional from './user-details-experts-additional';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const UserDetailsExperts: React.FC<IProps> = ({ step, setStep }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const [basicExpertStep, setBasicExpertStep] = useState(0);

  const methods = useForm<ProfileExpertBasicFormData>({
    resolver: zodResolver(profileExpertBasicInfoSchema),
    defaultValues: {
      AdditionalAboutYouDetails: [''],
      Tags: [''],
    },
  });

  const onSubmit = async (data: ProfileExpertBasicFormData) => {
    try {
      if (currentUser) {
        const requestData = {
          UserId: currentUser.UserId,
          UserProfileType: currentUser.UserProfileType,
          Name: data.Name,
          WorkTitle: data.WorkTitle,
          Race: data.Race,
          Nationality: data.Nationality,
          Ethnicity: data.Ethinicity,
          ProfilePicture: data.profilePic,
          VideoLink: data.VideoLink,
          AboutYou: data.AboutYou,
          AdditionalAboutYouDetails: data.AdditionalAboutYouDetails,
          Tags: data.Tags,
        };

        const result: any = await addIndividualBasicDetailsAction(requestData);

        if (result.success) {
          dispatch(updateCurrentUser(result.data));
          toast.success(result.message);
          setTimeout(() => {
            setStep(step + 1);
          }, 200);
        }
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        {basicExpertStep === 0 && (
          <BasicDetailsExperts
            basicExpertStep={basicExpertStep}
            setBasicExpertStep={setBasicExpertStep}
          />
        )}
        {basicExpertStep === 1 && (
          <UserDetailsExpertsAdditional
            basicExpertStep={basicExpertStep}
            setBasicExpertStep={setBasicExpertStep}
          />
        )}
      </FormProvider>
    </form>
  );
};

export default UserDetailsExperts;
