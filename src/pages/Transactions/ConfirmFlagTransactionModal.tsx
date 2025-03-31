/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/style-prop-object */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { flagV4Transaction } from "../../apiv4";
import { toast } from "react-toastify";
import { NoteRequestData, TransactionStateEnum } from "../../types";
import { useState } from "react";

interface IProps {
  isModalOpen: boolean;
  setIsFlagTransactionOpen: (state: boolean) => void;
  refresh: () => void;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmFlagTransactionModal = ({ isModalOpen, setIsFlagTransactionOpen, refresh, setLoader }: IProps) => {
  const currentTransaction: any = useSelector(
    (state: RootState) => state.transactions.oneTransaction,
  );
  const { adminData } = useSelector(
    (state: RootState) => state.admin
  );
  const [note, setNote] = useState("");

  const dispatch = useDispatch();

  const flagTransaction = async (transaction: any) => {
    closeModal();
    setLoader && setLoader(true);
    const newNote: NoteRequestData = {
      id: Date.now(),
      name: `${adminData?.given_name ?? ''} ${adminData?.family_name ?? ''}`,
      text: note,
      date: new Date().toLocaleString(),
    };
    try {
      console.log(`Flagging transaction with ID: ${transaction?.TransactionIdentifier}`);
      const newState = TransactionStateEnum.FLAGGED;
      // await flagV4Transaction(transaction?.TransactionIdentifier!, note, newState);
      toast.success(`Transaction with Identifier: ${transaction?.TransactionIdentifier} is now ${newState}`);
      refresh && (await refresh());
    } catch (err: any) {
      toast.error(`An error occurred while flagging transaction with Identifier: ${transaction?.TransactionIdentifier}. ${err?.message}`);
    } finally {
      setLoader && setLoader(false);
    }
  };

  const closeModal = () => {
    setIsFlagTransactionOpen(false);
  };

  return (
    <Modal title="Flag Transaction Note" isOpen={isModalOpen} closeModal={closeModal}>
      <div>
        <p className="text-center">
          Please leave a note to flag the transaction with Identifier: <br/>
          <span className="text-darkgold font-bold">
            ({currentTransaction?.TransactionIdentifier})
          </span>.
        </p>

        <div className="px-4 py-2 w-full">
          <textarea
            tabIndex={5}
            className="w-full p-1 h-[90px] float-left"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex justify-center w-full">
          <Button
            text="Confirm"
            disabled={!note}
            handleClick={async () => {
              await flagTransaction(currentTransaction);
            }}
            style="text-sm text-[#FFF] confirm-button mr-[50px] rounded-[8px] mt-3 bg-green"
          />
          <Button
            text="Cancel"
            handleClick={closeModal}
            style="text-sm text-[#FFF] confirm-button rounded-[8px] border-2 border-[red] mt-3 bg-danger"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmFlagTransactionModal;
