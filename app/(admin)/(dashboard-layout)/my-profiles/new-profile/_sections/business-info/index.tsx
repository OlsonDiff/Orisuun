import React, { Dispatch, SetStateAction, useState } from 'react';
import Location from './location';
import BusinessPics from './business-pics';
import BusinessExtraDetails from './business-extra-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import {
  ProfileBusinessFormData,
  profileBusinessInfoSchema,
} from '@/utils/schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { addBusinessDetailsAction } from '@/server-actions/createProfile';
import { updateCurrentUser } from '@/data/slices/user-slice';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const BusinessInformation: React.FC<IProps> = ({ step, setStep }) => {
  const [businessInfoStep, setBusinessInfoStep] = useState(0);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const methods = useForm<ProfileBusinessFormData>({
    resolver: zodResolver(profileBusinessInfoSchema),
  });

  const onSubmit = async (data: ProfileBusinessFormData) => {
    try {
      const businessProfileData = {
        UserId: currentUser.UserId,
        UserBusinessBasicDetailId: currentUser.BusinessBasicProfileData.Id,
        UserProfileTypeId: currentUser.UserProfileTypeId,
        AddressLine1: data.AddressLine1,
        AddressLine2: data.AddressLine2,
        Country: data.Country,
        State: data.State,
        City: data.City,
        LocationCode: data.Code,
        WebsiteURL: data.Website,
        NumberOfEmployees: data.noOfEmployees,
        EmailForQueries: data.emailQueries,
        EmailForBusinessDevelopment: data.emailBusinessDevelopment,
        BlackOwnershipPercentage: data.blackOwnershipPercentage,
        Language: data.languages,
        PhoneNumber: data.phoneNo,
        Hours: data.hours,
        VideoLink: data.videoLink,
        BusinessType: data.businessType,
        BusinessSince: data.inBusinessSince,
        IsPrivate: data.isPrivate,
        // BusinessId: 0,
      };

      const result: any = await addBusinessDetailsAction(businessProfileData);

      if (result.success) {
        dispatch(updateCurrentUser(result.data));
        toast.success(result.message);
        setTimeout(() => {
          setStep(step + 1);
        }, 200);
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {businessInfoStep === 0 ? (
          <Location
            businessInfoStep={businessInfoStep}
            setBusinessInfoStep={setBusinessInfoStep}
          />
        ) : null}
        {businessInfoStep === 1 ? (
          <BusinessExtraDetails
            businessInfoStep={businessInfoStep}
            setBusinessInfoStep={setBusinessInfoStep}
          />
        ) : null}
        {businessInfoStep === 2 ? (
          <BusinessPics
            businessInfoStep={businessInfoStep}
            setBusinessInfoStep={setBusinessInfoStep}
          />
        ) : null}
      </form>
    </FormProvider>
  );
};

export default BusinessInformation;
