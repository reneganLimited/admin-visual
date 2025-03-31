/* eslint-disable jsx-a11y/anchor-is-valid */
import Modal from "../../components/Modal"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import {
  setCurrentTransaction,
  setIsTransactionOpen,
  setIsNoteOpen,
  setOneTransaction,
} from "../../redux/slices/TransactionsSlice"
import {getAddress} from "../../constants"
import {
  StateColor,
  DepositColor,
  CountryFlag,
  getCurrencySymbol,
} from "../../utils/helper"
import {useEffect, useState} from "react"
import {FiArrowDownCircle, FiArrowUpCircle} from "react-icons/fi"
import TransactionTimeline from "./TransactionTimeline"
import {
  RecipientType,
  TransactionStateEnum,
  TransactionTypeEnum,
} from "../../types"
import Copy from "../../components/Copy"
import NoteModal from "./NoteModal"
import TransactionButtons from "./TransactionButtons"
import {getTransaction} from "../../apiV1"
interface IProps {
  loading?: any
  refresh?: () => void
}

const CurrentTransactionModal = ({loading, refresh}: IProps) => {
  const dispatch = useDispatch()
  const [vendor, setVendor] = useState("")
  const [vendorType, setVendorType] = useState("MakePayment")
  const currentTransaction = useSelector(
    (state: RootState) => state.transactions.currentTransaction
  )
  const {
    isTransactionOpen,
    isNoteOpen,
    oneTransaction,
  }: {isTransactionOpen: boolean; isNoteOpen: boolean; oneTransaction: any} =
    useSelector((state: RootState) => state.transactions)
  const pStyle = "mb-3 text-md w-full"

  const goToNotes = () => {
    dispatch(setIsNoteOpen(true))
  }

  useEffect(() => {
    if (oneTransaction?.AdditionalDetails?.Vendors) {
      setVendor(Object.keys(oneTransaction?.AdditionalDetails?.Vendors!)[0])
      if (oneTransaction?.TransactionType === "CONVERT_CURRENCY") {
        setVendorType("Conversion")
      } else if (oneTransaction?.TransactionType === "NGN_CREDIT") {
        setVendorType("NgnCredit")
      } else {
        setVendorType("MakePayment")
      }
    }
  }, [currentTransaction])

  const RequiredTypeForNotes = [
    TransactionTypeEnum.USD_CREDIT,
    TransactionTypeEnum.USD_DEBIT,
  ]
  const RequiredNoteStates = [
    TransactionStateEnum.IN_REVIEW,
    TransactionStateEnum.FURTHER_REVIEW,
    TransactionStateEnum.FLAGGED,
    TransactionStateEnum.DAILY_LIMIT_EXCEEDED,
    TransactionStateEnum.WEEKLY_LIMIT_EXCEEDED,
    TransactionStateEnum.MONTHLY_LIMIT_EXCEEDED,
    TransactionStateEnum.RETURNED,
    TransactionStateEnum.REJECTED,
  ]

  const fetch_transaction = async () => {
    const {data: currentTransaction} = await getTransaction(
      oneTransaction.TransactionIdentifier
    )
    console.log(currentTransaction)
    if (currentTransaction) {
      dispatch(setCurrentTransaction(currentTransaction))
      dispatch(setOneTransaction(currentTransaction))
    }
  }

  return (
    <>
      <Modal
        isOpen={isTransactionOpen}
        title="Transaction"
        closeModal={() => {
          dispatch(setIsTransactionOpen(false))
          dispatch(setCurrentTransaction(undefined))
        }}
      >
        <NoteModal
          refresh={() => {
            refresh && refresh()
            fetch_transaction()
          }}
          isModalOpen={isNoteOpen}
          setIsConfirmOpen={(state: boolean) => dispatch(setIsNoteOpen(state))}
        />

        <div className="flex justify-center flex-col">
          {loading && "Please wait..."}
          {!loading && currentTransaction && (
            <div className="mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col p-4">
                  <p className={pStyle}>
                    Transaction ID <br />
                    <span className="font-bold text-darkgold">
                      {oneTransaction?.TransactionIdentifier}
                      <Copy text={oneTransaction?.TransactionIdentifier} />
                    </span>
                  </p>
                  <p className={pStyle}>
                    UserID <br />
                    <span className="font-bold text-darkgold">
                      {oneTransaction?.UserID}
                      <Copy text={oneTransaction?.UserID} />
                    </span>
                  </p>

                  {oneTransaction.UserEmail && (
                    <p className={pStyle}>
                      User Email <br />
                      <span className="font-bold text-darkgold break-words">
                        {oneTransaction?.UserEmail}{" "}
                        <Copy text={oneTransaction?.UserEmail} />
                      </span>
                    </p>
                  )}

                </div>
                <div className="flex flex-col p-4">
                  <p className={pStyle}>
                    Transaction Domain <br />
                    <span className="font-bold text-darkgold">
                      {oneTransaction?.TransactionDetail?.TransactionDomain}
                    </span>
                  </p>

                  <p className={pStyle}>
                    Transaction Type <br />
                    <span className="font-bold text-darkgold">
                      <CountryFlag
                        className="float-left"
                        country={
                          oneTransaction?.TransactionDetail?.Recipient?.Country!
                        }
                        currency={
                          oneTransaction?.Currency! ||
                          oneTransaction?.TransactionDetail?.FromCurrency!
                        }
                      />
                      {oneTransaction?.TransactionType}
                    </span>
                  </p>

                  {oneTransaction.TransactionType === "CONVERT_CURRENCY" &&
                    oneTransaction?.Type && (
                      <p className={pStyle}>
                        Conversion Type <br />
                        <span className="font-bold text-darkgold">
                          {oneTransaction?.Type === "DEBIT" ? (
                            <FiArrowDownCircle className="float-left mt-1 mr-2 text-red-500" />
                          ) : (
                            <FiArrowUpCircle className="float-left mt-1 mr-2 text-green-500" />
                          )}
                          {oneTransaction?.Type}
                        </span>
                      </p>
                    )}

                  {RequiredTypeForNotes.includes(
                    oneTransaction?.TransactionType
                  ) && (
                    <div className="mt-2 mb-6">
                      {oneTransaction?.AdditionalDetails?.Notes?.length ? (
                        <a
                          className={"w-auto float-left link"}
                          onClick={goToNotes}
                        >
                          {RequiredNoteStates.includes(
                            oneTransaction?.TransactionState
                          )
                            ? "+ Add Notes"
                            : "View Notes"}{" "}
                          ({currentTransaction.AdditionalDetails.Notes.length})
                        </a>
                      ) : RequiredNoteStates.includes(
                          oneTransaction?.TransactionState
                        ) ? (
                        <a
                          className="w-auto float-left link"
                          onClick={goToNotes}
                        >
                          + Add Notes
                        </a>
                      ) : (
                        <p className="text-gray-500 italic">
                          No notes available
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <small>Transaction Details</small>
              <fieldset className={"border border-[1px] p-3 border-black mb-5"}>
                {(oneTransaction?.TransactionType === "MAKE_PAYMENT" ||
                  oneTransaction?.TransactionDetail?.Description ===
                    "ach_credit_transfer") && (
                  <p className={pStyle}>
                    {oneTransaction?.TransactionType === "MAKE_PAYMENT"
                      ? "Sender Name"
                      : "Account Name"}
                    : &nbsp;
                    <span className="font-bold text-darkgold">
                      {`${oneTransaction?.SenderName || ""}`}
                    </span>
                  </p>
                )}
                {(oneTransaction?.TransactionType === "USD_CREDIT" ||
                  oneTransaction?.TransactionType === "NGN_CREDIT") &&
                  oneTransaction?.TransactionDetail?.Description !==
                    "ach_credit_transfer" && (
                    <p className={pStyle}>
                      Sender Name: &nbsp;
                      <span className="font-bold text-darkgold">
                        {oneTransaction?.TransactionDetail?.Description !==
                        "ach_credit_transfer"
                          ? `${oneTransaction?.ProviderSenderName || oneTransaction?.ProviderOriginatorName || oneTransaction?.SenderName || "--"}`
                          : "N/A"}
                      </span>
                    </p>
                  )}

                {oneTransaction?.TransactionDetail?.Sender?.BankName && (
                  <p className={pStyle}>
                    Sender Bank: &nbsp;
                    <span className="font-bold text-darkgold">
                      {oneTransaction?.TransactionDetail?.Sender?.BankName ||
                        "N/A"}
                    </span>
                  </p>
                )}

                {oneTransaction?.TransactionType === "USD_CREDIT" &&
                  oneTransaction?.TransactionDetail?.Recipient.BankName.toLowerCase().includes(
                    "lead"
                  ) && (
                    <p className={pStyle}>
                      Beneficiary Name: &nbsp;
                      <span className="font-bold text-darkgold">
                        {oneTransaction?.ProviderBankBeneficiaryName
                          ? `${oneTransaction?.ProviderBankBeneficiaryName || "--"}`
                          : "N/A"}
                      </span>
                    </p>
                  )}

                {oneTransaction?.TransactionType === "USD_CREDIT" &&
                  oneTransaction?.TransactionDetail?.Recipient?.FullName
                    ?.FirstName &&
                  oneTransaction?.TransactionDetail?.Description !==
                    "ach_credit_transfer" && (
                    <>
                      <p className={pStyle}>
                        Account Name: &nbsp;
                        <span className="font-bold text-darkgold">
                          {`${oneTransaction?.TransactionDetail?.Recipient?.FullName?.FirstName || ""} ${oneTransaction?.TransactionDetail?.Recipient?.FullName?.MiddleName || ""} ${oneTransaction?.TransactionDetail?.Recipient?.FullName?.LastName || ""}`}
                        </span>
                      </p>
                      <hr />
                    </>
                  )}

                {oneTransaction?.TransactionType === "NGN_CREDIT" &&
                  oneTransaction?.RecipientName && (
                    <>
                      <p className={pStyle}>
                        Account Name: &nbsp;
                        <span className="font-bold text-darkgold">
                          {`${oneTransaction?.RecipientName || ""}`}
                        </span>
                      </p>
                      <hr />
                    </>
                  )}

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2 w-full"> */}
                <div className="flex flex-col">
                  <p className={pStyle}>
                    <div className="float-left">
                      {" "}
                      {oneTransaction?.TransactionType === "MAKE_PAYMENT" &&
                        "Sent"}{" "}
                      {oneTransaction?.TransactionType === "CONVERT_CURRENCY" &&
                        "From"}{" "}
                      Currency: &nbsp;
                    </div>
                    <span className="font-bold text-darkgold">
                      <CountryFlag
                        className="float-left"
                        currency={
                          oneTransaction?.TransactionDetail?.FromCurrency!
                        }
                      />
                      {oneTransaction?.TransactionDetail?.FromCurrency}
                    </span>
                  </p>

                  {oneTransaction?.TransactionType === "CONVERT_CURRENCY" && (
                    <>
                      <p className={pStyle}>
                        From Amount: &nbsp;
                        <span className="font-bold text-darkgold">
                          {getCurrencySymbol(
                            oneTransaction?.TransactionDetail?.FromCurrency
                          )}
                          {parseFloat(
                            oneTransaction?.TransactionDetail?.FromAmount
                          ).toLocaleString("en-US", {style: "decimal"})}
                        </span>
                      </p>
                    </>
                  )}

                  {(oneTransaction?.TransactionType === "MAKE_PAYMENT" ||
                    oneTransaction?.TransactionType === "CONVERT_CURRENCY") && (
                    <>
                      <p className={pStyle}>
                        <div className="float-left">
                          Converted Currency: &nbsp;
                        </div>
                        <span className="font-bold text-darkgold">
                          <CountryFlag
                            className="float-left"
                            country={
                              oneTransaction?.TransactionDetail?.Recipient
                                ?.Country!
                            }
                            currency={
                              oneTransaction?.TransactionDetail?.ToCurrency!
                            }
                          />
                          {oneTransaction?.TransactionDetail?.ToCurrency}
                        </span>
                      </p>
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  {oneTransaction?.TransactionType !== "CARD_CREATION" &&
                    oneTransaction?.TransactionType !== "CONVERT_CURRENCY" && (
                      <>
                        <p className={pStyle}>
                          {oneTransaction?.TransactionType === "MAKE_PAYMENT" &&
                            "Sent"}{" "}
                          Total Amount: &nbsp;
                          <span className="font-bold text-darkgold">
                            {getCurrencySymbol(
                              oneTransaction?.TransactionDetail?.FromCurrency
                            )}
                            {parseFloat(
                              oneTransaction?.TotalAmount!
                            ).toLocaleString("en-US", {style: "decimal"}) ||
                              oneTransaction?.TransactionDetail?.FromAmount.toLocaleString(
                                "en-US",
                                {
                                  style: "decimal",
                                }
                              )}
                          </span>
                        </p>
                      </>
                    )}

                  {oneTransaction?.TransactionType !== "CARD_CREATION" &&
                    oneTransaction?.TransactionType !== "CONVERT_CURRENCY" && (
                      <>
                        <p className={pStyle}>
                          {oneTransaction?.TransactionType === "MAKE_PAYMENT" &&
                            "Sent"}{" "}
                          Net Amount: &nbsp;
                          <span className="font-bold text-darkgold">
                            {getCurrencySymbol(
                              oneTransaction?.TransactionDetail?.FromCurrency
                            )}
                            {parseFloat(
                              oneTransaction?.TransactionDetail?.FromAmount!
                            ).toLocaleString("en-US", {style: "decimal"}) ||
                              oneTransaction?.TotalAmount.toLocaleString(
                                "en-US",
                                {
                                  style: "decimal",
                                }
                              )}
                          </span>
                        </p>
                      </>
                    )}

                  {(oneTransaction?.TransactionType === "MAKE_PAYMENT" ||
                    oneTransaction?.TransactionType === "CONVERT_CURRENCY") && (
                    <>
                      <p className={pStyle}>
                        Converted Amount: &nbsp;
                        <span className="font-bold text-darkgold">
                          {getCurrencySymbol(
                            oneTransaction?.TransactionDetail?.ToCurrency
                          )}
                          {parseFloat(
                            oneTransaction?.TransactionDetail?.ToAmount
                          ).toLocaleString("en-US", {style: "decimal"})}
                        </span>
                      </p>
                    </>
                  )}

                  {oneTransaction?.DepositType && (
                    <>
                      <p className={pStyle}>
                        Deposit Type: &nbsp;
                        <div
                          className={`inline-block ${DepositColor(oneTransaction?.DepositType)} text-sm font-medium py-1 px-3 rounded-full`}
                        >
                          {oneTransaction?.DepositType}
                        </div>
                      </p>
                    </>
                  )}

                  <p className={pStyle}>
                    Fee: &nbsp;
                    <span className="font-bold text-darkgold">
                      {getCurrencySymbol(
                        oneTransaction?.TransactionDetail?.FromCurrency
                      )}
                      {parseFloat(
                        oneTransaction?.TransactionDetail?.Fee!
                      ).toLocaleString("en-US", {style: "decimal"}) || 0}
                    </span>
                  </p>

                  {oneTransaction?.TransactionDetail?.WaivedFee && (
                    <p className={pStyle}>
                      Waived Fee: &nbsp;
                      <span className="font-bold text-red">
                        -{" "}
                        {getCurrencySymbol(
                          oneTransaction?.TransactionDetail?.FromCurrency
                        )}
                        {parseFloat(
                          oneTransaction?.TransactionDetail?.WaivedFee!
                        ).toLocaleString("en-US", {style: "decimal"}) || 0}
                      </span>
                    </p>
                  )}

                  {oneTransaction?.TransactionDetail?.PromisedRate &&
                    (oneTransaction?.TransactionType ===
                      TransactionTypeEnum.MAKE_PAYMENT ||
                      oneTransaction?.TransactionType ===
                        TransactionTypeEnum.CONVERT_CURRENCY) && (
                      <>
                        <p className={pStyle}>
                          Exchange Rate: &nbsp;
                          <span className="font-bold text-darkgold">
                            {getCurrencySymbol(
                              oneTransaction?.TransactionDetail?.FromCurrency
                            )}
                            {parseFloat(
                              oneTransaction?.TransactionDetail?.PromisedRate
                                ?.FromCurrency
                            ).toLocaleString("en-US", {style: "decimal"})}
                            &nbsp;/&nbsp;
                            {getCurrencySymbol(
                              oneTransaction?.TransactionDetail?.ToCurrency
                            )}
                            {parseFloat(
                              oneTransaction?.TransactionDetail?.PromisedRate
                                ?.ToCurrency
                            ).toLocaleString("en-US", {style: "decimal"})}
                          </span>
                        </p>
                      </>
                    )}
                </div>
                {/* </div> */}

                <hr />
                <p className={pStyle}>
                  Description: &nbsp;
                  <span className="font-bold text-darkgold">
                    {oneTransaction?.TransactionDetail?.Description || "--"}
                  </span>
                </p>
              </fieldset>
              {oneTransaction?.AdditionalDetails?.Vendors &&
                Object.keys(oneTransaction?.AdditionalDetails?.Vendors).length >
                  0 && (
                  <>
                    <small>Vendor Details</small>
                    <fieldset
                      className={"border border-[1px] p-3 border-orange mb-5"}
                    >
                      <p className={pStyle}>
                        Vendor name <br />
                        <span className="font-bold text-darkgold">
                          {vendor}
                        </span>
                      </p>

                      <hr />

                      <p className={pStyle}>
                        Vendor Transaction Type <br />
                        <span className="font-bold text-darkgold">
                          {vendorType}
                        </span>
                      </p>
                      <hr />

                      <p className={pStyle}>
                        Vendor ID <br />
                        <span className="font-bold text-darkgold">
                          {oneTransaction?.AdditionalDetails?.Vendors?.[
                            vendor
                          ]?.[vendorType]?.VendorTransactionID ||
                            "NOT AVAILABLE"}
                        </span>
                      </p>

                      <hr />

                      <p className={pStyle}>
                        Session ID <br />
                        <span className="font-bold text-darkgold">
                          {oneTransaction?.AdditionalDetails?.Vendors?.[
                            vendor
                          ]?.[vendorType]?.SessionID || "NOT AVAILABLE"}
                        </span>
                      </p>

                      <hr />

                      <p className={pStyle}>
                        Transaction Status <br />
                        <span
                          className={`font-bold  ${StateColor(
                            oneTransaction?.AdditionalDetails?.Vendors?.[
                              vendor
                            ]?.[vendorType]?.Status
                          )}`}
                        >
                          {oneTransaction?.AdditionalDetails?.Vendors?.[
                            vendor
                          ]?.[vendorType]?.Status || "--"}
                        </span>
                      </p>
                    </fieldset>
                  </>
                )}

              {oneTransaction?.ProviderCustomerId && (
                <>
                  <small>Provider Details</small>
                  <fieldset
                    className={"border border-[1px] p-3 border-orange mb-5"}
                  >
                    <p className={pStyle}>
                      Customer ID <br />
                      <span className="font-bold text-darkgold">
                        {oneTransaction?.ProviderCustomerId}
                      </span>
                    </p>

                    <hr />

                    <p className={pStyle}>
                      Transaction ID <br />
                      <span className="font-bold text-darkgold">
                        {oneTransaction?.ProviderTransactionId}
                      </span>
                    </p>

                    <hr />

                    <p className={pStyle}>
                      Deposit ID <br />
                      <span className="font-bold text-darkgold">
                        {oneTransaction?.ProviderDepositId}
                      </span>
                    </p>
                  </fieldset>
                </>
              )}

              {oneTransaction?.TransactionType === "TAG_CREDIT" &&
                oneTransaction?.TransactionDetail?.Sender?.UserID && (
                  <div>
                    <small>Sender Details</small>
                    <fieldset
                      className={"border border-[1px] p-3 border-black mb-5"}
                    >
                      <p className={pStyle}>
                        Sender Name: &nbsp;
                        <span className="font-bold text-darkgold">
                          {oneTransaction?.TransactionDetail?.Description !==
                          "ach_credit_transfer"
                            ? `${oneTransaction?.TransactionDetail?.Sender?.FullName?.FirstName || ""} 
                          ${oneTransaction?.TransactionDetail?.Sender?.FullName?.MiddleName || ""} 
                          ${oneTransaction?.TransactionDetail?.Sender?.FullName?.LastName || ""}`
                            : "N/A"}
                        </span>
                      </p>

                      {oneTransaction?.TransactionDetail?.Sender?.Email && (
                        <>
                          <p className={pStyle}>
                            Email: &nbsp;
                            <span className="font-bold text-darkgold">
                              {oneTransaction?.TransactionDetail?.Sender?.Email}

                              <Copy
                                text={
                                  oneTransaction?.TransactionDetail?.Sender
                                    ?.Email
                                }
                              />
                            </span>
                          </p>
                        </>
                      )}

                      {oneTransaction?.TransactionDetail?.Sender?.Tag && (
                        <p className={pStyle}>
                          Tag: &nbsp;
                          <span className="font-bold text-darkgold">
                            @{oneTransaction?.TransactionDetail?.Sender?.Tag}
                          </span>
                        </p>
                      )}
                    </fieldset>
                  </div>
                )}
              {oneTransaction?.TransactionType !== "TAG_CREDIT" &&
                oneTransaction?.TransactionDetail?.Recipient
                  ?.RecipientIdentifier && (
                  <div>
                    <p></p>

                    <small>Recipient Details</small>
                    <fieldset
                      className={"border border-[1px] p-3 border-black mb-5"}
                    >
                      {oneTransaction?.RecipientName ? (
                        <p className={pStyle}>
                          Account Name: &nbsp;
                          <span className="font-bold text-darkgold">
                            {`${oneTransaction?.RecipientName || ""}`}
                          </span>
                        </p>
                      ) : oneTransaction?.TransactionDetail?.Recipient ? (
                        <p className={pStyle}>
                          Account Name: &nbsp;
                          <span className="font-bold text-darkgold">
                            {`${oneTransaction?.TransactionDetail?.Recipient?.FullName?.FirstName || ""} 
                            ${oneTransaction?.TransactionDetail?.Recipient?.FullName?.MiddleName || ""} 
                            ${oneTransaction?.TransactionDetail?.Recipient?.FullName?.LastName || ""}`}
                          </span>
                        </p>
                      ) : null}

                      {oneTransaction?.TransactionDetail?.Recipient?.Email && (
                        <>
                          <p className={pStyle}>
                            Email: &nbsp;
                            <span className="font-bold text-darkgold">
                              {
                                oneTransaction?.TransactionDetail?.Recipient
                                  ?.Email
                              }

                              <Copy
                                text={
                                  oneTransaction?.TransactionDetail?.Recipient
                                    ?.Email
                                }
                              />
                            </span>
                          </p>
                        </>
                      )}

                      {oneTransaction?.TransactionDetail?.Recipient
                        ?.ResourceType === RecipientType.TAG && (
                        <>
                          {oneTransaction?.TransactionDetail?.Recipient
                            ?.NickName && (
                            <p className={pStyle}>
                              Tag: &nbsp;
                              <span className="font-bold text-darkgold">
                                @
                                {
                                  oneTransaction?.TransactionDetail?.Recipient
                                    ?.NickName
                                }
                              </span>
                            </p>
                          )}
                        </>
                      )}
                      {oneTransaction?.TransactionDetail?.Recipient
                        ?.ResourceType !== RecipientType.TAG && (
                        <>
                          {oneTransaction?.TransactionDetail?.Recipient
                            ?.Country && (
                            <p className={pStyle}>
                              <div className="float-left">Country: &nbsp;</div>
                              <b className="font-bold">
                                <CountryFlag
                                  className="float-left"
                                  country={
                                    oneTransaction?.TransactionDetail?.Recipient
                                      ?.Country!
                                  }
                                />
                                {
                                  oneTransaction?.TransactionDetail?.Recipient
                                    ?.Country
                                }
                              </b>
                            </p>
                          )}

                          {(oneTransaction?.TransactionDetail?.Recipient
                            ?.BankName ||
                            vendorType === "NgnCredit") && (
                            <p className={pStyle}>
                              Bank: &nbsp;
                              <span className="font-bold text-darkgold">
                                {vendorType === "NgnCredit"
                                  ? vendor
                                  : oneTransaction?.TransactionDetail?.Recipient
                                      ?.BankName}
                              </span>
                            </p>
                          )}

                          {oneTransaction?.TransactionDetail?.Recipient
                            ?.AccountNumber && (
                            <p className={pStyle}>
                              Account Number: &nbsp;
                              <span className="font-bold text-darkgold">
                                {
                                  oneTransaction?.TransactionDetail?.Recipient
                                    ?.AccountNumber
                                }
                              </span>
                            </p>
                          )}

                          {oneTransaction?.TransactionDetail?.Recipient
                            ?.AccountType !== "" && (
                            <p className={pStyle}>
                              Account Type: &nbsp;
                              <span className="font-bold text-darkgold">
                                {
                                  oneTransaction?.TransactionDetail?.Recipient
                                    ?.AccountType
                                }
                              </span>
                            </p>
                          )}

                          {oneTransaction?.TransactionDetail?.Recipient?.Address
                            ?.StreetAddress && (
                            <p className={pStyle}>
                              Address: &nbsp;
                              <span className="font-bold text-darkgold">
                                {getAddress(
                                  oneTransaction?.TransactionDetail?.Recipient
                                    ?.Address || {}
                                )}
                              </span>
                            </p>
                          )}
                        </>
                      )}
                    </fieldset>
                  </div>
                )}

              <TransactionTimeline />

              <p className={pStyle}>
                Date Created: <br />
                <span className="font-bold text-darkgold">
                  {oneTransaction?.CreatedAt
                    ? new Date(oneTransaction?.CreatedAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )
                    : ""}
                </span>
              </p>
              {oneTransaction?.ToBeCompletedBy && (
                <p className={pStyle}>
                  Date Scheduled: <br />
                  <span className="font-bold text-darkgold">
                    {oneTransaction?.ToBeCompletedBy
                      ? new Date(
                          oneTransaction?.ToBeCompletedBy
                        ).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                      : "invalid date"}
                  </span>
                </p>
              )}
              <p className={pStyle}>
                Last Updated: <br />
                <span className="font-bold text-darkgold">
                  {oneTransaction?.UpdatedAt
                    ? new Date(oneTransaction?.UpdatedAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )
                    : "invalid date"}
                </span>
              </p>

              <TransactionButtons
                refresh={() => {
                  refresh && refresh()
                  fetch_transaction()
                }}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default CurrentTransactionModal
