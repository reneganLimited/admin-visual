import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
// import { returnV4UsdCreditTransaction } from "../../apiv4";
import { TransactionStateEnum } from "../../types";

interface IProps {
  refresh?: () => void;
  isModalOpen: boolean;
  setIsConfirmOpen: (state: boolean) => void;
  setLoader: (loading: boolean) => void;
  transactionId?: string;
}

const ConfirmReturnV4TransactionModal = ({
  refresh,
  isModalOpen,
  setIsConfirmOpen,
  setLoader,
  transactionId,
}: IProps) => {
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    try {
      setLoading(true);
      setLoader(true);
      
      // await returnV4UsdCreditTransaction({
      //   TransactionIdentifier: transactionId!,
      //   NewTransactionState: TransactionStateEnum.RETURNED
      // });

      toast.success("Transaction returned successfully");
      setIsConfirmOpen(false);
      refresh && refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to return transaction");
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={() => setIsConfirmOpen(false)}
      title="Return Transaction"
    >
      <div className="mb-4">
        <p>Are you sure you want to return this transaction?</p>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          text="Cancel"
          handleClick={() => setIsConfirmOpen(false)}
          style="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={loading}
        />
        <Button
          text={loading ? "Processing..." : "Return"}
          handleClick={handleReturn}
          style="bg-red-500 text-white px-4 py-2 rounded"
          disabled={loading}
        />
      </div>
    </Modal>
  );
};

export default ConfirmReturnV4TransactionModal; 