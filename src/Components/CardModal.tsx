import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Card } from './Card';

type CardModalProps = {
  card: Card;
  cardModalOpen: boolean;
  closeCardModal: (card: Card, newAmount: number) => void;
};

const CardModal: React.FC<CardModalProps> = ( {card, cardModalOpen, closeCardModal } ) => {

  const [cardAmount, setCardAmount] = useState<number>(card.amount);

  const incrementCardAmount = () => {
    setCardAmount(cardAmount + 1);
  };
  
  const decrementCardAmount = () => {
    setCardAmount(cardAmount - 1);
  };

  return (
    <>
      <Dialog open={cardModalOpen} onClose={() => closeCardModal(card, cardAmount)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-70">
          <DialogPanel className="flex flex-col max-w-lg space-y-4 border bg-slate-800 p-8 rounded-2xl">
            <DialogTitle className="font-bold text-2xl">{card.name}</DialogTitle>
            <img src={card.image} alt={card.name} className="w-1/2 mx-auto" />
            <p className="self-center">Current Amount:</p>
            <div className="flex gap-4 items-center justify-center">
              <button onClick={decrementCardAmount}>-</button>
              <p>{cardAmount}</p>
              <button onClick={incrementCardAmount}>+</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default CardModal;
