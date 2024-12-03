import Modal from "./modal";

import { Button } from "../button";
import { useState } from "react";

interface DeleteModalProps {
  onSubmit: () => void;
  onClose: () => void;
  open: boolean;
}

const DeleteModal = ({ onSubmit, onClose, open }: DeleteModalProps) => {
  const onSubmitHandle = () => {
    onSubmit();
    onClose();
  };

  const [closing, setClosing] = useState(false);

  // Ensuring the animation occurs properly when closing by delaying 300ms
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 300);
  };

  return (
    <Modal isClosing={closing} isOpen={open} onClose={handleClose}>
      <div className="flex flex-col ">
        <div>
          <h3 className="text-xl text-black">Are you sure?</h3>
          <h2 className="text-lg">This action cannot be undone.</h2>
        </div>
        <div className="mt-8 flex justify-end gap-6 ">
          <Button type="button" variant="danger" onClick={handleClose}>
            close
          </Button>
          <Button onClick={onSubmitHandle} type="submit" variant="primary">
            delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
