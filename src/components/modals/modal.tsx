import { cn } from "@/lib/utils";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  isClosing: boolean;
}

const Modal = ({ children, onClose, isOpen, isClosing }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose} />
      <div
        className={cn(
          "modal-content w-full sm:w-4/5 md:w-3/6",
          isClosing && "close-modal-animation"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
