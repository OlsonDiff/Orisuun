import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { cn } from '@/utils/utils';
import UploadIcon from '@/icons/verification/upload-icon';
import Image from 'next/image';
import UploadedFile from './uploaded-file';
import Bin from '@/icons/upload-icons/bin';
import Add from '@/icons/add';
import EditIcon from '@/icons/edit-icon';

interface DropzoneProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  onFilesUpload?: (files: File[]) => void;
  onFileRemove?: (file: File) => void;
  layout?: 'classic' | 'normal' | 'circular';
  maxSize?: number; // in bytes
  acceptedFileTypes?: 'image' | 'pdf' | 'xlsx';
  multiple?: boolean;
  disabled?: boolean;
  storedFile?: any
}

const Dropzone: React.FC<DropzoneProps> = ({
  className,
  onFilesUpload,
  onFileRemove,
  layout = 'normal',
  maxSize = 10 * 1024 * 1024, // default to 10MB
  acceptedFileTypes = 'pdf',
  multiple = false,
  disabled = false,
  storedFile
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<any>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) => {
        const isValidType =
          acceptedFileTypes === 'image'
            ? file.type.startsWith('image/')
            : acceptedFileTypes === 'pdf'
              ? file.type === 'application/pdf'
              : acceptedFileTypes === 'xlsx'
                ? file.type ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                : false;

        return isValidType && file.size <= maxSize;
      });

      if (validFiles.length > 0) {
        const newFiles = multiple ? [...files, ...validFiles] : [validFiles[0]];
        setFiles(newFiles);

        if (onFilesUpload) {
          onFilesUpload(newFiles);
        }
      }

      if (validFiles.length !== acceptedFiles.length) {
        alert(
          `Some files were rejected. Please upload ${acceptedFileTypes === 'image'
            ? 'JPG or PNG'
            : acceptedFileTypes === 'pdf'
              ? 'PDF'
              : 'XLSX'
          } files no larger than ${maxSize / (1024 * 1024)}MB.`
        );
      }
    },
    [files, onFilesUpload, maxSize, acceptedFileTypes, multiple]
  );

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);

      if (onFileRemove && newFiles.length === 0) {
        onFileRemove(fileToRemove);
      }

      return newFiles;
    });
  };

  useEffect(() => {
    if (storedFile) {
      // const file = new File([], storedFile);
      const newFiles = [storedFile];
      setFiles(newFiles);
    }
  }, [storedFile]);

  console.log("storedFile ", storedFile);


  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept:
      acceptedFileTypes === 'image'
        ? { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }
        : acceptedFileTypes === 'pdf'
          ? { 'application/pdf': ['.pdf'] }
          : acceptedFileTypes === 'xlsx'
            ? {
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
                '.xlsx',
              ],
            }
            : {},
    maxSize,
    multiple,
    disabled,
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(
    dropzoneOptions
  );

  const renderDropzoneContent = () => (
    <div
      className={cn(
        'flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out',
        isDragActive ? 'border-[#9AB2E5] bg-omblue-50' : 'border-omblue-200',
        layout === 'circular'
          ? 'rounded-full w-40 h-40 border'
          : 'px-6 py-4 rounded-lg border-2',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      <input {...getInputProps()} />
      <UploadIcon className="text-omblue-600 w-10 h-10" />
      <div className="flex flex-col items-center">
        <p className="font-semibold text-h9 2xl:text-scaled-h9 text-omblue-700">
          Click to upload {layout !== 'circular' && 'or drag and drop'}
        </p>
        <p className="mt-1 text-xs font-medium text-omblue-600">
          {acceptedFileTypes === 'image'
            ? 'JPG, PNG'
            : acceptedFileTypes === 'pdf'
              ? 'PDF'
              : 'XLSX'}{' '}
          (max. {maxSize / (1024 * 1024)}MB)
        </p>
      </div>
    </div>
  );

  console.log("files ", files);


  const renderFileCards = () => {
    if (acceptedFileTypes === 'pdf' || acceptedFileTypes === 'xlsx') {
      return (
        <div className="mt-10">
          <h5 className="mb-4 font-semibold text-blue-500 text-h5 2xl:text-scaled-h5">
            Uploaded files
          </h5>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <UploadedFile
                key={index}
                file={file}
                handleDelete={() => removeFile(index)}
              />
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-wrap items-center gap-6 mt-8">
        {files.map((file, index) => (
          <div
            key={index}
            className="w-36 h-24 relative bg-white rounded-lg shadow-md mb-2"
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              className={`w-full h-full object-cover rounded ${confirmDelete === index ? 'opacity-50' : ''
                }`}
              width={144}
              height={104}
            />
            {confirmDelete === index && (
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 bg-danger-50 rounded-md p-1.5"
              >
                <Bin />
              </button>
            )}
            <button
              onClick={() => setConfirmDelete(index)}
              className="rotate-45 absolute -top-3 -right-3 border border-omblue-100 text-omblue-500 bg-white rounded-full p-1.5"
            >
              <Add className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="dropzone-container" // Use a custom class for styling
      >
        {renderDropzoneContent()}
      </div>
      {files.length > 0 && renderFileCards()}
    </div>
  );
};

export default Dropzone;
