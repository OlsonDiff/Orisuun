import Button from '@/components/ui/button';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  addVerificationDocuments,
  generateUploadFileSasTokenData,
} from '@/server-actions/verification';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { RootState } from '@/data/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Dropzone from '@/components/ui/dropzone';

interface IProps {
  identificationStep: number;
  setIdentificationStep: Dispatch<SetStateAction<number>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Personal: React.FC<IProps> = ({
  identificationStep,
  setIdentificationStep,
  step,
  setStep,
}) => {
  const [sasToken, setSasToken] = useState('');

  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleFileUpload = async (files: File[]) => {
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
      await axios.put(blobUrl, file, config);
      console.log('File uploaded successfully');

      // Prepare the request data to add verification documents
      const requestData = {
        UserId: currentUser.UserId,
        UserVerificationId: currentUser.UserVerificationId,
        DocumentType: 'PhotoIdentification',
        DocumentListsModel: [
          {
            DocumentOriginalName: file.name,
            DocumentName: randomName,
          },
        ],
      };

      // addVerificationDocuments
      const result: any = await addVerificationDocuments(requestData);

      if (result.success) {
        const responseData = result.data.Result;

        toast.success(result.message);
      }
    } catch (error) {
      console.error(
        'Error uploading file or adding verification document:',
        error
      );
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

  return (
    <div className="grid grid-cols-8 gap-5 p-4 md:p-6 lg:min-h-[90vh]">
      <div className="my-4 col-span-8 lg:col-span-4 md:mx-4 md:my-11">
        <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
          Personal Identification
        </h1>
        <p className="mb-6 font-medium text-blue-400 text-h7 2xl:text-scaled-h7">
          (for each owner, if verification is for a business)
        </p>
        <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
          Please upload your documents
        </p>
      </div>
      <div className="flex flex-col my-4 col-span-8 lg:col-span-4 lg:col-start-5 md:mx-4 md:my-11">
        <div className="flex-grow">
          <div className="flex flex-col w-full py-6 rounded-lg gap-4 lg:px-6">
            <div className="flex flex-col">
              <h5 className="mb-4 font-semibold text-blue-500 text-h5 2xl:text-scaled-h5">
                Photo Identification
              </h5>
              <Dropzone onFilesUpload={handleFileUpload} />
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse mt-auto md:mx-4 md:ml-auto md:flex-row">
          <Button
            className={
              'text-h9 2xl:text-scaled-h9 text-omblue-500 bg-transparent font-semibold px-4 py-3 me-2 mb-2'
            }
            title="Back"
            onClick={() => setStep(step - 1)}
          />
          <Button
            className="min-w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 md:min-w-[170px] w-full"
            title="Continue"
            onClick={() => setIdentificationStep(identificationStep + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Personal;
