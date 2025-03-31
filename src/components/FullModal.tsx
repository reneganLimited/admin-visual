import React, { useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { FaTimes } from "react-icons/fa";

interface IProps {
  isOpen: boolean;
  title?: string;
  closeModal: () => void;
  children: React.ReactNode;
}

const FullModal = ({ isOpen, children, closeModal, title }: IProps) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalBodyRef, closeModal);
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 flex left-0 h-[100%] w-full overflow-scroll bg-modal bg-modal-overlay">
          <div
            ref={modalBodyRef}
            className="flex flex-col w-full sm:w-[900px] mx-auto justify-center items-center relative m-auto bg-offwhite rounded-md overflow-hidden shadow-lg"
          >
            <div className="flex w-[100%] items-center px-3 py-2 bg-gray-100 rounded-t-md">
              <h2 className="text-md font-bold mr-5">{title}</h2>
              <button className="ml-auto text-xl" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="px-6 py-3 m-4 w-full p-auto">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullModal;
