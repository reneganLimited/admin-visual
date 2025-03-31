import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../../redux/store"
import Button from "../../../components/Button"
import { setToBeUpdatedTransaction, setIsConfirmTransactionOpen } from "../../../redux/slices/TransactionsSlice"

function UpdateTransactionButton() {
  const dispatch = useDispatch<AppDispatch>()

  const currentTransaction = useSelector(
    (state: RootState) => state.transactions.oneTransaction,
  );
  
  return (
    <>
{(currentTransaction?.TransactionState === "PENDING" ||
    currentTransaction?.TransactionState ===
      "DAILY_LIMIT_EXCEEDED" ||
    currentTransaction?.TransactionState === "IN_TRANSIT" ||
    currentTransaction?.TransactionState === "DELAYED") && (
    <>
      <Button
        text="Update Transaction"
        handleClick={() => {
          currentTransaction &&
            dispatch(
              setToBeUpdatedTransaction(
                currentTransaction.TransactionIdentifier
              )
            );
          dispatch(setIsConfirmTransactionOpen(true));
        }}
        style={`text-sm text-white rounded-[5px] bg-black w-auto float-right`}
      />
    </>
  )}
  </>)
}

export default UpdateTransactionButton;