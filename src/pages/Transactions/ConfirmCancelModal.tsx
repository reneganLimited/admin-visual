import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { cancelTransaction } from "../../apiV1";
import Button from "../../components/Button";
import { ITransaction, TransactionStateEnum } from "../../types";
import {
  setAllTransactions,
  setToBeCancelledTransaction,
} from "../../redux/slices/TransactionsSlice";

interface IProps {
  isModalOpen: boolean;
  setIsCancelTransactionOpen: (state: boolean) => void;
  refresh?: () => void;
  setLoader?: (state: boolean) => void;
}
const ConfirmCancelModal = ({
  isModalOpen,
  setIsCancelTransactionOpen,
  refresh,
  setLoader,
}: IProps) => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(
    (state: RootState) => state.transactions.allTransactions,
  );
  const toBeCancelledTransaction = useSelector(
    (state: RootState) => state.transactions.toBeCancelledTransaction,
  );
  const closeModal = () => {
    setIsCancelTransactionOpen(false);
  };

  let NewState = TransactionStateEnum.CANCELLED;
  const transactions = [...allTransactions];
  const index = transactions.findIndex(
    (transaction: ITransaction) =>
      transaction.TransactionIdentifier === toBeCancelledTransaction,
  );
  const transaction = { ...transactions[index] };
  if (
    transaction?.TransactionState == TransactionStateEnum.DAILY_LIMIT_EXCEEDED
  ) {
    NewState = TransactionStateEnum.REJECTED;
  }

  const updateTransactionToCancelled = async (id: string) => {
    try {
      setLoader && setLoader(true);
      await cancelTransaction(id, NewState);
     toast.success(
        `Transaction with TransactionIdentifier: ${id} is now in cancelled`,
      );
      refresh && refresh();
    } catch (err) {
      toast.error(
        `An error occured while updating transaction with TransactionIdentifier: ${id}`,
      );
    } finally {
      setLoader && setLoader(false);
    }
  };

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <div>
        <p className="text-center">
          About to <span className="text-[red] font-bold">{NewState}</span>{" "}
          transaction with TransactionIdentifier:{" "}
          <span className="text-darkgold font-bold">
            {toBeCancelledTransaction}{" "}
          </span>
        </p>
        <p className="text-center">Are you sure?</p>
        <div className=" flex  justify-center">
          <Button
            text="Yes"
            handleClick={async () => {
              if (!toBeCancelledTransaction) {
                return;
              }
              setIsCancelTransactionOpen(false);
              await updateTransactionToCancelled(toBeCancelledTransaction);
            }}
            style=" text-sm text-[#FFF] confirm-button mr-[50px] rounded-[8px] mt-3  bg-green "
          />
          <Button
            text="No"
            handleClick={closeModal}
            style=" text-sm text-[#FFF] confirm-button rounded-[8px]  bg-danger  mt-3 "
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmCancelModal;
