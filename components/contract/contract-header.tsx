import ThreeDots from '@/icons/three-dots';
import FileIconAlt from '@/icons/upload-icons/file-icon-alt';

const ContractHeader = ({
  title,
  endContract,
  onOpenOptions,
  onShowTerms,
  onShowEndContract,
  onOpenOptionsMobile,
}: {
  title: string;
  endContract: boolean;
  onOpenOptions: () => void;
  onShowTerms: () => void;
  onShowEndContract: () => void;
  onOpenOptionsMobile?: () => void;
}) => (
  <div className="grid grid-cols-12 gap-4 items-center mb-5">
    <div className="col-span-10 md:col-span-8">
      <h3 className="text-h3 2xl:text-scaled-h3 font-bold text-olblue-900">
        {title}
      </h3>
    </div>
    <div className="col-span-2 md:col-span-4 hidden md:flex items-start md:items-center justify-end space-x-2">
      <button
        onClick={onShowTerms}
        className="flex items-center gap-2 p-3 bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
      >
        Terms of contract
        <FileIconAlt />
      </button>
      {!endContract && (
        <button
          onClick={onShowEndContract}
          className="flex items-center justify-center gap-2 p-3 bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
        >
          End contract
        </button>
      )}
      <button
        className="w-8 h-8 p-2 border border-omblue-100 rounded-full"
        onClick={onOpenOptions}
      >
        <ThreeDots />
      </button>
    </div>
    <button
      className="w-8 h-8 p-2 border border-omblue-100 rounded-full md:hidden"
      onClick={onOpenOptionsMobile}
    >
      <ThreeDots />
    </button>
  </div>
);

export default ContractHeader;
