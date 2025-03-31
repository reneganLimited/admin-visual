/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import {useState, useEffect} from "react"
import {ToastContainer} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import {getTransactions} from "../../apiV1"
import {
  setTransactionsLoading,
  setAllTransactions,
  setNextToken,
  saveToken,
} from "../../redux/slices/TransactionsSlice"
import {RootState} from "../../redux/store"
import TransactionTabs from "./TransactionTabs"
import TransactionsTable from "./TransactionsTable"
import {setCurrentlyViewing} from "../../redux/slices/View"
import {Category, TransactionStateEnum, TransactionTypeEnum} from "../../types"
import FurtherReviewTable from "./FurtherReviewTable"
import Button from "../../components/Button"
import {BsPlus} from "react-icons/bs"

const Transactions = () => {
  const dispatch = useDispatch()
  const [loading, setLoader] = useState(false)
  const {listTransactionFilter} = useSelector(
    (state: RootState) => state.transactions
  )

  const today = new Date()
  const setDate = new Date()
  setDate.setMonth(today.getMonth() - 2)

  const fetch_transactions = async (filter: any) => {
    filter = {...listTransactionFilter, ...filter}
    if (filter.TransactionState === TransactionStateEnum.FLAGGED) {
      filter.enrich = true
    }
    if (
      filter.UserEmail ||
      filter.AccountNumber ||
      filter.TransactionIdentifier ||
      filter.UserID
    ) {
      delete filter.StartDate
      delete filter.EndDate
    }
    console.log("searching filter:", filter)
    await getTransactions(filter)
      .then((res) => {
        console.log(res.data)
        dispatch(setAllTransactions(res.data.TransactionsSummaryList))
        dispatch(setTransactionsLoading(false))
        if (res.data.NextToken) {
          dispatch(setNextToken(res.data.NextToken))
        } else {
          dispatch(setNextToken(""))
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error("Transaction error occured:" + err?.response?.data?.message)
        dispatch(setTransactionsLoading(false))
        dispatch(setAllTransactions([]))
      })
  }

  useEffect(() => {
    dispatch(setCurrentlyViewing(Category.Transactions))
  }, []) // Add dependencies to trigger the effect

  return (
    <>
      <ToastContainer />

      <div className="w-full bg-gray-100 sticky top-[0rem] block pt-[1rem] z-0">
        <TransactionTabs
          setLoader={setLoader}
          fetchData={async (filter: any) => {
        dispatch(setTransactionsLoading(true))
        dispatch(saveToken([]))
        await fetch_transactions(filter)
          }}
        />
      </div>

      <div className="min-h-screen bg-white text-black p-6">
        {listTransactionFilter.TransactionState ===
          TransactionStateEnum.FURTHER_REVIEW &&
        listTransactionFilter.TransactionType ===
          TransactionTypeEnum.USD_CREDIT ? (
          <FurtherReviewTable
            setLoader={setLoader}
            loading={loading}
            fetchData={async (filter: any) => {
              await fetch_transactions(filter)
            }}
          />
        ) : (
          <TransactionsTable
            setLoader={setLoader}
            loading={loading}
            fetchData={async (filter: any) => {
              await fetch_transactions(filter)
            }}
          />
        )}
      </div>
    </>
  )
}

export default Transactions
