import Button from "../../components/Button"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import {setListTransactionFilter} from "../../redux/slices/TransactionsSlice"
import {TransactionStateEnum, TransactionTypeEnum} from "../../types"

interface IProps {
  setLoader?: any
  fetchData?: any
}
const TransactionTabs = ({fetchData, setLoader}: IProps) => {
  const dispatch = useDispatch()
  const {listTransactionFilter, transactionFilter} = useSelector(
    (state: RootState) => state.transactions
  )
  const activeBtn = " hover:bg-renegan-purple px-4 rounded-t-md bg-renegan-purple text-white float-left "
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
            text="Deposits"
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
        </div>
      </div>
    </>
  )
}

export default TransactionTabs
