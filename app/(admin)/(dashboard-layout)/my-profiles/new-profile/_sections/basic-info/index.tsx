import React, { Dispatch, SetStateAction, useState } from 'react';
import UserDetails from './user-details';
import SocialLinks from './social-links';
import AboutCompany from './about-company';
import { FormProvider, useForm } from 'react-hook-form';
import { ProfileBasicFormData, profileBasicInfoSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { addBasicDetailsAction } from '@/server-actions/createProfile';
import { toast } from 'react-toastify';
import { updateCurrentUser } from '@/data/slices/user-slice';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const BasicInformation: React.FC<IProps> = ({ step, setStep }) => {
  const [basicInfoStep, setBasicInfoStep] = useState(0);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const methods = useForm<ProfileBasicFormData>({
    resolver: zodResolver(profileBasicInfoSchema),
    mode: 'all',
  });

  const onSubmit = async (data: ProfileBasicFormData) => {
    console.log('Hi there');
    try {
      if (currentUser) {
        const socialMediaLinks = [
          { LinkType: 'Youtube', Url: data.Youtubeurl },
          { LinkType: 'Facebook', Url: data.Facebookurl },
          { LinkType: 'Linkedin', Url: data.Linkedinurl },
          { LinkType: 'Twitter', Url: data.Twitterurl },
          { LinkType: 'Instagram', Url: data.Instagramurl },
        ];

        const basicProfileData = {
          UserId: currentUser.UserId,
          UserProfileTypeId: currentUser.UserProfileTypeId,
          CompanyName: data.CompanyName,
          ProfilePicture: data.profilePic,
          Tagline: data.Tagline,
          CountryOfOrigin: data.CountryOfOrigin,
          CustomProfileUrl: data.CustomProfileUrl,
          AboutCompany: data.AboutCompany,
          SocialMediaLinks: socialMediaLinks,
          Tags: data.Tags,
          CompanyDetails: data.CompanyDetails,
        };

        const result: any = await addBasicDetailsAction(basicProfileData);

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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {basicInfoStep === 0 ? (
          <UserDetails
            basicInfoStep={basicInfoStep}
            setBasicInfoStep={setBasicInfoStep}
          />
        ) : null}
        {basicInfoStep === 1 ? (
          <SocialLinks
            basicInfoStep={basicInfoStep}
            setBasicInfoStep={setBasicInfoStep}
          />
        ) : null}
        {basicInfoStep === 2 ? (
          <AboutCompany
            basicInfoStep={basicInfoStep}
            setBasicInfoStep={setBasicInfoStep}
          />
        ) : null}
      </form>
    </FormProvider>
  );
};

export default BasicInformation;
