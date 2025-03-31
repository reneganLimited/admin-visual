// src/components/UserManagement.js
import { useEffect, useState } from "react"
import { Customer, setCustomerPayload } from "../../redux/slices/CustomerSlice"
import CustomerButtons from "./CustomerButtons"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { StateColor } from "../../utils/helper"
import Copy from "../../components/Copy"
const { format, parseISO } = require("date-fns")

const CustomerCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { customer, status } = useSelector((state: RootState) => state.customer)
  const [editMode, setEditMode] = useState(false)
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(
    customer
  )

  useEffect(() => {
    customer && setEditedCustomer(customer)
  }, [customer, status]) // Add dependencies to trigger the effect

  const handleCustomerInfoEditorsChange = (field: string, value: string) => {
    const user = JSON.parse(localStorage.getItem("storageUser")!)
    if (editedCustomer) {
      setEditedCustomer({
        ...editedCustomer,
        // @ts-ignore
        PersonName: {
          ...editedCustomer.PersonName,
          [field]: value,
        },
        [field]: value,
      })
      const name = editedCustomer.IsABusiness
        ? {
          BusinessName: value,
        }
        : {
          FullName: {
            ...editedCustomer.PersonName,
            [field]: value,
          },
        }

      dispatch(
        setCustomerPayload({
          UserID: editedCustomer?.UserID,
          AccountState: editedCustomer.AccountState,
          UserEmail: editedCustomer.Email,
          PhoneNumber:
            field === "PhoneNumber" ? value : editedCustomer.PhoneNumber,
          ModifiedBy: `${user.given_name} ${user.family_name}`,
          ModificationReason: `Modified user's name`,
          // @ts-ignore
          Name: name,
        })
      )
    }
  }

  const beautifyDate = (dateString: string) => {
    let readableDate = ""
    const parsedDate = dateString ? parseISO(dateString) : null
    try {
      readableDate = parsedDate
        ? format(parsedDate, "MMMM do, yyyy - h:mm:ss a")
        : ""
    } catch (e) {
      console.log(e)
    }
    return readableDate
  }

  let readableDate = beautifyDate(customer?.DateCreated)

  if (!customer?.UserID && status === "succeeded") {
    return <p>User does not exist</p>
  }

  return (
    <div className="p-4 bg-[#F6f6f6]">
      {customer?.IsABusiness && (
        <CustomerInfoEditor
          label="Business Name"
          value={editedCustomer?.BusinessName || ""}
          editMode={editMode}
          onChange={(e: any) =>
            handleCustomerInfoEditorsChange("BusinessName", e.target.value)
          }
        />
      )}
      {!customer?.IsABusiness && (
        <>
          <CustomerInfoEditor
            label="First Name"
            value={editedCustomer?.PersonName?.FirstName || ""}
            editMode={editMode}
            onChange={(e: any) =>
              handleCustomerInfoEditorsChange("FirstName", e.target.value)
            }
          />
          <CustomerInfoEditor
            label="Middle Name"
            value={editedCustomer?.PersonName?.MiddleName || ""}
            editMode={editMode}
            onChange={(e: any) =>
              handleCustomerInfoEditorsChange("MiddleName", e.target.value)
            }
          />
          <CustomerInfoEditor
            label="Last Name"
            value={editedCustomer?.PersonName?.LastName || ""}
            editMode={editMode}
            onChange={(e: any) =>
              handleCustomerInfoEditorsChange("LastName", e.target.value)
            }
          />
          <CustomerInfoEditor
            label="Phone Number"
            value={editedCustomer?.PhoneNumber || ""}
            editMode={editMode}
            onChange={(e: any) =>
              handleCustomerInfoEditorsChange("PhoneNumber", e.target.value)
            }
          />
        </>
      )}

      <CustomerInfo label="Email" value={customer?.Email} />
      <CustomerInfo label="user ID" value={customer?.UserID} />

      <div className="mb-4 w-full float-left">
        <label className="block">Account Type:</label>
        <div
          className={`inline-block ${customer?.IsABusiness ? "bg-blue-100 text-blue-900" : "bg-green-100 text-green-900"} text-md font-medium py-1 px-3 rounded-full mt-1 mb-4`}
        >
          {customer?.IsABusiness ? "Business" : "Individual"} Account
        </div>
      </div>
      <CustomerInfo label="Date Account Created" value={readableDate} />
      <CustomerInfo label="KYC State" value={customer?.KYCState} />
      <CustomerInfo label="Account State" value={customer?.AccountState} />
      <CustomerInfo label="V4 Account State:" value={customer?.V4Account?.status ?? "N/A"} />
      <CustomerInfo label="NGN Account" value={customer?.NGNAccount ? 'active' : "N/A"} />
      <CustomerInfo label="Migration State" value={customer?.V4MigrationState || "Not a migration user"} />
      <CustomerInfo label="Last Login" value={customer?.LastLogin} />

     
      <hr />
      <label className="text-black-bold mb-2"> Modification History</label>
      <div className="scroll-box bg-[#ffffff]">
        <ul className="padding">
          {customer?.History &&
            customer?.History.map((modification: any, index: number) => (
              <li
                key={index}
                className="font-bold text-dark font-small mb-3 p-2"
              >
                <p>
                  <span className="orange">Modified By:</span>{" "}
                  {modification?.ModifiedBy}
                </p>
                <p>
                  <span className="orange">Modification Reason:</span>{" "}
                  {modification?.ModificationReason}
                </p>
                <p>
                  <span className="orange">Modified At:</span>{" "}
                  {beautifyDate(modification?.ModifiedAt)}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <CustomerButtons editMode={editMode} setEditMode={setEditMode} />
    </div>
  )
}

const CustomerInfoEditor = ({ label, value, editMode, onChange }: any) => {
  const pStyle = "mb-4 w-full float-left"
  return (
    <div className={pStyle}>
      <label className="block">{label}:</label>
      {editMode ? (
        <span className="font-light text-dark mt-2 mb-3">
          <input
            className={`text-[13px] text-[#000] float-left mr-4 border mb-4 py-2 pl-2 outline-none rounded-[10px] w-full`}
            value={value}
            onChange={onChange}
            placeholder={`Enter ${label}`}
          />
        </span>
      ) : (
        <span className="font-bold text-dark">{value}</span>
      )}
    </div>
  )
}

const CustomerInfo = ({ label, value }: any) => {
  const pStyle = "mb-4 w-full float-left"
  return (
    <div className={pStyle}>
      <label className="block">{label}:</label>
      <span className={`font-bold ${StateColor(value!)}`}>{value || "---"}</span>
      {label ==="Email" && <Copy text={value}/>}
      {label ==="user ID" && <Copy text={value}/>}
    </div>
  )
}

export default CustomerCard
