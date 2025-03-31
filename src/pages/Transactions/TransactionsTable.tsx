/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import {ToastContainer, toast} from "react-toastify"
import {getTransaction} from "../../apiV1"
import {
  setCurrentTransaction,
  setOneTransaction,
  setIsTransactionOpen,
  setFilterBy,
  setListTransactionFilter,
  setTransactionFilter,
  saveToken,
  setTransactionsLoading,
} from "../../redux/slices/TransactionsSlice"
import Button from "../../components/Button"
import {getDateTime} from "../../components/DateReader"
import {getCurrencySymbol, StateColor} from "../../utils/helper"
import {BsSearch} from "react-icons/bs"
import {FilterBy, TransactionStateEnum, TransactionTypeEnum} from "../../types"
import PaginationBar from "../../components/PaginationBar"
import {DepositColor} from "../../utils/helper"
import {MAX_TRANSACTIONS_LIMIT} from "../../constants"
import PlaceHolder from "../../components/PlaceHolder"
import CurrentTransactionModal from "./CurrentTransactionModal"
import DownloadCSVButton from "./buttons/DownladCSVButton"

interface IProps {
  setLoader?: any
  fetchData?: any
  loading?: boolean
}
const TransactionTable = ({fetchData, setLoader, loading}: IProps) => {
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
  const dateInputRef = useRef<HTMLInputElement | null>(null)
  const [totalLimitExceededAmount, setTotalLimitExceededAmount] = useState(0) // Initialize the current page
  const [currentPage, setCurrentPage] = useState(1) // Initialize the current page
  const [depositVersionFilter, setDepositVersionFilter] = useState("ALL")

  const filteredTransactions = allTransactions
    .filter((transaction: any) => {
      // Add your filter condition here
      if (listTransactionFilter.TransactionState === "IN_REVIEW") {
        if (depositVersionFilter === "V4") {
          return transaction.TransactionType === "USD_CREDIT" && 
                 transaction.DepositType === "WIRE" && 
                 transaction.TransactionState === "IN_REVIEW";
        } else if (depositVersionFilter === "V3") {
          return transaction.TransactionType === "USD_CREDIT" && 
                 transaction.DepositType === "ACH" && 
                 transaction.TransactionState === "IN_REVIEW";
        }
      }
      return true;
    })
    .sort((a: any, b: any) => {
      // Extract the timeCreated from either BusinessKyc or IndividualKyc
      const timeCreatedA = a.CreatedAt
      const timeCreatedB = b.CreatedAt

      // Sort based on the extracted timeCreated values
      return new Date(timeCreatedB).getTime() - new Date(timeCreatedA).getTime()
    })

  const handleTransactionStateFilter = (e: any) => {
    e.preventDefault()
    const updatedFilter = {
      ...listTransactionFilter,
      TransactionState: e.target.value,
    }
    console.log("state filter:", updatedFilter)
    dispatch(setListTransactionFilter(updatedFilter))

  }

  const handleConversionTypeFilter = (e: any) => {
    e.preventDefault()
    dispatch(
      setListTransactionFilter({
        ...listTransactionFilter,
        Type: e.target.value,
      })
    )
  }

  const handleTransactionFilter = (e: any) => {
    e.preventDefault()
    dispatch(
      setTransactionFilter({
        ...listTransactionFilter,
        [filterBy]: e.target.value.replace(/\s+/g, "").toLowerCase(),
      })
    )
  }
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(
      setListTransactionFilter({
        ...listTransactionFilter,
        StartDate: e.target.value,
      })
    )
  }
  const toLocalDateString = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 24-hour format by setting to false
    })
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
    dispatch(setTransactionsLoading(true))
    if (NextToken && !PreviousTokens.includes(NextToken)) {
      dispatch(saveToken([...PreviousTokens, NextToken]))
      await fetchData({...listTransactionFilter, ...transactionFilter, NextToken})
      setCurrentPage(1);
    } else {
      console.log(
        "NextToken is already in PreviousTokens. No need to fetch again."
      )
    }
  }

  // Function to handle "Previous" button click
  const loadPrevious = async (index?: number | undefined) => {
    dispatch(setTransactionsLoading(true))
    if (index !== undefined && index >= 0 && index < PreviousTokens.length) {
      // Valid index provided
      const previousToken = PreviousTokens[index - 2]
      // Slice tokens array up to the provided index (exclusive)
      dispatch(saveToken(PreviousTokens.slice(0, index)))
      await fetchData({
        ...listTransactionFilter,
        ...transactionFilter,
        NextToken: previousToken,
      });
      setCurrentPage(1);
    } else {
      // No index or invalid index provided, use default behavior
      const previousToken = PreviousTokens[PreviousTokens.length - 2] // Get the token before the current one
      // Remove the last token (current one) from the tokens array
      dispatch(saveToken(PreviousTokens.slice(0, PreviousTokens.length - 1)))
      await fetchData({
        ...transactionFilter,
        ...listTransactionFilter,
        NextToken: previousToken,
      });
      setCurrentPage(1);
    }
  }

  const queryList = async() => {
    dispatch(saveToken([]));
    await fetchData({
      ...transactionFilter,
      ...listTransactionFilter
    });
  }

  useEffect(() => {
    if (
      listTransactionFilter.TransactionType ===
        TransactionTypeEnum.USD_CREDIT &&
      filteredTransactions[0]?.TransactionState ===
        TransactionStateEnum.DAILY_LIMIT_EXCEEDED
    ) {
      const TotalSum = filteredTransactions.reduce((sum, tnx) => {
        if (
          tnx?.TransactionType === TransactionTypeEnum.USD_CREDIT &&
          tnx?.TransactionState === TransactionStateEnum.DAILY_LIMIT_EXCEEDED
        ) {
          return sum + (Number(tnx?.FromAmount) || 0)
        }
        return sum
      }, 0)

      setTotalLimitExceededAmount(TotalSum)
    }
  }, [
    filteredTransactions,
    listTransactionFilter.TransactionState,
    listTransactionFilter.TransactionType,
  ])

  useEffect(() => { 
    setCurrentPage(1);
  }, [TransactionsLoading])

  const tableHeader =
    "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  return (
    <>
      <CurrentTransactionModal
        loading={loading}
        refresh={async () => {
          queryList()
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

            <div className="flex float-left mr-3">
              <div className="flex float-left ml-1">
                <label className="text-[13px] text-black m-3 mt-4">State</label>
                <select
                  name="TransactionState"
                  id="TransactionState"
                  value={listTransactionFilter?.TransactionState}
                  onChange={handleTransactionStateFilter}
                  className={`text-[14px] w-auto text-[#747A80] border mb-1 py-2 pl-2 mr-2 outline-none rounded-md h-12`}
                >
                  <option value="">ALL</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="IN_TRANSIT">IN_TRANSIT</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="FAILED">FAILED</option>
                  <option value="DAILY_LIMIT_EXCEEDED">
                    DAILY_LIMIT_EXCEEDED
                  </option>
                  <option value="WEEKLY_LIMIT_EXCEEDED">
                    WEEKLY_LIMIT_EXCEEDED
                  </option>
                  <option value="DELAYED">DELAYED</option>
                  <option value="KYC_PENDING">KYC_PENDING</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="MONTHLY_LIMIT_EXCEEDED">
                    MONTHLY_LIMIT_EXCEEDED
                  </option>
                  <option value="REVERSED">REVERSED</option>
                  <option value="IN_REVIEW">IN_REVIEW</option>
                  <option value="FURTHER_REVIEW">FURTHER_REVIEW</option>
                  <option value="FLAGGED">FLAGGED</option>
                  <option value="PASSED_REVIEW">PASSED_REVIEW</option>
                  <option value="FAILED_REVIEW">FAILED_REVIEW</option>
                  <option value="AMOUNT_TOO_LOW">AMOUNT_TOO_LOW</option>
                  <option value="RETURNED">RETURNED</option>
                </select>
              </div>

              <div className="float-left">
                <Button
                  text="Scan"
                  icon={
                    <BsSearch className="text-[white] text-2sm inline-block m-1" />
                  }
                  handleClick={async () => {
                    dispatch(setTransactionsLoading(true));
                    await queryList();
                  }}
                  style={`hover:bg-gray-400 px-4 py-3 rounded-md bg-black text-white flex h-12`}
                />
              </div>
            </div>

            {listTransactionFilter.TransactionType ==
              TransactionTypeEnum.CONVERT_CURRENCY && (
              <div className="flex float-left ml-1">
                <label className="text-[13px] text-black m-3 mt-4">
                  Type
                </label>
                <select
                  name="TransactionState"
                  id="TransactionState"
                  value={listTransactionFilter?.Type}
                  onChange={handleConversionTypeFilter}
                  className={`text-[14px] w-auto text-[#747A80] border mb-1 py-2 pl-2 mr-2 outline-none rounded-md h-12`}
                >
                  <option value="">ALL</option>
                  <option value="DEBIT">DEBIT</option>
                  <option value="CREDIT">CREDIT</option>
                </select>
              </div>
            )}
          </div>
          <br />

          <div className="w-full mb-4 mt-5">
            <div className="flex float-left mr-3">
              <label
              htmlFor="StartDate"
              className="text-[13px] text-black m-3 mt-4"
              >
              From
              </label>
              &nbsp;
              <input
              className={`text-[14px] text-[#747A80] border mb-1 outline-none rounded-md h-12 ${transactionFilter[filterBy] ? 'bg-gray-200 cursor-not-allowed text-grey' : ''}`}
              type="date"
              ref={dateInputRef}
              value={listTransactionFilter?.StartDate}
              onChange={handleDateChange}
              placeholder="MM-DD-YYYY"
              title={toLocalDateString(listTransactionFilter?.StartDate!)}
              disabled={!!transactionFilter[filterBy]}
              />
              &nbsp; &nbsp;
            </div>

            {listTransactionFilter.TransactionState === "IN_REVIEW" && (
              <div className="flex float-left ml-1">
                <label className="text-[13px] text-black m-3 mt-4">Provider Version</label>
                <select
                  name="DepositVersion"
                  id="DepositVersion"
                  value={depositVersionFilter}
                  onChange={(e) => setDepositVersionFilter(e.target.value)}
                  className={`text-[14px] w-auto text-[#747A80] border mb-1 py-2 pl-2 mr-2 outline-none rounded-md h-12`}
                >
                  <option value="ALL">ALL</option>
                  <option value="V4">V4 Deposits</option>
                  <option value="V3">V3 Deposits</option>
                </select>
              </div>
            )}
          </div>

          {listTransactionFilter.TransactionType ===
            TransactionTypeEnum.USD_CREDIT &&
            filteredTransactions[0]?.TransactionState ===
              TransactionStateEnum.DAILY_LIMIT_EXCEEDED && (
              <div className="flex justify-between p-4 border-b bg-white float-right w-full md:w-auto">
                <div className="ml-2 mr-auto">Total:&nbsp;</div>
                <span className="text-[#228B22] text-md font-semibold mr-2 px-2.5 py-0.5">
                  $
                  {totalLimitExceededAmount.toLocaleString("en-US", {
                    style: "decimal",
                  })}
                </span>
              </div>
            )}

          {filteredTransactions.length < 1 ? (
            <PlaceHolder
              text="No transactions, Click on scan to search for transactions"
              buttonAction={async () =>  {
                dispatch(setTransactionsLoading(true))
                queryList()
              }  
              }
            />
          ) : (
            <>
              {listTransactionFilter.TransactionState ===
                TransactionStateEnum.FLAGGED &&
                filteredTransactions[0]?.TransactionState ===
                  TransactionStateEnum.FLAGGED && (
                  <div className="w-full mb-4 mt-5">
                    <DownloadCSVButton
                      Transactions={filteredTransactions}
                      title="Flagged Transactions"
                      text="Download CSV"
                    />
                  </div>
                )}
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
                      <th className={tableHeader}>User Email</th>
                      <th className={tableHeader}>Type</th>
                      <th className={tableHeader}>Amount</th>
                      {listTransactionFilter.TransactionType ===
                        TransactionTypeEnum.USD_CREDIT && (
                        <>
                          <th className={tableHeader}>Deposit Type</th>
                          <th className={tableHeader}>Provider Version</th>
                        </>
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
                          <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                            {item.UserEmail}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                            {item?.TransactionType === "CONVERT_CURRENCY"
                              ? "CONVERSION_"+item?.Type
                              : item?.TransactionType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                            <span className="font-bold">
                              {getCurrencySymbol(item?.Currency)}
                              {parseFloat(
                                item?.FromAmount! || item?.TotalAmount!
                              ).toLocaleString("en-US", {
                                style: "decimal",
                              })}
                            </span>
                          </td>

                          {listTransactionFilter.TransactionType ===
                            TransactionTypeEnum.USD_CREDIT && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                                <div
                                  className={`inline-block ${DepositColor(item.DepositType)} text-sm font-medium py-1 px-3 rounded-full`}
                                >
                                  {item.DepositType || "N/A"}
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-md font-light">
                                <div
                                  className={`inline-block text-sm font-medium py-1 px-3 rounded-full`}
                                >
                                  {item.ProviderVersion || "N/A"}
                                </div>
                              </td>
                            </>
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

export default TransactionTable
