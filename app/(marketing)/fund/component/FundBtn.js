import React, { useState } from 'react';
import { Details } from './signup/components/Contribution/details';
import { Methods } from './signup/components/Contribution/methods';
import Modal from '../../../../components/marketing/Payment Modal/Modal';
import { SuccessModal } from './signup/components/Contribution/successModal';

const FundBtn = ({
  children,
  className,
  type = 'button',
  defaultContent = 'details',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(defaultContent); // Set initial state based on prop

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'details':
        return <Details onNext={() => setModalContent('method')} />;
      case 'method':
        return (
          <Methods
            onClose={handleCloseModal}
            onBack={() => setModalContent('details')}
          />
        );
      case 'success':
        return <SuccessModal onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <button onClick={openModal} type={type} className={`z-[3] ${className}`}>
        {children}
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} className={`z-30`}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default FundBtn;
