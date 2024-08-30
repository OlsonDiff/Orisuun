import Input from '@/components/ui/input';
import Add from '@/icons/add';
import Bin from '@/icons/upload-icons/bin';
import {
  ProfileQualificationsInfoSchema,
  profileQualificationsInfoSchema,
} from '@/utils/schema';
import React, { Dispatch, SetStateAction } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { addQualificationsDetailsAction } from '@/server-actions/createProfile';
import FormLayout from '@/components/form-layout';
import { updateCurrentUser } from '@/data/slices/user-slice';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Qualifications: React.FC<IProps> = ({ step, setStep }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileQualificationsInfoSchema>({
    resolver: zodResolver(profileQualificationsInfoSchema),
    defaultValues: {
      affiliations: [{ name: '' }],
      certifications: [{ name: '', year: '' }],
      recognitions: [{ name: '' }],
    },
  });

  const {
    fields: affiliationFields,
    append: appendAffiliation,
    remove: removeAffiliation,
  } = useFieldArray({
    control,
    name: 'affiliations',
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: 'certifications',
  });

  const {
    fields: recognitionFields,
    append: appendRecognition,
    remove: removeRecognition,
  } = useFieldArray({
    control,
    name: 'recognitions',
  });

  const onSubmit = async (data: ProfileQualificationsInfoSchema) => {
    try {
      if (currentUser) {
        const businessProfileData = {
          UserId: currentUser.UserId,
          UserBasicProfileDetailsId:
            currentUser?.ProfileId || currentUser.BusinessBasicProfileData.Id,
          Affiliations:
            data.affiliations?.map((affiliation) => ({
              AffiliationName: affiliation.name,
            })) ?? [],
          Certifications:
            data.certifications?.map((certification) => ({
              CertificateName: certification.name,
              Year: certification.year,
            })) ?? [],
          Recognitions:
            data.recognitions?.map((recognition) => ({
              RecognitionName: recognition.name,
            })) ?? [],
        };

        const result: any = await addQualificationsDetailsAction(
          businessProfileData
        );

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout
        title="Qualifications"
        description="Please provide business details"
        position="start"
        handleBack={() => setStep(step - 1)}
        showBack={true}
        nextButtonType="submit"
      >
        <div className="flex flex-col w-full mb-10 rounded-lg gap-6 md:py-6 lg:px-6">
          <div className="space-y-3">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Affiliations
            </label>
            {affiliationFields.map((field, index) => (
              <div key={field.id} className="space-y-3">
                <div className="flex items-start gap-2 w-full">
                  <Input
                    placeholder={`Affiliation Name ${index}`}
                    containerClass="flex-1"
                    error={
                      errors.affiliations?.[index]?.name &&
                      errors.affiliations[index]?.name?.message
                    }
                    {...register(`affiliations.${index}.name`)}
                  />
                  <button
                    onClick={() => removeAffiliation(index)}
                    disabled={affiliationFields.length < 2}
                    className="text-danger-500 bg-danger-100 rounded-md p-2 disabled:text-danger-200"
                  >
                    <Bin className="w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendAffiliation({ name: '' })}
              className="flex gap-2 items-center btn-secondary text-h9 2xl:text-scaled-h9 ms-1 px-4 py-3 rounded-md bg-omblue-500 text-white font-semibold disabled:bg-omblue-50 disabled:text-omblue-200"
            >
              <Add />
              Add Affiliations
            </button>
          </div>
          <div className="space-y-3">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Certification <span className="text-danger-500">*</span>
            </label>

            {certificationFields.map((field, index) => (
              <div key={field.id} className="space-y-3">
                <div className="flex items-start gap-2 w-full">
                  <div className="w-full flex items-start gap-2">
                    <Input
                      placeholder={`Certiifation Name ${index}`}
                      containerClass="flex-1"
                      error={
                        errors.certifications?.[index]?.name &&
                        errors.certifications[index]?.name?.message
                      }
                      {...register(`certifications.${index}.name`)}
                    />
                    <Input
                      placeholder="Year"
                      containerClass="w-full md:max-w-[100px] 2xl:max-w-24"
                      error={
                        errors.certifications?.[index]?.year &&
                        errors.certifications[index]?.year?.message
                      }
                      {...register(`certifications.${index}.year`)}
                    />
                  </div>

                  <button
                    onClick={() => removeCertification(index)}
                    disabled={certificationFields.length < 2}
                    className="text-danger-500 bg-danger-100 rounded-md p-2 disabled:text-danger-200"
                  >
                    <Bin className="w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendCertification({ name: '', year: '' })}
              className="flex gap-2 items-center btn-secondary text-h9 2xl:text-scaled-h9 ms-1 px-4 py-3 rounded-md bg-omblue-500 text-white font-semibold disabled:bg-omblue-50 disabled:text-omblue-200"
            >
              <Add />
              Add Certification
            </button>
          </div>
          <div className="space-y-3">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Recognition
              {/* <span className="text-danger-500">*</span> */}
            </label>

            {recognitionFields.map((field, index) => (
              <div key={field.id} className="space-y-3">
                <div className="flex items-start gap-2 w-full">
                  <Input
                    containerClass="flex-1"
                    placeholder={`Recognition Name ${index}`}
                    error={
                      errors.recognitions?.[index]?.name &&
                      errors.recognitions[index]?.name?.message
                    }
                    {...register(`recognitions.${index}.name`)}
                  />
                  <button
                    onClick={() => removeRecognition(index)}
                    disabled={recognitionFields.length < 2}
                    className="text-danger-500 bg-danger-100 rounded-md p-2 disabled:text-danger-200"
                  >
                    <Bin className="w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => appendRecognition({ name: '' })}
              className="flex gap-2 items-center btn-secondary text-h9 2xl:text-scaled-h9 ms-1 px-4 py-3 rounded-md bg-omblue-500 text-white font-semibold disabled:bg-omblue-50 disabled:text-omblue-200"
            >
              <Add />
              Add Recognition
            </button>
          </div>
        </div>
      </FormLayout>
    </form>
  );
};

export default Qualifications;
