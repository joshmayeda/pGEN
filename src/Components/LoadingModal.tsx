import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

type LoadingModalProps = {
    loadingModalOpen: boolean;
    closeLoadingModal: () => void;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ loadingModalOpen, closeLoadingModal }) => {

  return (
    <>
      <Dialog open={loadingModalOpen} onClose={() => closeLoadingModal()} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-70">
          <DialogPanel className="flex flex-col max-w-lg space-y-4 border bg-slate-800 p-8 rounded-2xl">
            <DialogTitle>Generating...</DialogTitle>
            <span className="loading loading-spinner loading-lg self-center"></span>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default LoadingModal;
