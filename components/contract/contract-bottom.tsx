import BottomSheet from '@/components/bottom-sheet';
import Toggle from '@/components/ui/toggle';
import DisputeIcon from '@/icons/dispute-icon';
import EditIcon from '@/icons/edit-icon';
import FileIconAlt from '@/icons/upload-icons/file-icon-alt';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import WorkDescription from '../work-description';
import Dropzone from '../ui/dropzone';

const ContractBottom = ({
  openSheet,
  setOpenSheet,
  openSheetEndContract,
  endContract,
  setEndContract,
  setOpenSheetEndContract,
  setShowTerms,
  showDisputeContractSheet,
  setShowDisputeContractSheet,
  disputeContract,
  setDisputeContract,
  editContract,
  setEditContract,
  openSheetEditContract,
  setOpenSheetEditContract,
  openSheetConfirmEditContract,
  setOpenSheetConfirmEditContract,
}: {
  openSheet: boolean;
  // terms
  setOpenSheet: Dispatch<SetStateAction<boolean>>;
  setShowTerms: Dispatch<SetStateAction<boolean>>;
  // end
  openSheetEndContract: boolean;
  setOpenSheetEndContract: Dispatch<SetStateAction<boolean>>;
  endContract: boolean;
  setEndContract: Dispatch<SetStateAction<boolean>>;
  // dispute
  showDisputeContractSheet: boolean;
  setShowDisputeContractSheet: Dispatch<SetStateAction<boolean>>;
  disputeContract: boolean;
  setDisputeContract: Dispatch<SetStateAction<boolean>>;
  // edit
  editContract: boolean;
  setEditContract: Dispatch<SetStateAction<boolean>>;
  openSheetEditContract: boolean;
  setOpenSheetEditContract: Dispatch<SetStateAction<boolean>>;
  openSheetConfirmEditContract: boolean;
  setOpenSheetConfirmEditContract: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/* common bottom sheet */}
      <BottomSheet isOpen={openSheet} onClose={() => setOpenSheet(false)}>
        <ul>
          <li
            className="p-3 flex items-center gap-3 text-h8 2xl:text-scaled-h8 text-black-500 font-medium"
            onClick={() => {
              setOpenSheet(false);
              setOpenSheetEndContract(true);
            }}
          >
            <Image
              src="/images/vector/end-contract.svg"
              alt="end-contract"
              width={18}
              height={18}
            />
            <p>End Contract</p>
          </li>
          <li
            className="p-3 flex items-center gap-3 text-h8 2xl:text-scaled-h8 text-black-500 font-medium"
            onClick={() => {
              setOpenSheet(false);
              setShowTerms(true);
            }}
          >
            <FileIconAlt className="w-4 h-4" />
            <p>Terms of contract</p>
          </li>
          <li
            className="p-3 flex items-center gap-3 text-h8 2xl:text-scaled-h8 text-black-500 font-medium"
            onClick={() => {
              setOpenSheet(false);
              setShowDisputeContractSheet(true);
            }}
          >
            <DisputeIcon className="w-4 h-4" />
            <p>Dispute</p>
          </li>
          <li
            className="p-3 flex items-center gap-3 text-h8 2xl:text-scaled-h8 text-black-500 font-medium"
            onClick={() => {
              setOpenSheet(false);
              setOpenSheetEditContract(true);
            }}
          >
            <EditIcon className="w-4 h-4" />
            <p>Edit terms</p>
          </li>
        </ul>
      </BottomSheet>
      {/* end contract sheet */}
      <BottomSheet
        isOpen={openSheetEndContract}
        onClose={() => setOpenSheetEndContract(false)}
      >
        <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-blue-500 text-center mb-4">
          Confirm action
        </h5>
        <p>
          Are you sure you want to end the contract? Once a end contract has
          been initiated, each side will be able to submit a statement and
          attach a file.
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setOpenSheetEndContract(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setEndContract(!endContract)}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            End Contract
          </button>
        </div>
      </BottomSheet>

      {/* dispute sheet */}
      <BottomSheet
        isOpen={showDisputeContractSheet}
        onClose={() => setShowDisputeContractSheet(false)}
      >
        <h3 className="text-h3 2xl:text-scaled-h3 font-bold text-olblue-900 mb-4">
          Dispute Details
        </h3>
        {disputeContract ? (
          <div className="mb-4">
            <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium">
              Please read the message below and provide us with your perspective
              on the situation.
            </p>
            <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium">
              Our administration will review this dispute and inform you of the
              next steps.
            </p>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium">
              Are you sure you want to start a dispute?
            </p>
            <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium">
              Once a dispute has been initiated, each side will be able to
              submit a statement and attach a file.
            </p>
          </div>
        )}
        {disputeContract ? (
          <div className="mb-4 px-6 py-4 bg-warning-75 rounded-lg">
            <h6 className="text-h6 2xl:text-scaled-h6 text-warning-700 font-semibold mb-1">
              Message from other side
            </h6>
            <p className="text-h7 2xl:text-scaled-h7 text-warning-800 font-medium mb-1">
              The process was unprofessional, and my expectations were not met.
              The result of this work is of low quality, and I would like a
              refund.
            </p>
          </div>
        ) : null}
        <div className="mb-4">
          <p className="text-h9 2xl:text-scaled-h9 font-semibold to-black-500 mb-2">
            Your message:
          </p>
          <textarea
            rows={4}
            placeholder="Statement explaining any omissions or discrepancies"
            className="resize-none border border-black-100 w-full rounded-md py-3 px-4 focus:border-black-400 outline-none"
          />
          <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium">
            Maximum 250 words description
          </p>
        </div>
        <div className="mb-4">
          <p className="text-h9 2xl:text-scaled-h9 font-semibold to-black-500 mb-2">
            Add attachment (Optional)
          </p>
          <Dropzone
            className="border border-solid border-omblue-200 items-start"
            layout="classic"
            onFilesUpload={(file) => console.log(file)}
          />
        </div>
        <div className="flex items-center justify-center md:justify-end gap-3">
          <button
            onClick={() => setShowDisputeContractSheet(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setDisputeContract(!disputeContract);
              setShowDisputeContractSheet(false);
            }}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            Start Dispute
          </button>
        </div>
      </BottomSheet>

      {/* edit */}
      <BottomSheet
        isOpen={openSheetEditContract}
        onClose={() => setOpenSheetEditContract(false)}
      >
        <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-blue-500 mb-4">
          Edit Contract Terms
        </h5>
        <div className="mb-4">
          <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium mb-1">
            Please provide the details below that you wish to edit.
          </p>
          <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium">
            Once edits are submitted, the other party must agree to these
            changes.
          </p>
        </div>
        <div className="mb-4">
          <p className="text-h9 2xl:text-scaled-h9 font-semibold to-black-500 mb-2">
            Task Description:
          </p>
          <textarea
            rows={4}
            placeholder="Write your message here....."
            className="resize-none border border-black-100 w-full rounded-md py-3 px-4 focus:border-black-400 outline-none"
          />
        </div>
        <div className="mb-4">
          <p className="text-h9 2xl:text-scaled-h9 font-semibold to-black-500 mb-2">
            Deadline:
          </p>
          <div className="flex items-center gap-2">
            <Toggle className="w-full" title="1 month">
              1 Month
            </Toggle>
            <Toggle className="w-full" title="3 month">
              3 Month
            </Toggle>
            <Toggle className="w-full" title="6 month">
              6 Month
            </Toggle>
            <Toggle className="w-full" title="1 year">
              1 Year
            </Toggle>
            <Toggle className="w-full" title="custon">
              Custom
            </Toggle>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={() => setOpenSheetEditContract(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setEditContract(!editContract);
              setOpenSheetEditContract(false);
            }}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            Edit Contract
          </button>
        </div>
      </BottomSheet>
      {/* confirm edit */}
      <BottomSheet
        isOpen={openSheetConfirmEditContract}
        onClose={() => setOpenSheetConfirmEditContract(false)}
      >
        <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-blue-500 text-center mb-4">
          Confirm action
        </h5>
        <WorkDescription
          title="Headline description of work"
          description="This is for a full SaaS website with a subscription-based platform  Changes are for desktop and mobile versions  Quick turnaround for design: - payment screen, including PayPal, ACH, Apple Pay, Google Pay - pricing page  Quick turnaround for redesign and touch up of: - menu/navigation system - member type explanation pages - homepage  Need illustrations to showcase our platform  Need dynamic and adaptive design for desktop and mobile"
          expiryDate="05 Jan, 2024"
        />

        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setOpenSheetConfirmEditContract(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => {
              setEditContract(false);
              setOpenSheetConfirmEditContract(false);
            }}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            Approve Edit
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

export default ContractBottom;
