import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import Button from '@/components/ui/button';
import Dropzone from '@/components/ui/dropzone';
import Input from '@/components/ui/input';
import { companyInformationSchema, CreateCompnayInformationData } from '@/utils/schema';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { generateUploadFileSasTokenData } from '@/server-actions/verification';
import { stepSchemas } from '@/utils/discountSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
// import { values } from 'lodash';


interface IProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const CompanyInformation: React.FC<IProps> = ({ step, setStep }) => {
  const { register, formState: { errors }, setValue, trigger, watch } = useFormContext<CreateCompnayInformationData>();

  const [sasToken, setSasToken] = useState('');
  const [logo, setLogo] = useState();

  const currentSchema = stepSchemas[step] || companyInformationSchema;

  const methods = useForm({
    resolver: zodResolver(currentSchema), // Apply the schema for the current step
    defaultValues: {
      CompanyLogo: null,
      CompanyName: "",
      CompanyWebsite: "",
      CompanySlogan: "",
      CompanyIndustry: "",
      CompanyType: "",
      CompanyDescription: "",
      DiscountDescription: "",
      DiscountActivation: "",
      ActiveDiscount: "",
      ProposalDuration: "",
      // ExpiryDate: "",
      NumberOfDiscount: "",
      DiscountCode: "",
    },
  });

  const handleContinue = async () => {
    const isValid = await trigger(); // Trigger validation for all fields
    const CompanyName = await trigger('CompanyName');
    const CompanyWebsite = await trigger('CompanyWebsite');
    const CompanySlogan = await trigger('CompanySlogan');
    const CompanyIndustry = await trigger('CompanyIndustry');
    const CompanyType = await trigger('CompanyType');
    const CompanyDescription = await trigger('CompanyDescription');
    const CompanyLogo = await trigger('CompanyLogo');
    // const BusinessDescription = await trigger('BusinessDescription');
    console.log('Validation Status:', isValid);
    console.log('Errors:', errors);


    if (CompanyName && CompanyLogo && CompanyWebsite && CompanySlogan && CompanyIndustry && CompanyType && CompanyDescription) {
      setStep(step + 1); // Proceed to the next step if all fields are valid
    } else {
      const allData = methods.getValues();
      console.log('Errors:', errors, allData); // Log errors for debugging
    }
  };

  const handleFileUpload = async (files: File[]) => {
    console.log("files kkkk", files);

    // const handleFileUpload = async (files, sasToken, userId, userVerificationId, documentType) => {
    if (!files[0]) return;

    const file = files[0];
    const fileExtension = file.name.split('.').pop();
    const randomName = `${uuidv4()}.${fileExtension}`;
    const blobUrl = `https://orisuundocumentsdev.blob.core.windows.net/user-profile/${randomName}?${sasToken}`;

    const config = {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type,
      },
    };

    try {
      // Upload the file to Azure Blob Storage
      const res = await axios.put(blobUrl, file, config);
      if (res.status === 201) {
        const url = res?.config?.url;
        console.log('File uploaded successfully', res?.config?.url);
        const fileName = url.split('/').pop().split('?')[0];
        console.log("fileName ", fileName);
        setValue('logo', file);
        setValue('CompanyLogo', fileName);
        trigger('CompanyLogo');
      }


    } catch (error) {
      console.error(
        'Error uploading file or adding verification document:',
        error
      );
      toast.error('Error uploading file in azure Blob Storage');
    }
  };

  const generateUploadFileSasTokenfunc = useCallback(async () => {
    try {
      // setIsLoading(true);
      const tokenResponse = await generateUploadFileSasTokenData();
      setSasToken(tokenResponse.token);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    generateUploadFileSasTokenfunc();
  }, [generateUploadFileSasTokenfunc]);

  console.log("errors ", errors);


  return (
    <div className="grid grid-cols-8 md:gap-5 md:p-6 p-4 lg:min-h-[90vh]">
      <div className="my-4 col-span-8 md:mb-8 lg:col-span-4 md:mx-4 md:my-11">
        <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
          Company Information
        </h1>
        <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
          Please provide your business address (headquarters)
        </p>
      </div>

      <div className="flex flex-col my-4 col-span-8 lg:col-span-4 md:mx-4 md:my-11">
        <div className="flex-grow">
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
                maxSize={10 * 1024 * 1024}
                layout="normal"
                onFilesUpload={(file) => {
                  handleFileUpload(file)
                  // setValue('CompanyLogo', file[0]?.name);
                  // trigger('CompanyLogo');
                  console.log(file[0]?.name, file, typeof file[0], file[0])
                }
                }
                onChange={(file) => {
                  trigger('CompanyLogo');
                }}
                storedFile={watch('logo')} // Pass the stored file name or URL here
                onFileRemove={() => {
                  setValue('CompanyLogo', "");
                  trigger('CompanyLogo');
                }}
              />
              {errors.CompanyLogo?.message && (
                <p className="text-red-500 text-sm">{errors.CompanyLogo?.message}</p>
              )}
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xl 2xl:text-scaled-h8 font-semibold text-black-500">
                  Company Details
                </label>
                <p className="text-base 2xl:text-scaled-h9 font-medium text-[#5B657B]">
                  Please provide the details of your company
                </p>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Company name"
                  {...register('CompanyName', { required: 'Company name is required' })}
                  error={errors.CompanyName?.message}
                />
                <Input
                  placeholder="Company website"
                  {...register('CompanyWebsite', { required: 'Company website is required' })}
                  error={errors.CompanyWebsite?.message}
                />
                <Input
                  placeholder="Company slogan"
                  {...register('CompanySlogan', { required: 'Company slogan is required' })}
                  error={errors.CompanySlogan?.message}
                />
                <Input
                  placeholder="Company industry"
                  {...register('CompanyIndustry')}
                  error={errors.CompanyIndustry?.message}
                />
                <Input
                  placeholder="Company type"
                  {...register('CompanyType')}
                  error={errors.CompanyType?.message}
                />
                <textarea
                  id="about_company"
                  rows={3}
                  placeholder="Company description"
                  className="w-full resize-none border-[0.8px] border-black-200 rounded-md px-4 py-3 text-h9 2xl:text-scaled-h9 text-black-200 font-medium"
                  {...register('CompanyDescription')}
                />
                {errors.CompanyDescription && (
                  <p className="text-red-500 text-sm">{errors.CompanyDescription.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:mx-4 md:mt-auto md:ml-auto md:flex-row">
          <Button
            className="h9 text-omblue-500 bg-transparent font-semibold px-4 py-3 me-2 mb-2"
            title="Cancel"
          // onClick={() => setStep(step - 1)}
          />
          <Button
            className="custom_btn text-omblue-500 bg-[#E9EEF9] min-w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 w-full md:min-w-[170px]"
            title="Continue"
            onClick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
