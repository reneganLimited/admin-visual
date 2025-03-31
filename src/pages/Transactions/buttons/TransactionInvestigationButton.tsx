import {useDispatch} from "react-redux"
import {setIsNoteOpen, setReviewModalOpen} from "../../../redux/slices/TransactionsSlice"
import {AppDispatch} from "../../../redux/store"
import {ITransaction} from "../../../types"
import Button from "../../../components/Button"

interface IProps {
  transaction: ITransaction
}
function TransactionInvestigationButton({transaction}: IProps) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <>
      {(transaction.TransactionState === "DAILY_LIMIT_EXCEEDED" ||
      transaction.TransactionState === "FURTHER_REVIEW") && (
        <Button
          text={
            ["FURTHER_REVIEW"].includes(transaction.TransactionState)
              ? "View Notes" // Show "View AML" for COMPLETED or TIMEOUT
              : "Mark for review" // Default to "Run AML check"
          }
          handleClick={async () => {
                ["FURTHER_REVIEW"].includes(transaction.TransactionState)
              ? dispatch(setIsNoteOpen(true))
              : dispatch(setReviewModalOpen(true))
         
          }}
          style={`text-sm border rounded-[5px] mb-4 
${
  ["FURTHER_REVIEW"].includes(transaction.TransactionState)
    ? "bg-grey text-black"
    : "bg-danger text-white"
} w-auto float-right`}
        />
      )}
    </>
  )
}

export default TransactionInvestigationButton
