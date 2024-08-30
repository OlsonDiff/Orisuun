import FormLayout from '@/components/form-layout';
import Dropzone from '@/components/ui/dropzone';
import Input from '@/components/ui/input';
import Note from '@/components/ui/note';
import CustomSelect from '@/components/ui/select';
import { useFileUploadHandler } from '@/hooks/fileUploadHandler';
import {
  ethnicityOptions,
  nationalityOptions,
  raceOptions,
} from '@/utils/constants';
import { ProfileExpertBasicFormData } from '@/utils/schema';
import React, { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IProps {
  basicExpertStep: number;
  setBasicExpertStep: Dispatch<SetStateAction<number>>;
}

const BasicDetailsExperts: React.FC<IProps> = ({
  basicExpertStep,
  setBasicExpertStep,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useFormContext<ProfileExpertBasicFormData>();

  const { handleFileUpload, isLoading } = useFileUploadHandler({
    onUploadSuccess: (fileName) => {
      setValue('profilePic', fileName);
    },
    onUploadError: (error) => {
      setValue('profilePic', null);
      console.error('Upload failed:', error);
    },
  });

  const handleContinue = async () => {
    try {
      const profilePic = await trigger('profilePic');
      const Name = await trigger('Name');
      const Nationality = await trigger('Nationality');
      const Ethinicity = await trigger('Ethinicity');
      const Race = await trigger('Race');
      const WorkTitle = await trigger('WorkTitle');
      // if (!profilePic) {
      //   toast.error('Profile Picture is required');
      //   return;
      // }
      if (
        Name &&
        Nationality &&
        // profilePic &&
        Ethinicity &&
        Race &&
        WorkTitle
      ) {
        setBasicExpertStep(basicExpertStep + 1);
      } else {
        console.log(Object.keys(errors).length, errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormLayout
      title="Basic Information"
      description="Please provide your company’s information"
      position="start"
      handleNext={handleContinue}
      variant="equal"
    >
      <div className="flex flex-col w-full mb-10 rounded-lg gap-6 md:py-6 lg:px-6">
        <div className="space-y-3">
          <label
            htmlFor="profile-pic"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Profile Picture
          </label>
          <Dropzone
            acceptedFileTypes="image"
            maxSize={5 * 1024 * 1024}
            layout="circular"
            onFilesUpload={handleFileUpload}
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="name"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Name <span className="text-danger-500">*</span>
          </label>
          <Input
            id="name"
            placeholder="Name"
            error={errors.Name?.message}
            {...register('Name')}
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="work_title"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Work Title <span className="text-danger-500">*</span>
          </label>
          <Input
            id="work_title"
            placeholder="Work Title"
            error={errors.WorkTitle?.message}
            {...register('WorkTitle')}
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="race"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Race <span className="text-danger-500">*</span>
          </label>
          <CustomSelect
            placeholder={'Race'}
            options={raceOptions}
            onChange={async (val) => {
              setValue('Race', val.value);
              await trigger('Race');
            }}
            error={errors.Race?.message}
            value={raceOptions.find((option) => option.value === watch('Race'))}
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="nationality"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Nationality <span className="text-danger-500">*</span>
          </label>
          <CustomSelect
            placeholder={'Nationality'}
            options={nationalityOptions}
            onChange={async (val) => {
              setValue('Nationality', val.value);
              await trigger('Nationality');
            }}
            error={errors.Nationality?.message}
            value={nationalityOptions.find(
              (option) => option.value === watch('Nationality')
            )}
          />
        </div>
        <div className="space-y-3 mb-2">
          <label
            htmlFor="ethnicity"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Ethnicity <span className="text-danger-500">*</span>
          </label>
          <CustomSelect
            placeholder={'Ethnicity'}
            options={ethnicityOptions}
            onChange={async (val) => {
              setValue('Ethinicity', val.value);
              await trigger('Ethinicity');
            }}
            error={errors.Ethinicity?.message}
            value={ethnicityOptions.find(
              (option) => option.value === watch('Ethinicity')
            )}
          />
        </div>
        <Note
          status="info"
          text="Race and Ethnicity selections are kept private and used for internal purposes only"
        />
      </div>
    </FormLayout>
  );
};

export default BasicDetailsExperts;
