import Button from "../../components/Button"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import {setListTransactionFilter} from "../../redux/slices/TransactionsSlice"
import {TransactionStateEnum, TransactionTypeEnum} from "../../types"
import {threeMonthAgoStartDate} from "../../utils/helper"

interface IProps {
  setLoader?: any
  fetchData?: any
}
const TransactionTabs = ({fetchData, setLoader}: IProps) => {
  const dispatch = useDispatch()
  const {listTransactionFilter, transactionFilter} = useSelector(
    (state: RootState) => state.transactions
  )
  const activeBtn = " hover:bg-gold px-4 rounded-t-md bg-gold float-left "
  const inactiveBtn =
    " hover:bg-gray-100 text-black px-4 rounded-md float-left "

  const SelectTab = (type: TransactionTypeEnum) => {
    setLoader(true)
    const updatedFilter = {
      ...listTransactionFilter,
      TransactionType: type,
      TransactionState:
        listTransactionFilter.TransactionState ===
        TransactionStateEnum.FURTHER_REVIEW
          ? TransactionStateEnum.COMPLETED
          : listTransactionFilter.TransactionState,
      Type: undefined,
    }
    console.log("tab filter:", updatedFilter)

    dispatch(setListTransactionFilter(updatedFilter))

    fetchData({
      ...transactionFilter,
      ...updatedFilter,
    })
  }
  const FurtherReview = () => {
    setLoader(true)
    dispatch(
      setListTransactionFilter({
        ...listTransactionFilter,
        TransactionType: TransactionTypeEnum.USD_CREDIT,
        TransactionState: TransactionStateEnum.FURTHER_REVIEW,
      })
    )
    fetchData({
      ...transactionFilter,
      ...listTransactionFilter,
      TransactionType: TransactionTypeEnum.USD_CREDIT,
      TransactionState: TransactionStateEnum.FURTHER_REVIEW,
      StartDate: threeMonthAgoStartDate,
    })
  }

  return (
    <>
      <div className="overflow-x-auto w-full border-b border-gray-200 z-0">
        <div className="flex h-[60px]" aria-label="Tabs">
          <Button
            text="All"
            handleClick={() => SelectTab(TransactionTypeEnum.ALL)}
            style={
              (listTransactionFilter.TransactionType == TransactionTypeEnum.ALL
                ? activeBtn
                : inactiveBtn) + " mr-3"
            }
          />

          <Button
            text="Transfers"
            handleClick={() => SelectTab(TransactionTypeEnum.MAKE_PAYMENT)}
            style={
              (listTransactionFilter.TransactionType ==
              TransactionTypeEnum.MAKE_PAYMENT
                ? activeBtn
                : inactiveBtn) + " mr-3"
            }
          />

          <Button
            text="USD Credit"
            handleClick={() => SelectTab(TransactionTypeEnum.USD_CREDIT)}
            style={
              (listTransactionFilter.TransactionState !==
                TransactionStateEnum.FURTHER_REVIEW &&
              listTransactionFilter.TransactionType ===
                TransactionTypeEnum.USD_CREDIT
                ? activeBtn
                : inactiveBtn) + " mr-3"
            }
          />

          <Button
            text="C2C Transfer"
            handleClick={() => SelectTab(TransactionTypeEnum.TAG_TRANSFER)}
            style={
              (listTransactionFilter.TransactionType ===
              TransactionTypeEnum.TAG_TRANSFER
                ? activeBtn
                : inactiveBtn) + " mr-3"
            }
          />

          <Button
            text="C2C Credit"
            handleClick={() => SelectTab(TransactionTypeEnum.TAG_CREDIT)}
            style={
              (listTransactionFilter.TransactionType ===
              TransactionTypeEnum.TAG_CREDIT
                ? activeBtn
                : inactiveBtn) + " mr-3"
            }
          />

          <Button
            text="Further Review"
            handleClick={() => FurtherReview()}
            style={
              (listTransactionFilter.TransactionState ===
                TransactionStateEnum.FURTHER_REVIEW &&
              listTransactionFilter.TransactionType ===
                TransactionTypeEnum.USD_CREDIT
                ? activeBtn
                : inactiveBtn) + " mr-3"
            }
          />

          <Button
            text="NGN Credit"
            handleClick={() => SelectTab(TransactionTypeEnum.NGN_CREDIT)}
            style={
              (listTransactionFilter.TransactionType ===
              TransactionTypeEnum.NGN_CREDIT
                ? activeBtn
                : inactiveBtn) + " mr-3"
            }
          />

          <Button
            text="Currency Conversion"
            handleClick={() => SelectTab(TransactionTypeEnum.CONVERT_CURRENCY)}
            style={
              (listTransactionFilter.TransactionType ===
              TransactionTypeEnum.CONVERT_CURRENCY
                ? activeBtn
                : inactiveBtn) + " mr-3"
            }
          />

          {/* <Button
            iconLeft={true}
            icon={
              <BsRepeat className="text-[black] text-2xl inline-block mr-3" />
            }
            text="Refresh"
            handleClick={() => {
              fetchData({ ...listTransactionFilter });
            }}
            style="text-sm pull-right px-4 rounded-[5px] border border-black text-black"
          /> */}
        </div>
      </div>
    </>
  )
}

export default TransactionTabs
