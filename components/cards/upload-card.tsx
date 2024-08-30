import Add from '@/icons/add';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface UploadCardProps {
  image?: boolean;
  onFileSelect?: (file: File) => void;
}

const UploadCard: React.FC<UploadCardProps> = ({
  image = false,
  onFileSelect,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div
      className="min-w-[180px] min-h-[115px] bg-omblue-50 relative rounded-md cursor-pointer"
      onClick={handleClick}
    >
      {selectedFile ? (
        <Image
          src="/images/vector/image.svg"
          alt="selected image"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          width={20}
          height={20}
        />
      ) : image ? (
        <Image
          src="/images/vector/image.svg"
          alt="image"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          width={20}
          height={20}
        />
      ) : (
        <Add className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-omblue-500" />
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default UploadCard;
