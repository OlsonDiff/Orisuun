import FormLayout from '@/components/form-layout';
import Dropzone from '@/components/ui/dropzone';
import Input from '@/components/ui/input';
import { useFileUploadHandler } from '@/hooks/fileUploadHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const schema = z.object({
  images: z
    .array(z.string())
    .max(12, 'No more than 12 images are allowed')
    .optional()
    .nullable(),
  videoLink: z.string().optional().nullable(),
});

type FormData = z.infer<typeof schema>;

const AdvocatePhotos: React.FC<IProps> = ({ step, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { handleFileUpload } = useFileUploadHandler({
    onUploadSuccess: (fileName) => {
      if (watch('images')?.length > 0) {
        setValue('images', [...watch('images'), fileName]);
      } else {
        setValue('images', [fileName]);
      }
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

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout
        title="Advocate Information"
        description="Please upload any relevant photos (maximum of 12 photos)"
        position="start"
        nextButtonType="submit"
        disableNext={isLoading}
      >
        <div className="flex flex-col w-full mb-10 rounded-lg gap-6 md:py-6 lg:px-6">
          <div className="space-y-3">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Pictures
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
              {...register('videoLink')}
              error={errors.videoLink && errors.videoLink?.message}
            />
          </div>
        </div>

        {/* <div className="flex flex-col-reverse md:mx-4 md:mt-auto md:ml-auto md:flex-row">
        <Button
          className={
            'text-h9 2xl:text-scaled-h9 text-omblue-500 bg-transparent font-semibold px-4 py-3 me-2 mb-2'
          }
          title="Back"
          // onClick={() => setBusinessInfoStep(businessInfoStep - 1)}
        />
        <Button
          className="min-w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 w-full md:min-w-[170px]"
          title="Continue"
          type="submit"
        />
      </div> */}
      </FormLayout>
    </form>
  );
};

export default AdvocatePhotos;
