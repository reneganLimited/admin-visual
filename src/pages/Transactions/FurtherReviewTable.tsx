/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import {ToastContainer, toast} from "react-toastify"
import {getTransaction} from "../../apiV1"
import {
  setCurrentTransaction,
  setOneTransaction,
  setIsTransactionOpen,
  setFilterBy,
  setTransactionFilter,
  saveToken,
  setTransactionsLoading,
} from "../../redux/slices/TransactionsSlice"
import {getDateTime} from "../../components/DateReader"
import {
  getCurrencySymbol,
  StateColor,
  threeMonthAgoStartDate,
} from "../../utils/helper"
import {FilterBy, TransactionStateEnum, TransactionTypeEnum} from "../../types"
import PaginationBar from "../../components/PaginationBar"
import {DepositColor} from "../../utils/helper"
import {MAX_TRANSACTIONS_LIMIT} from "../../constants"
import PlaceHolder from "../../components/PlaceHolder"
import {BsSearch} from "react-icons/bs"
import Button from "../../components/Button"
import CurrentTransactionModal from "./CurrentTransactionModal"

interface IProps {
  setLoader?: any
  fetchData?: any
  loading?: boolean
}
const FurtherReviewTable = ({fetchData, setLoader, loading}: IProps) => {
  const dispatch = useDispatch()
  const {
    allTransactions,
    filterBy,
    transactionFilter,
    listTransactionFilter,
    NextToken,
    perPage,
    PreviousTokens,
    TransactionsLoading,
  } = useSelector((state: RootState) => state.transactions)
  const [totalLimitExceededAmount, setTotalLimitExceededAmount] = useState(0) // Initialize the current page
  const [currentPage, setCurrentPage] = useState(1) // Initialize the current page

  const filteredTransactions = allTransactions
    .filter((transaction: any) => {
      // Add your filter condition here
      return true
    })
    .sort((a: any, b: any) => {
      // Extract the timeCreated from either BusinessKyc or IndividualKyc
      const timeCreatedA = a.CreatedAt
      const timeCreatedB = b.CreatedAt

      // Sort based on the extracted timeCreated values
      return new Date(timeCreatedB).getTime() - new Date(timeCreatedA).getTime()
    })

  const handleTransactionFilter = (e: any) => {
    e.preventDefault()
    dispatch(
      setTransactionFilter({
        ...listTransactionFilter,
        [filterBy]: e.target.value,
      })
    )
  }
  const handleFilterByChange = (e: any) => {
    e.preventDefault()
    dispatch(setTransactionFilter({}))
    dispatch(setFilterBy(e.target.value))
  }

  const indexOfLastTransaction = currentPage * perPage
  const indexOfFirstTransaction = indexOfLastTransaction - perPage
  const currentTransactions = filteredTransactions?.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  )

  const loadNext = async () => {
    if (NextToken && !PreviousTokens.includes(NextToken)) {
      dispatch(saveToken([...PreviousTokens, NextToken]))
      fetchData({
        ...listTransactionFilter,
        ...transactionFilter,
        StartDate: threeMonthAgoStartDate,
        NextToken,
      })
    } else {
      console.log(
        "NextToken is already in PreviousTokens. No need to fetch again."
      )
    }
  }

  // Function to handle "Previous" button click
  const loadPrevious = async (index?: number | undefined) => {
    if (index !== undefined && index >= 0 && index < PreviousTokens.length) {
      // Valid index provided
      const previousToken = PreviousTokens[index - 2]
      // Slice tokens array up to the provided index (exclusive)
      dispatch(saveToken(PreviousTokens.slice(0, index)))
      fetchData({
        ...listTransactionFilter,
        ...transactionFilter,
        StartDate: threeMonthAgoStartDate,
        NextToken: previousToken,
      })
    } else {
      // No index or invalid index provided, use default behavior
      const previousToken = PreviousTokens[PreviousTokens.length - 2] // Get the token before the current one
      // Remove the last token (current one) from the tokens array
      dispatch(saveToken(PreviousTokens.slice(0, PreviousTokens.length - 1)))
      fetchData({
        ...listTransactionFilter,
        ...transactionFilter,
        StartDate: threeMonthAgoStartDate,
        NextToken: previousToken,
      })
    }
  }

  const searchApi = () => {
    dispatch(saveToken([]))
    fetchData({
      ...transactionFilter,
      ...listTransactionFilter,
      StartDate: threeMonthAgoStartDate,
    })
  }

  useEffect(() => {
    if (
      listTransactionFilter.TransactionType === TransactionTypeEnum.USD_CREDIT &&
      filteredTransactions[0]?.TransactionState === TransactionStateEnum.FURTHER_REVIEW
    ) {
      const TotalSum = filteredTransactions.reduce((sum, tnx) => {
        return tnx?.TransactionType === TransactionTypeEnum.USD_CREDIT &&
          tnx?.TransactionState === TransactionStateEnum.FURTHER_REVIEW
          ? sum + (Number(tnx?.FromAmount) || 0)
          : sum;
      }, 0);
    
      setTotalLimitExceededAmount(TotalSum);
    }
  }, [
    filteredTransactions,
    listTransactionFilter?.TransactionState,
    listTransactionFilter?.TransactionType,
  ])

  const tableHeader =
    "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  return (
    <>
      <CurrentTransactionModal
        loading={loading}
        refresh={async () => {
           searchApi()
        }}
      />
      {!TransactionsLoading ? (
        <div className="mt-4">
          <ToastContainer />

          <div className="float-left w-full">
            <div className="flex float-left mb-4">
              <label className="text-[13px] text-black m-3 mt-4 float-left">
                Filter By
              </label>
              <div className="float-left">
                <div className="float-left ml-1 flex">
                  <select
                    name="FilterBy"
                    id=""
                    value={filterBy}
                    onChange={handleFilterByChange}
                    className={`text-[14px] text-black border mb-1 py-2 pr-1 outline-none rounded-md h-12 float-left flex`}
                  >
                    {Object.keys(FilterBy).map((key, index) => {
                      if (
                        key === "TransactionState" ||
                        key === "TransactionType"
                      )
                        return null
                      return (
                        <option key={index} value={key}>
                          {key}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div className="float-left ml-1 flex">
                  <input
                    className={`text-[14px] text-[#747A80] ml-1 border mb-1 py-2 pl-2 outline-none rounded-md h-12 flex sm:float-left`}
                    type="text"
                    name="transactionFilter"
                    value={transactionFilter[filterBy]}
                    onChange={handleTransactionFilter}
                    placeholder="Enter Query"
                  />
                </div>
              </div>
            </div>

            <div className="float-left">
              <Button
                text="Scan"
                icon={
                  <BsSearch className="text-[white] text-2sm inline-block m-1" />
                }
                handleClick={() => {
                  dispatch(setTransactionsLoading(true))
                  searchApi()
                }}
                style={`hover:bg-gray-400 px-4 py-3 rounded-md bg-black text-white flex h-12`}
              />
            </div>

            <div className="float-right">
              {listTransactionFilter.TransactionType ===
                TransactionTypeEnum.USD_CREDIT &&
                filteredTransactions[0]?.TransactionState ===
                  TransactionStateEnum.FURTHER_REVIEW && (
                  <div className="flex justify-between p-4 border-b bg-white float-right w-full md:w-auto">
                    <div className="ml-2 mr-auto">
                      Total:&nbsp;
                    </div>
                    <span className="text-[#228B22] text-md font-semibold mr-2 px-2.5 py-0.5">
                      {getCurrencySymbol(
                        filteredTransactions[0]?.FromCurrency! || "USD"
                      )}
                      {totalLimitExceededAmount.toLocaleString("en-US", {
                        style: "decimal",
                      })}
                    </span>
                  </div>
                )}
            </div>
          </div>

          {filteredTransactions.length < 1 ? (
            <PlaceHolder
              text="No transactions, Click on scan to search for transactions"
              buttonAction={async () => searchApi()}
            />
          ) : (
            <>
              <PaginationBar
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                total={filteredTransactions.length}
                firstIndex={indexOfFirstTransaction}
                lastIndex={indexOfLastTransaction}
                loadNext={loadNext}
                loadPrevious={loadPrevious}
                previousTokens={PreviousTokens}
                max={MAX_TRANSACTIONS_LIMIT}
                shouldCount={false}
                hasNextToken={NextToken ? true : false}
              />
              <div className="overflow-x-auto w-full mt-3">
                <table className="table-auto min-w-full divide-y divide-gray-200 ">
                  <thead>
                    <tr className={`border-b border-dark-300 text-left`}>
                      <th className={tableHeader}>TransactionID</th>
                      {/* <th>Account Name</th> */}
                      <th className={tableHeader}>User Email</th>
                      <th className={tableHeader}>Type</th>
                      <th className={tableHeader}>Amount</th>
                      {listTransactionFilter.TransactionType ===
                        TransactionTypeEnum.USD_CREDIT && (
                        <th className={tableHeader}>Deposit Type</th>
                      )}
                      <th className={tableHeader}>State</th>
                      <th className={tableHeader}>CreatedAt</th>
                      <th className={tableHeader}>UpdatedAt</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTransactions.map((item: any, index: any) => {
                      return (
                        <tr
                          key={index}
                          onClick={async () => {
                            try {
                              setLoader(true)
                              dispatch(setIsTransactionOpen(true))
                              const {data: currentTransaction} =
                                await getTransaction(item.TransactionIdentifier)
                              console.log(currentTransaction)
                              if (currentTransaction) {
                                dispatch(
                                  setCurrentTransaction(currentTransaction)
                                )
                                dispatch(setOneTransaction(currentTransaction))
                                setLoader(false)
                              }
                            } catch (err) {
                              const currentTransaction = allTransactions.find(
                                (transaction: any) =>
                                  transaction.TransactionIdentifier ===
                                  item.TransactionIdentifier
                              )
                              toast.error(
                                "An error occured while fetching transaction"
                              )
                              dispatch(
                                setCurrentTransaction(currentTransaction)
                              )
                            }
                          }}
                          className={`border-b border-gray-300`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                            {item.TransactionIdentifier}
                          </td>
                          {/* <td className="py-5 font-light">
                        {item.SenderName}
                    </td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                            {item.UserEmail}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                            {item?.TransactionType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                            <span className="font-bold">
                              {parseFloat(
                                item?.FromAmount! || item?.TotalAmount!
                              ).toLocaleString("en-US", {
                                style: "decimal",
                              })}
                            </span>
                          </td>

                          {listTransactionFilter.TransactionType ===
                            TransactionTypeEnum.USD_CREDIT && (
                            <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                              <div
                                className={`inline-block ${DepositColor(item.DepositType)} text-sm font-medium py-1 px-3 rounded-full`}
                              >
                                {item.DepositType || "N/A"}
                              </div>
                            </td>
                          )}

                          <td className="px-6 py-4 whitespace-nowrap text-md font-bold">
                            <div className={StateColor(item?.TransactionState)}>
                              {item?.TransactionState}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                            {getDateTime(item?.CreatedAt || item?.TimeCreated)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                            {getDateTime(item?.UpdatedAt || item?.TimeUpdated)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  {filteredTransactions.length < 1 ? (
                    <i className="danger">No Transactions</i>
                  ) : null}
                </table>
              </div>
              <PaginationBar
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                total={filteredTransactions.length}
                firstIndex={indexOfFirstTransaction}
                lastIndex={indexOfLastTransaction}
                loadNext={loadNext}
                loadPrevious={loadPrevious}
                previousTokens={PreviousTokens}
                max={MAX_TRANSACTIONS_LIMIT}
                shouldCount={false}
                hasNextToken={NextToken ? true : false}
              />
            </>
          )}
        </div>
      ) : (
        <div className="padding mt-5">Loading transactions...</div>
      )}
    </>
  )
}

export default FurtherReviewTable
