import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setAllTransactions,
  setToBeUpdatedTransaction,
} from "../../redux/slices/TransactionsSlice";
import { updateTransaction } from "../../apiV1";
import { ITransaction, TransactionStateEnum } from "../../types";
import { toast } from "react-toastify";
import SmallModal from "../../components/SmallModal";
interface IProps {
  isModalOpen: boolean;
  setIsConfirmOpen: (state: boolean) => void;
  refresh?: () => void;
  setLoader?: (state: boolean) => void;
}
const ConfirmUpdateModal = ({ isModalOpen, setIsConfirmOpen, refresh, setLoader }: IProps) => {
  const dispatch = useDispatch();
  const {oneTransaction} = useSelector(
    (state: RootState) => state.transactions,
  );

  let NewState = TransactionStateEnum.TRANSIT;
  if (
    oneTransaction?.TransactionState === TransactionStateEnum.DAILY_LIMIT_EXCEEDED
    || oneTransaction?.TransactionState === TransactionStateEnum.FLAGGED
  ) {
    NewState = TransactionStateEnum.COMPLETED;
  }

  const updateTransactionToTransit = async (id: string) => {
    setLoader && setLoader(true);
    try {
      await updateTransaction(id, NewState);
      toast.success(
        `Transaction with TransactionIdentifier: ${id} is now in ${NewState}`,
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
  const closeModal = () => {
    setIsConfirmOpen(false);
    dispatch(setToBeUpdatedTransaction(null));
  };
  return (
    <SmallModal title="Confirm Update" isOpen={isModalOpen} closeModal={closeModal}>
      <div>
        <p className="text-center">
          About to update transaction with TransactionIdentifier:{" "}
          <span className="text-darkgold font-bold">
            {oneTransaction?.TransactionIdentifier}{" "}
          </span>
          to
          <span className="text-darkgold font-bold"> {NewState} </span>.
        </p>
        <p className="text-center">Are you sure?</p>
        <div className=" flex justify-center">
          <Button
            text="Yes"
            handleClick={async () => {
              if (!oneTransaction) {
                return;
              }
              setIsConfirmOpen(false);
              await updateTransactionToTransit(oneTransaction.TransactionState);
            }}
            style={`text-sm text-[#FFF] confirm-button mr-[50px] rounded-[8px] mt-3  bg-green`}
          />
          <Button
            text="No"
            handleClick={closeModal}
            style={`text-sm text-[#FFF] confirm-button rounded-[8px]  bg-danger  mt-3`}
          />
        </div>
      </div>
    </SmallModal>
  );
};

export default ConfirmUpdateModal;
