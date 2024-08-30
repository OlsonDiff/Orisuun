import FormLayout from '@/components/form-layout';
import Dropzone from '@/components/ui/dropzone';
import Input from '@/components/ui/input';
import CustomSelect from '@/components/ui/select';
import { useFileUploadHandler } from '@/hooks/fileUploadHandler';
import { ProfileBasicFormData } from '@/utils/schema';
import { cn } from '@/utils/utils';
import React, { Dispatch, SetStateAction } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

const countryList: Option[] = [
  { label: 'Nigeria', value: 'NG' },
  { label: 'South Africa', value: 'ZA' },
  { label: 'Kenya', value: 'KE' },
  { label: 'Egypt', value: 'EG' },
  { label: 'Ghana', value: 'GH' },
  { label: 'Tanzania', value: 'TZ' },
  { label: 'Uganda', value: 'UG' },
];

interface IProps {
  basicInfoStep: number;
  setBasicInfoStep: Dispatch<SetStateAction<number>>;
}

const UserDetails: React.FC<IProps> = ({ basicInfoStep, setBasicInfoStep }) => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    control,
    watch,
  } = useFormContext<ProfileBasicFormData>();

  const { handleFileUpload, isLoading } = useFileUploadHandler({
    onUploadSuccess: (fileName) => {
      setValue('profilePic', fileName);
      toast('Images Uploaded', {
        type: 'success',
        toastId: fileName,
        autoClose: 2000,
      });
    },
    onUploadError: (error) => {
      console.error('Upload failed:', error);
      toast('Images Upload Failed', {
        type: 'error',
        toastId: 'image-upload-error',
        autoClose: 2000,
      });
    },
  });

  const handleContinue = async () => {
    try {
      const companyNameValid = await trigger('CompanyName');
      const taglineValid = await trigger('Tagline');
      const profilePic = await trigger('profilePic');
      const country = await trigger('CountryOfOrigin');
      const CustomProfileUrl = await trigger('CustomProfileUrl');
      // if (!profilePic) {
      //   toast.error('Profile Picture is required');
      //   return;
      // }
      if (
        companyNameValid &&
        taglineValid &&
        // profilePic &&
        country &&
        CustomProfileUrl
      ) {
        setBasicInfoStep(basicInfoStep + 1);
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
      showBack={true}
      handleNext={handleContinue}
      variant="equal"
      disableNext={isLoading}
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
            onFilesUpload={async (files: File[]) =>
              await handleFileUpload(files)
            }
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="company_name"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Company Name <span className="text-danger-500">*</span>
          </label>

          <Input
            placeholder="Company Name"
            {...register('CompanyName')}
            error={errors.CompanyName?.message}
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="tagline"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Tagline <span className="text-danger-500">*</span>
          </label>

          <Input
            placeholder="Tagline"
            {...register('Tagline')}
            error={errors.Tagline?.message}
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="tagline"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Country of Origin <span className="text-danger-500">*</span>
          </label>

          <CustomSelect
            options={countryList}
            placeholder="Select Country of Origin"
            {...register('CountryOfOrigin')}
            error={errors.CountryOfOrigin?.message}
            onChange={async (val) => {
              setValue('CountryOfOrigin', val.value);
              await trigger('CountryOfOrigin');
            }}
            value={countryList.find(
              (country) => country.value === watch('CountryOfOrigin')
            )}
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="tagline"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Custom URL <span className="text-danger-500">*</span>
          </label>

          <Controller
            name="CustomProfileUrl"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder={'enterURL'}
                className={cn(
                  'border bg-white text-h9 2xl:text-scaled-h9 font-medium py-3 px-4 rounded-md w-full',
                  'focus:outline-none focus:border-omblue-500 focus:bg-[#f3f7f9]',
                  'transition-colors duration-200',
                  errors.CustomProfileUrl
                    ? 'border-red-500'
                    : 'border-black-200'
                )}
                onChange={(e) => {
                  let value = e.target.value;
                  if (!value.startsWith('orisuun.com/')) {
                    value = 'orisuun.com/' + value.replace('orisuun.com', '');
                  }
                  field.onChange(value);
                }}
                value={
                  field.value.startsWith('orisuun.com/')
                    ? field.value
                    : 'orisuun.com/' + field.value
                }
                onFocus={(e) =>
                  e.target.setSelectionRange(
                    e.target.value.length,
                    e.target.value.length
                  )
                }
                readOnly={false}
              />
            )}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default UserDetails;
