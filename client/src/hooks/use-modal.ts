import { useState } from 'react';

export default function useModal(initIsOpen = false) {
  const [isOpen, setIsOpen] = useState(initIsOpen);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((state) => !state);
  };

  return { isOpen, handleOpen, handleClose, handleToggle };
}
