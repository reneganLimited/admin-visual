import SmallModal from "../../components/SmallModal";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { overrideScheduler, updateTransaction } from "../../apiV1";
import { NoteRequestData, TransactionStateEnum } from "../../types";
import { useState } from "react";
import { processV4Transaction } from "../../apiv4";

interface IProps {
  isModalOpen: boolean;
  setIsConfirmOpen: (state: boolean) => void;
  refresh?: () => void;
  setLoader?: (state: boolean) => void;
  isV4Transaction?: boolean;
}

const ConfirmProcessingModal = ({ isModalOpen, setIsConfirmOpen, refresh, setLoader, isV4Transaction }: IProps) => {
  const currentTransaction = useSelector(
    (state: RootState) => state.transactions.oneTransaction,
  );
  const { adminData } = useSelector(
    (state: RootState) => state.admin
  );
  const [note, setNote] = useState("");

  const handleError = (error: any, action: string) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred."
    console.error(`${action} - ${errorMessage}`)
    toast.error(`An error occurred while ${action}. Please try again.`)
  }

  const updateTransactionToProcessing = async (currentTransaction: any) => {
    closeSmallModal();
    setLoader && setLoader(true);
    const newNote: NoteRequestData = {
      id: Date.now(),
      name: `${adminData?.given_name ?? ''} ${adminData?.family_name ?? ''}`,
      text: note,
      date: new Date().toLocaleString(),
    };

    const isFlaggedOrLimitExceeded = [TransactionStateEnum.DAILY_LIMIT_EXCEEDED, TransactionStateEnum.FLAGGED].includes(currentTransaction?.TransactionState);
    
    try {
      if (isV4Transaction && !isFlaggedOrLimitExceeded) { 
        // Use V4 API for Lead/Renegan transactions
        await processV4Transaction(currentTransaction?.TransactionIdentifier!);
      } else {
        // Use V1 API for other transactions
        let NewState = TransactionStateEnum.TRANSIT;
        if (
          currentTransaction?.TransactionState === TransactionStateEnum.FURTHER_REVIEW ||
          currentTransaction?.TransactionState === TransactionStateEnum.DAILY_LIMIT_EXCEEDED || 
          currentTransaction?.TransactionState === TransactionStateEnum.FLAGGED
        ) {
          NewState = TransactionStateEnum.COMPLETED;
        }

        if (currentTransaction?.TransactionState === TransactionStateEnum.IN_REVIEW) {
          await overrideScheduler(currentTransaction?.TransactionIdentifier!, {
            Date: new Date().toISOString(),
            UserID: currentTransaction?.UserID,
          });
        } else {
          await updateTransaction(
            currentTransaction?.TransactionIdentifier!,
            NewState,
            note ? newNote : undefined
          );
        }
      }
      
      toast.success("Successful");
      refresh && (await refresh());
    } catch (error: any) {
      handleError(error, "update Transaction To Processing");
      console.log(error);
    } finally {
      setLoader && setLoader(false);
    }
  };

  const closeSmallModal = () => {
    setIsConfirmOpen(false);
  };

  return (
    <SmallModal title="Confirm Update" isOpen={isModalOpen} closeModal={closeSmallModal}>
      <div>
        <p className="text-center">
          You are about to process this transaction <br/>
          <span className="text-darkgold font-bold">
        ({currentTransaction?.TransactionIdentifier})
          </span>{" "}
        </p>
        {currentTransaction?.TransactionState === TransactionStateEnum.FURTHER_REVIEW ? (
          <div className="text-center">
        <p className="mb-2">Please add a note for this transaction:</p>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Add your note here..."
          onChange={(e) => setNote(e.target.value)}
        />
          </div>
        ) : (
          <p className="text-center">Are you sure?</p>
        )}
        <div className="flex justify-center">
          <Button
        text="Yes"
        handleClick={async () => {
          await updateTransactionToProcessing(currentTransaction);
          setIsConfirmOpen(false);
        }}
        style="text-sm text-[#FFF] confirm-button mr-[50px] rounded-[8px] mt-3 bg-green"
        disabled={currentTransaction?.TransactionState === TransactionStateEnum.FURTHER_REVIEW && !note}
          />
          <Button
        text="No"
        handleClick={closeSmallModal}
        style="text-sm text-[#FFF] confirm-button rounded-[8px] bg-danger mt-3"
          />
        </div>
      </div>
    </SmallModal>
  );
};

export default ConfirmProcessingModal;
