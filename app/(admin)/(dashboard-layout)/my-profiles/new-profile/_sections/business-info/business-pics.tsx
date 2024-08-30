import FormLayout from '@/components/form-layout';
import Dropzone from '@/components/ui/dropzone';
import Input from '@/components/ui/input';
import { useFileUploadHandler } from '@/hooks/fileUploadHandler';
import { ProfileBusinessFormData } from '@/utils/schema';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IProps {
  businessInfoStep: number;
  setBusinessInfoStep: Dispatch<SetStateAction<number>>;
}

const BusinessPics: React.FC<IProps> = ({
  businessInfoStep,
  setBusinessInfoStep,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<ProfileBusinessFormData>();

  const { handleFileUpload } = useFileUploadHandler({
    onUploadSuccess: (fileName) => {
      if (watch('images')?.length > 0) {
        setValue('images', [...watch('images'), fileName]);
      } else {
        setValue('images', [fileName]);
      }
      toast(`${fileName} Uploaded`, {
        type: 'success',
        toastId: fileName,
        autoClose: 2000,
      });
    },
    onUploadError: (error) => {
      console.error(`Upload failed:`, error);
      toast('Images Upload Failed', {
        type: 'error',
        toastId: 'image-upload-error',
        autoClose: 2000,
      });
    },
  });

  return (
    <FormLayout
      title="Profile photos and videos"
      description="Please upload any relevant photos (maximum of 12 photos)"
      position="start"
      variant="equal"
      nextButtonType="submit"
      showBack={true}
      disableNext={isLoading}
      handleBack={() => setBusinessInfoStep(businessInfoStep - 1)}
    >
      <div className="flex flex-col w-full mb-10 rounded-lg gap-6 md:py-6 lg:px-6">
        <div className="space-y-3">
          <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
            Photos
          </label>
          <Dropzone
            acceptedFileTypes="image"
            maxSize={5 * 1024 * 1024}
            layout="normal"
            multiple
            onFilesUpload={async (files: File[]) => {
              if (files?.length <= 12) {
                setIsLoading(true);
                try {
                  const uploadPromises = files.map((file) =>
                    handleFileUpload([file])
                  );
                  await Promise.all(uploadPromises);
                } catch (error) {
                  console.error('Error uploading files:', error);
                } finally {
                  setIsLoading(false);
                }
              } else {
                toast('No more than 12 images are allowed', {
                  type: 'error',
                  toastId: 'image-upload-error',
                  autoClose: 2000,
                });
                setIsLoading(false);
              }
            }}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="video"
            className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
          >
            Video
          </label>
          <Input
            id="video"
            placeholder="Enter youtube link"
            error={errors.videoLink?.message}
            {...register('videoLink')}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default BusinessPics;
