import UploadCard from '@/components/cards/upload-card';

const Attachments = ({
  onFileSelect,
  length = 3,
}: {
  onFileSelect?: (file: File) => void;
  length?: number;
}) => (
  <div className="my-5">
    <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
      Attachments:
    </h6>
    <div className="my-5 flex items-center gap-4 md:overflow-x-hidden overflow-x-scroll hide-scrollbar">
      {Array.from({ length: length }).map((_, index) =>
        index > 2 ? (
          <UploadCard key={index} image />
        ) : (
          <UploadCard key={index} onFileSelect={onFileSelect} />
        )
      )}
    </div>
    {length > 2 && (
      <p>
        You can upload up to {length} files. PDF, JPG, TIFF supported formats.
      </p>
    )}
  </div>
);

export default Attachments;
