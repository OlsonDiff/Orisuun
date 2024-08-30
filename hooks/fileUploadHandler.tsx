import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { generateUploadFileSasTokenData } from '@/server-actions/verification';

interface FileUploadHandlerProps {
  onUploadSuccess: (fileName: string) => void;
  onUploadError: (error: Error) => void;
}

export const useFileUploadHandler = ({
  onUploadSuccess,
  onUploadError,
}: FileUploadHandlerProps) => {
  const [sasToken, setSasToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateSasToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const tokenResponse = await generateUploadFileSasTokenData();
      setSasToken(tokenResponse.token);
    } catch (error) {
      console.error('Error generating SAS token:', error);
      onUploadError(new Error('Failed to generate SAS token'));
    } finally {
      setIsLoading(false);
    }
  }, [onUploadError]);

  const handleFileUpload = async (files: File[]) => {
    if (!files[0]) {
      onUploadError(new Error('No file selected'));
      return;
    }

    if (!sasToken) {
      await generateSasToken();
    }

    if (!sasToken) {
      onUploadError(new Error('Failed to generate SAS token'));
      return;
    }

    const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL ?? '';
    const file = files[0];
    const fileExtension = file.name.split('.').pop();
    const randomName = `${uuidv4()}.${fileExtension}`;
    const blobUrl = `${MEDIA_URL}/user-profile/${randomName}?${sasToken}`;

    const config = {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type,
      },
    };

    try {
      setIsLoading(true);
      await axios.put(blobUrl, file, config);
      onUploadSuccess(randomName);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      onUploadError(new Error('Failed to upload file'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sasToken == null) {
      generateSasToken();
    }
  }, [generateSasToken, sasToken]);

  return { handleFileUpload, isLoading, generateSasToken };
};
