import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import React, { Dispatch, SetStateAction } from 'react';
import { RootState } from '@/data/store';
import { addVerificationDetails } from '@/server-actions/verification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  PersonalIdentificationData,
  personalIdentificationPresenceSchema,
} from '@/utils/schema';
interface IProps {
  identificationStep: number;
  setIdentificationStep: Dispatch<SetStateAction<number>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const PersonalURLs: React.FC<IProps> = ({
  identificationStep,
  setIdentificationStep,
  step,
  setStep,
}) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalIdentificationData>({
    resolver: zodResolver(personalIdentificationPresenceSchema),
  });

  const onSubmit = async (data: PersonalIdentificationData) => {
    try {
      if (currentUser.UserId) {
        console.log(data, 'Business Info data)');

        const personalIdentificationData = {
          Id: 1,
          UserId: currentUser.UserId,
          PersionalIdentificationURL: data.PersionalIdentificationURL,
        };

        const result: any = await addVerificationDetails(
          personalIdentificationData
        );

        console.log(result, 'result');
        if (result.success) {
          const responseData = result.data.Result;

          toast.success(result.message);
          setStep(step + 1);
        }
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      //   // Handle any unexpected errors
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-8 gap-5 p-4 md:p-6 lg:min-h-[90vh]">
        <div className="my-4 col-span-8 lg:col-span-4 md:mx-4 md:my-11">
          <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
            Personal Identification
          </h1>
          <p className="mb-6 font-medium text-blue-400 text-h7 2xl:text-scaled-h7">
            (for each owner, if verification is for a business)
          </p>
          <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
            Please share your Personal Identification Url
          </p>
        </div>
        <div className="flex flex-col my-4 col-span-8 lg:col-span-4 lg:col-start-5 md:mx-4 md:my-11">
          <div className="flex-grow">
            <div className="flex flex-col w-full py-6 rounded-lg gap-4 lg:px-6">
              <div className="flex flex-col">
                <h5 className="mb-4 font-semibold text-blue-500 text-h5 2xl:text-scaled-h5">
                  LinkedIn
                </h5>
                <Input
                  {...register('PersionalIdentificationURL')}
                  error={errors.PersionalIdentificationURL?.message}
                  placeholder="https://linkedin.com/pagename"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse mt-auto md:mx-4 md:ml-auto md:flex-row">
            <Button
              className={
                'text-h9 2xl:text-scaled-h9 text-omblue-500 bg-transparent font-semibold px-4 py-3 me-2 mb-2'
              }
              title="Back"
              onClick={() => setIdentificationStep(identificationStep - 1)}
            />
            <Button
              className="min-w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 md:min-w-[170px] w-full"
              type="submit"
              title="Continue"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalURLs;
