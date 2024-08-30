import Button from '@/components/ui/button';
import Radio from '@/components/ui/radio';
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
const data = [
  {
    title: 'Current stock/share transfer ledger',
    index: 0,
    name: 'ShareTransferLedger',
  },
  {
    title:
      'Latest tax return ownership schedule (eg, 1065 K-1, 1120 G, 1065 C, 1040 C)',
    index: 1,
    name: 'LatestTaxReturn',
  },
  {
    title: 'Photos of awards, certificates, etc.',
    index: 2,
    name: 'Award/Certificate',
  },
  {
    title: 'Copies of certifications',
    index: 3,
    name: 'Certification',
  },
  {
    title: 'Copies of letters expressing terms of affiliation',
    index: 4,
    name: 'AffiliationLetter',
  },
];

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const OwnershipProof: React.FC<IProps> = ({ step, setStep }) => {
  const [selected, setSelected] = useState(0);
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
        DocumentType: data[selected].name,
        DocumentListsModel: [
          {
            DocumentOriginalName: file.name,
            DocumentName: randomName,
          },
        ],
      };

      // addVerificationDocuments
      const result: any = await addVerificationDocuments(requestData);

      console.log(result, 'result');
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
    <div className="grid grid-cols-8 gap-5 md:p-6 p-4 lg:min-h-[90vh]">
      <div className="col-span-8 my-4 lg:col-span-4 md:mx-4 md:my-11">
        <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
          Proof of ownership
        </h1>
        <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
          Please upload your documents
        </p>
      </div>
      <div className="flex flex-col col-span-8 my-4 lg:col-span-4 lg:col-start-5 md:mx-4 md:my-11">
        <div className="flex-grow">
          <div className="flex flex-col w-full gap-4 py-6 rounded-lg lg:px-6">
            <div className="flex flex-col">
              <h5 className="mb-4 font-semibold text-blue-500 text-h7 2xl:text-scaled-h7 md:h5">
                {data[selected].title}
              </h5>
              <Dropzone onFilesUpload={handleFileUpload} />
            </div>
            <Radio id="" label="Not applicable" />
          </div>
        </div>
        <div className="flex flex-col-reverse mt-auto md:mx-4 md:ml-auto md:flex-row">
          <Button
            className={
              'text-h9 2xl:text-scaled-h9 text-omblue-500 bg-transparent font-semibold px-4 py-3 me-2 mb-2'
            }
            title="Back"
            onClick={() =>
              selected > 0 ? setSelected(selected - 1) : setStep(step - 1)
            }
          />
          <Button
            className="min-w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 md:min-w-[170px] w-full"
            title="Continue"
            onClick={() =>
              selected < data.length - 1
                ? setSelected(selected + 1)
                : setStep(step + 1)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OwnershipProof;
