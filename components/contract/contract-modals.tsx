import Modal from '@/components/modal';
import Toggle from '@/components/ui/toggle';
import { Dispatch, SetStateAction } from 'react';
import WorkDescription from '../work-description';
import Dropzone from '../ui/dropzone';

const ContractModals = ({
  showTerms,
  setShowTerms,
  // end
  showEndContract,
  setShowEndContract,
  endContract,
  setEndContract,
  confirmEndContract,
  setConfirmEndContract,
  // dispute
  disputeContract,
  showDisputeContract,
  setShowDisputeContract,
  setDisputeContract,
  // edit
  showEditContract,
  setShowEditContract,
  editContract,
  setEditContract,
  confirmEditContract,
  setConfirmEditContract,
}: {
  // terms
  showTerms: boolean;
  setShowTerms: Dispatch<SetStateAction<boolean>>;
  // end contract
  showEndContract: boolean;
  setShowEndContract: Dispatch<SetStateAction<boolean>>;
  endContract: boolean;
  setEndContract: Dispatch<SetStateAction<boolean>>;
  confirmEndContract: boolean;
  setConfirmEndContract: Dispatch<SetStateAction<boolean>>;
  // dispute contract
  showDisputeContract: boolean;
  setShowDisputeContract: Dispatch<SetStateAction<boolean>>;
  disputeContract: boolean;
  setDisputeContract: Dispatch<SetStateAction<boolean>>;
  // edit contract
  showEditContract: boolean;
  setShowEditContract: Dispatch<SetStateAction<boolean>>;
  editContract: boolean;
  setEditContract: Dispatch<SetStateAction<boolean>>;
  confirmEditContract: boolean;
  setConfirmEditContract: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/* terms */}
      <Modal
        showModal={showTerms}
        setShowModal={setShowTerms}
        title="Terms of contract"
      >
        <p className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500 mb-2">
          Lorem Ipsum Discount Terms and Conditions
        </p>
        <p className="text-blue-400 font-medium text-h7 2xl:text-scaled-h7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
          risus nec neque hendrerit volutpat ac eu orci. Fusce venenatis diam ut
          orci dapibus, quis vehicula nisl consequat. Proin vel convallis
          libero. Nulla facilisi. Integer facilisis, nunc a ultrices fermentum,
          ligula justo sodales magna, et egestas odio nunc nec lectus. Donec at
          urna sed libero feugiat varius id in lacus. Curabitur blandit libero
          nec ante cursus, nec scelerisque sapien porttitor. Duis sollicitudin
          mi at lectus varius, non fermentum mi ultricies. Nunc nec sapien vel
          metus ullamcorper convallis. Quisque in eros sit amet justo lacinia
          scelerisque non ac magna. Praesent sagittis, sapien non tincidunt
          posuere, lectus risus ullamcorper est, id ultricies sem ligula at
          nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Vestibulum non elit libero. Aenean dictum
          vestibulum orci, at pellentesque eros auctor nec. Vestibulum consequat
          velit non nibh lacinia, ut fermentum dui venenatis. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Cras bibendum justo eget facilisis porttitor. Nunc
          gravida mauris eget nulla gravida, ut vehicula lorem congue. Nullam et
          nibh a dui sagittis faucibus sed sit amet felis.
        </p>
        <ol className="list-decimal ps-4 mt-4">
          <li>Eligendi Condiciones</li>

          <ul className="list-disc ps-4">
            <li>Fusce vitae massa et lacus pulvinar vestibulum.</li>
            <li>Quisque posuere quam et lacus efficitur gravida.</li>
            <li>Maecenas eget ex nec dolor suscipit tincidunt.</li>
          </ul>

          <li>Discount Exclusions</li>

          <ul className="list-disc ps-4">
            <li>
              Nulla facilisi. Donec accumsan erat sed justo auctor, in efficitur
              velit fermentum.
            </li>
            <li>
              Suspendisse potenti. Mauris convallis nulla sed libero tincidunt,
              ac sagittis augue lacinia.
            </li>
          </ul>

          <li>Usage Limitations</li>

          <ul className="list-disc ps-4">
            <li>Curabitur sit amet felis a sem mollis dapibus non a odio.</li>
            <li>
              Aliquam erat volutpat. Integer in felis a justo dictum congue.
            </li>
          </ul>

          <li>Refunds and Exchanges</li>

          <ul className="list-disc ps-4">
            <li>
              Praesent congue sapien id sapien volutpat, nec fermentum sapien
              dictum.
            </li>
            <li>
              Sed et magna in ex tristique viverra et et est. Ut vitae neque vel
              quam ullamcorper cursus non nec sapien.
            </li>
          </ul>
        </ol>
      </Modal>

      {/* end contract */}
      <Modal
        showModal={showEndContract}
        setShowModal={setShowEndContract}
        title="Confirm action"
        modalSize="sm"
      >
        <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium">
          Are you sure you want to end the contract? Once a end contract has
          been initiated, each side will be able to submit a statement and
          attach a file.
        </p>
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={() => setShowEndContract(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setEndContract(!endContract);
              setShowEndContract(false);
            }}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            End Contract
          </button>
        </div>
      </Modal>

      {/* confirm end contract */}
      <Modal
        showModal={confirmEndContract}
        setShowModal={setConfirmEndContract}
        title="End Contract Details"
        modalSize="sm"
      >
        <p className="text-blue-300 text-h9 2xl:text-scaled-h9 font-medium">
          Are you sure you want to end the contract?
        </p>
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={() => setConfirmEndContract(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setEndContract(false);
              setConfirmEndContract(false);
            }}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            End Contract
          </button>
        </div>
      </Modal>

      {/* dispute contract */}
      <Modal
        showModal={showDisputeContract}
        setShowModal={setShowDisputeContract}
        title="Dispute Details"
        modalSize="lg"
      >
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
            onClick={() => setShowDisputeContract(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setDisputeContract(!disputeContract);
              setShowDisputeContract(false);
            }}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            Start Dispute
          </button>
        </div>
      </Modal>

      {/* edit contract */}
      <Modal
        showModal={showEditContract}
        setShowModal={setShowEditContract}
        title="Edit Contract Terms"
      >
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
            onClick={() => setShowEditContract(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setEditContract(!endContract);
              setShowEditContract(false);
            }}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            Edit Contract
          </button>
        </div>
      </Modal>

      {/* confirm edit contract */}
      <Modal
        showModal={confirmEditContract}
        setShowModal={setConfirmEditContract}
        title="Edit Contract Terms"
      >
        <WorkDescription
          title="Headline description of work"
          description="This is for a full SaaS website with a subscription-based platform  Changes are for desktop and mobile versions  Quick turnaround for design: - payment screen, including PayPal, ACH, Apple Pay, Google Pay - pricing page  Quick turnaround for redesign and touch up of: - menu/navigation system - member type explanation pages - homepage  Need illustrations to showcase our platform  Need dynamic and adaptive design for desktop and mobile"
          expiryDate="05 Jan, 2024"
        />
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={() => setConfirmEditContract(false)}
            className="flex items-center text-h9 2xl:text-scaled-h9 gap-2  py-3 px-6 font-semibold bg-white border border-omblue-100 text-omblue-500 rounded-md hover:bg-omblue-500 hover:text-white transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => {
              setEditContract(false);
              setConfirmEditContract(false);
            }}
            className="flex items-center text-h9 2xl:text-scaled-h9 justify-center gap-2 py-3 px-6 font-semibold bg-omblue-500 text-white rounded-md hover:bg-omblue-600 transition-colors"
          >
            Approve Edit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ContractModals;
