import { useDispatch, useSelector } from "react-redux"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"
import { RootState } from "../../redux/store"
import Button from "../../components/Button"
import {
  setIsCancelTransactionOpen,
  setIsConfirmTransactionOpen,
  setIsProcessTransactionOpen,
  setReviewModalOpen,
  setReturnModalOpen,
  setIsFlagTransactionOpen,
} from "../../redux/slices/TransactionsSlice"
import ConfirmCancelModal from "./ConfirmCancelModal"
import ConfirmTransactionReviewModal from "./ConfirmReviewTransactionModal"
import ConfirmUpdateModal from "./ConfirmUpdateModal"
import ConfirmReturnTransactionModal from "./ConfirmReturnTransactionModal"
import ConfirmFlagTransactionModal from "./ConfirmFlagTransactionModal"
import ConfirmReturnV4TransactionModal from "./ConfirmReturnV4TransactionModal"

interface IProps {
  refresh?: () => void
}
function TransactionButtons({ refresh }: IProps) {
  const {
    isProcessTransactionOpen,
    isConfirmTransactionOpen,
    isCancelTransactionOpen,
    isFlagTransactionOpen,
    oneTransaction,
    isReviewTransactionOpen,
    isReturnTransactionOpen,
  } = useSelector((state: RootState) => state.transactions)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const isV4Transaction = oneTransaction?.TransactionDetail?.Recipient?.BankName?.toLowerCase().includes("lead") || oneTransaction?.TransactionDetail?.Recipient?.BankName?.toLowerCase().includes("Renegan")
  const RequiredProccessingStates = [
    "DAILY_LIMIT_EXCEEDED",
    "WEEKLY_LIMIT_EXCEEDED",
    "MONTHLY_LIMIT_EXCEEDED",
    "FURTHER_REVIEW",
    "IN_TRANSIT",
    "DELAYED",
    "PENDING",
    "IN_REVIEW",
    "FLAGGED",
    ...(isV4Transaction ? [] : ["FLAGGED"]), 
  ]

  const RequiredReviewStates = [
    "DAILY_LIMIT_EXCEEDED",
    "WEEKLY_LIMIT_EXCEEDED",
    "MONTHLY_LIMIT_EXCEEDED",
    ...(isV4Transaction ? [] : ["FLAGGED"]), 
  ];

  const TransactionReturnEnabledStates = [
    "DAILY_LIMIT_EXCEEDED",
    "WEEKLY_LIMIT_EXCEEDED",
    "MONTHLY_LIMIT_EXCEEDED",
    "FLAGGED",
    "FURTHER_REVIEW",
  ];
  const RequiredFlagStates = [
    "IN_REVIEW",
  ]
  const RequiredReturnStates = [
    "FURTHER_REVIEW",
    "FLAGGED",
    "IN_REVIEW",
    "DAILY_LIMIT_EXCEEDED",
    "WEEKLY_LIMIT_EXCEEDED",
    "MONTHLY_LIMIT_EXCEEDED"
  ];

  const shouldShowReturnButton = (
    (TransactionReturnEnabledStates.includes(oneTransaction?.TransactionState ?? '') ||
     RequiredReturnStates.includes(oneTransaction?.TransactionState ?? '')) &&
    isV4Transaction
  );

  return (
    <>

      <ConfirmUpdateModal
        refresh={() => {
          refresh && refresh()
        }}
        isModalOpen={isConfirmTransactionOpen}
        setIsConfirmOpen={(state: boolean) =>
          dispatch(setIsConfirmTransactionOpen(state))
        }
        setLoader={setLoading}
      />

      <ConfirmTransactionReviewModal
        refresh={() => {
          refresh && refresh()
        }}
        isModalOpen={isReviewTransactionOpen}
        setIsConfirmOpen={(state: boolean) =>
          dispatch(setReviewModalOpen(state))
        }
        setLoader={setLoading}
      />

      <ConfirmCancelModal
        refresh={() => {
          refresh && refresh()
        }}
        isModalOpen={isCancelTransactionOpen}
        setIsCancelTransactionOpen={(state: boolean) =>
          dispatch(setIsCancelTransactionOpen(state))
        }
        setLoader={setLoading}
      />

      <ConfirmFlagTransactionModal
        refresh={() => {
          refresh && refresh()
        }}
        isModalOpen={isFlagTransactionOpen}
        setIsFlagTransactionOpen={(state: boolean) =>
          dispatch(setIsFlagTransactionOpen(state))
        }
        setLoader={setLoading}
      />

     
      {isV4Transaction ? (
        <ConfirmReturnV4TransactionModal
          refresh={refresh}
          isModalOpen={isReturnTransactionOpen}
          setIsConfirmOpen={(state: boolean) =>
            dispatch(setReturnModalOpen(state))
          }
          setLoader={setLoading}
          transactionId={oneTransaction?.TransactionIdentifier}
        />
      ) : (
        <ConfirmReturnTransactionModal
          refresh={refresh}
          isModalOpen={isReturnTransactionOpen}
          setIsConfirmOpen={(state: boolean) =>
            dispatch(setReturnModalOpen(state))
          }
          setLoader={setLoading}
        />
      )}

      <div className="m-2 mt-8 row space-x-4">
        {RequiredProccessingStates.includes(
          oneTransaction?.TransactionState ?? ""
        ) && (
            <Button
              text={loading ? "Processing..." : "Process Transaction Now"}
              handleClick={() => {
                dispatch(setIsProcessTransactionOpen(true))
              }}
              style={`text-sm text-white rounded-[8px] mb-2 bg-green w-auto`}
              disabled={loading}
            />
          )}

        {RequiredReviewStates.includes(
          oneTransaction?.TransactionState ?? ""
        ) && (
            <Button
              text={loading ? "Processing..." : "Move to further review"}
              handleClick={() => {
                dispatch(setReviewModalOpen(true))
              }}
              style={`text-sm text-white rounded-[8px] mb-2 bg-danger w-auto`}
              disabled={loading}
            />
          )}

        {/* {RequiredCancelStates.includes(
          oneTransaction?.TransactionState ?? ""
        ) && (
            <>
              <Button
              text={loading ? "Processing..." : (oneTransaction?.TransactionState === TransactionStateEnum.DAILY_LIMIT_EXCEEDED ? "Reject Transaction" : "Cancel Transaction")}
              handleClick={() => {
                oneTransaction &&
                dispatch(
                  setToBeCancelledTransaction(
                  oneTransaction.TransactionIdentifier
                  )
                )
                dispatch(setIsCancelTransactionOpen(true))
              }}
              style=" hover:bg-gray-400 text-sm text-white px-3 py-3 rounded-[8px] mt-3 bg-red-500 text-black "
              disabled={loading}
              />
            </>
          )} */}

        {RequiredFlagStates.includes(
          oneTransaction?.TransactionState ?? ""
        ) && isV4Transaction && (
            <Button
              text={loading ? "Processing..." : "Flag Transaction"}
              handleClick={() => {
                dispatch(setIsFlagTransactionOpen(true))
              }}
              style=" hover:bg-gray-400 text-sm text-white px-3 py-3 rounded-[8px] mt-3 bg-red-500 text-black "
              disabled={loading}
            />
          )}
           {shouldShowReturnButton && (
        <Button
          text={loading ? "Processing..." : "Return Transaction"}
          handleClick={() => {
            dispatch(setReturnModalOpen(true))
          }}
          style="text-sm text-white rounded-[8px] mb-2 bg-danger w-auto"
          disabled={loading}
        />
      )}

      </div>
    </>
  )
}

export default TransactionButtons