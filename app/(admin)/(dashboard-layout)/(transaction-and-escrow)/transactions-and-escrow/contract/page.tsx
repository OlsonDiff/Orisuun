'use client';

import Breadcrumbs from '@/components/breadcrumbs';
import ContractDetails from '@/components/contract/contract-details';
import ContractHeader from '@/components/contract/contract-header';
import ContractModals from '@/components/contract/contract-modals';
import ContractOverview from '@/components/contract/contract-overview';
import ProfileCard from '@/components/cards/profile-card';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import useOutsideClick from '@/hooks/useOutsideClick';
import DisputeIcon from '@/icons/dispute-icon';
import EditIcon from '@/icons/edit-icon';
import { cn } from '@/utils/utils';
import { useRef, useState } from 'react';
import { useCallback, useEffect } from 'react';
import { checkUserVerificationStatus } from '@/server-actions/verification';
import { RootState } from '@/data/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllContractsbyUser } from '@/server-actions/contractEscrow';
import ContractBottom from '@/components/contract/contract-bottom';

const Contract = () => {
  const [openOptions, setOpenOptions] = useState<boolean>(false); // to open the three dots menu (above md)
  const [openSheet, setOpenSheet] = useState<boolean>(false); // to open the three dots bottom sheet menu (below md)
  const [showTerms, setShowTerms] = useState<boolean>(false); // to open the modal for terms
  // end
  const [showEndContract, setShowEndContract] = useState<boolean>(false); // to open the modal for end contract
  const [openSheetEndContract, setOpenSheetEndContract] =
    useState<boolean>(false); // to open the bottom sheet in mobile for end contract
  const [endContract, setEndContract] = useState<boolean>(false); // to bring the yellow tag on top
  const [confirmEndContract, setConfirmEndContract] = useState<boolean>(false); // final confirm modal for end contract
  // dispute
  const [showDisputeContract, setShowDisputeContract] =
    useState<boolean>(false); // to open dispute modal
  const [showDisputeContractSheet, setShowDisputeContractSheet] =
    useState<boolean>(false); // to open dispute sheet
  const [disputeContract, setDisputeContract] = useState<boolean>(false); // to bring the yellow tag on top

  // edit
  const [showEditContract, setShowEditContract] = useState<boolean>(false); // to open the modal for Edit contract
  const [openSheetEditContract, setOpenSheetEditContract] =
    useState<boolean>(false); // to open the bottom sheet in mobile for Edit contract
  const [editContract, setEditContract] = useState<boolean>(false); // to bring the yellow tag on top
  const [confirmEditContract, setConfirmEditContract] =
    useState<boolean>(false); // final confirm modal for end contract
  const [openSheetConfirmEditContract, setOpenSheetConfirmEditContract] =
    useState<boolean>(false);

  const isMobile = useMobileMediaQuery();

  const optionsRef = useRef(null);

  useOutsideClick(optionsRef, () => setOpenOptions(false));

  const contractOptions = [
    {
      icon: <DisputeIcon className="w-4 h-4" />,
      text: 'Dispute',
      onClick: () => setShowDisputeContract(true),
    },
    {
      icon: <EditIcon className="w-4 h-4" />,
      text: 'Edit terms',
      onClick: () =>
        isMobile ? setOpenSheetEditContract(true) : setShowEditContract(true),
    },
  ];
  return (
    <div className="p-6">
      <Breadcrumbs
        breadcrumbs={[
          {
            title: 'Transactions & Escrow',
            url: '/transactions-and-escrow',
          },
          { title: 'Contract Page' },
        ]}
      />
      <div className="md:border border-grey-600 mt-8 rounded-tl-lg rounded-tr-lg md:shadow-[0px_3px_12px_0px_rgba(99,126,183,0.11),_0px_0px_10px_0px_rgba(131,148,185,0.04)]">
        {endContract && (
          <div className="mb-8 md:mb-0 px-6 py-4 bg-warning-75 rounded-tl-lg rounded-tr-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h6 className="text-h6 2xl:text-scaled-h6 text-warning-700 font-semibold mb-1">
                End Contract Initiated
              </h6>
              <p className="text-h7 2xl:text-scaled-h7 text-warning-800 font-medium mb-1">
                The other part has decided to end this contract. Confirm to view
                details and take action to finalize the contract termination.
              </p>
            </div>
            <div>
              <button
                onClick={() => setConfirmEndContract(true)}
                className="bg-blue-500 py-3 px-6 rounded-md text-h9 2xl:text-scaled-h9 font-semibold text-white"
              >
                End Contract
              </button>
            </div>
          </div>
        )}
        {disputeContract && (
          <div className="mb-8 md:mb-0 px-6 py-4 bg-warning-75 rounded-tl-lg rounded-tr-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h6 className="text-h6 2xl:text-scaled-h6 text-warning-700 font-semibold mb-1">
                Contract Dispute Initiated
              </h6>
              <p className="text-h7 2xl:text-scaled-h7 text-warning-800 font-medium mb-1">
                The other party has disputed this contract. Confirm to view
                details and take action to resolve the dispute.
              </p>
            </div>
            <div>
              <button
                onClick={() =>
                  isMobile
                    ? setShowDisputeContractSheet(true)
                    : setShowDisputeContract(true)
                }
                className="bg-blue-500 py-3 px-6 rounded-md text-h9 2xl:text-scaled-h9 font-semibold text-white"
              >
                Submit Statement
              </button>
            </div>
          </div>
        )}
        {editContract && (
          <div className="mb-8 md:mb-0 px-6 py-4 bg-warning-75 rounded-tl-lg rounded-tr-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h6 className="text-h6 2xl:text-scaled-h6 text-warning-700 font-semibold mb-1">
                Edit Contract Initiated
              </h6>
              <p className="text-h7 2xl:text-scaled-h7 text-warning-800 font-medium mb-1">
                The other party has proposed changes to this contract. Click the
                button on the right to view the details.
              </p>
            </div>
            <div>
              <button
                onClick={() =>
                  isMobile
                    ? setOpenSheetConfirmEditContract(true)
                    : setConfirmEditContract(true)
                }
                className="bg-blue-500 py-3 px-6 rounded-md text-h9 2xl:text-scaled-h9 font-semibold text-white"
              >
                Submit Statement
              </button>
            </div>
          </div>
        )}
        {/* <div className="md:p-6">
          <div className="relative">
            <ContractHeader
              title="Contract with Brooklyn Simmons"
              endContract={endContract}
              onOpenOptions={() => setOpenOptions(!openOptions)}
              onShowTerms={() => setShowTerms(true)}
              onShowEndContract={() => setShowEndContract(true)}
              onOpenOptionsMobile={() => setOpenSheet(true)}
            />
            <div
              className={cn(
                'absolute right-2 top-14 w-[160px] bg-white p-2 rounded-md border border-grey-600 shadow-[0px_0px_21px_0px_#0808080D]',
                openOptions ? 'block' : 'hidden'
              )}
              ref={optionsRef}
            >
              {contractOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 w-full text-black-200 px-4 py-3 cursor-pointer hover:text-omblue-500"
                  onClick={option.onClick}
                >
                  {option.icon}
                  <p className="text-h8 2xl:text-scaled-h8 font-medium">{option.text}</p>
                </div>
              ))}
            </div>
          </div>
          <ContractDetails amount="$1,000" expiryDate="05 Jan, 2024" />
          <hr className="border border-[#D2D4DA] my-6" />
          <ContractOverview />
        </div> */}
        <div className="md:p-6">
          <div className="relative">
            <ContractHeader
              title="Contract with Brooklyn Simmons"
              endContract={endContract}
              onOpenOptions={() => setOpenOptions(!openOptions)}
              onShowTerms={() => setShowTerms(true)}
              onShowEndContract={() => setShowEndContract(true)}
              onOpenOptionsMobile={() => setOpenSheet(true)}
            />
            <div
              className={cn(
                'absolute right-2 top-14 w-[160px] bg-white p-2 rounded-md border border-grey-600 shadow-[0px_0px_21px_0px_#0808080D]',
                openOptions ? 'block' : 'hidden'
              )}
              ref={optionsRef}
            >
              {contractOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 w-full text-black-200 px-4 py-3 cursor-pointer hover:text-omblue-500"
                  onClick={option.onClick}
                >
                  {option.icon}
                  <p className="text-h8 2xl:text-scaled-h8 font-medium">
                    {option.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ContractDetails amount="$1,000" expiryDate="05 Jan, 2024" />
          <hr className="border border-[#D2D4DA] my-6" />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 md:border-e border-[#D2D4DA]">
              <ContractOverview admin={true} />
            </div>
            <div className={cn('col-span-12 md:col-span-4')}>
              <h6 className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500 mb-4">
                Member Details
              </h6>
              <ProfileCard
                image="https://s3-alpha-sig.figma.com/img/dac5/a3ff/5be85d0f6bc0bd1a076017beb8ff1fd5?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hRU7BuxPw6dLRlu11a1lvCq5kqNtuJzOgTbSw6aJ0B-5NJ3f-4RpcweDywp6~-rBJB9WMTn2Qu2Vkcl1Zleq2dxHKHZiBKqv8uZrSU5pdk8RVIMXfBA3yFLHzIVc2npq80BUQ6YC2c1Bj1IVbPweOy2zVwYacztjf-uJTZKBUtLkLcN3QnP-uwGAOyu6AD4ZMJ1BrMwOtEmjNIwhEi4-MZPrlllgmcJOVuy8MljsvWrkou~OsICxeplqF40DjMi7tTZT0VYZR-sDXpePVqPP9R4K9liInCdKf771ifdUCKZVLwndIWy5nRUHykiiERf8Ozd7qtlbF6lKroa8h5PlIQ__"
                name="Brooklyn Simmons"
                company="Southern California Management Consultants"
              />
              <p className="my-4 text-h9 2xl:text-scaled-h9 font-medium text-blue-400">
                Lorem ipsum dolor sit amet consectetur. Urna arcu tellus nulla
                tellus. Non eros sed nascetur turpis faucibus.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContractModals
        showTerms={showTerms}
        setShowTerms={setShowTerms}
        // end
        showEndContract={showEndContract}
        setShowEndContract={setShowEndContract}
        endContract={endContract}
        setEndContract={setEndContract}
        confirmEndContract={confirmEndContract}
        setConfirmEndContract={setConfirmEndContract}
        // dispute
        disputeContract={disputeContract}
        showDisputeContract={showDisputeContract}
        setShowDisputeContract={setShowDisputeContract}
        setDisputeContract={setDisputeContract}
        // edit
        showEditContract={showEditContract}
        setShowEditContract={setShowEditContract}
        editContract={editContract}
        setEditContract={setEditContract}
        confirmEditContract={confirmEditContract}
        setConfirmEditContract={setConfirmEditContract}
      />
      <ContractBottom
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        setShowTerms={setShowTerms}
        // end
        openSheetEndContract={openSheetEndContract}
        setOpenSheetEndContract={setOpenSheetEndContract}
        endContract={endContract}
        setEndContract={setEndContract}
        // dispute
        showDisputeContractSheet={showDisputeContractSheet}
        setShowDisputeContractSheet={setShowDisputeContractSheet}
        disputeContract={disputeContract}
        setDisputeContract={setDisputeContract}
        // edit
        editContract={editContract}
        setEditContract={setEditContract}
        openSheetEditContract={openSheetEditContract}
        setOpenSheetEditContract={setOpenSheetEditContract}
        openSheetConfirmEditContract={openSheetConfirmEditContract}
        setOpenSheetConfirmEditContract={setOpenSheetConfirmEditContract}
      />
    </div>
  );
};

export default Contract;
