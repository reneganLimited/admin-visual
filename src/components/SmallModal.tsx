import React, { useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { FaTimes } from "react-icons/fa";

interface IProps {
  isOpen: boolean;
  title?: string;
  closeModal: () => void;
  children: React.ReactNode;
}

const SmallModal = ({ isOpen, children, closeModal, title }: IProps) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalBodyRef, closeModal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-modal bg-modal-overlay overflow-scroll">
      <div ref={modalBodyRef} className="relative w-full max-w-md bg-offwhite rounded-md shadow-lg">
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-md">
          <h2 className="text-md font-bold">{title}</h2>
          <button onClick={closeModal} className="text-xl">
            <FaTimes />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default SmallModal;
