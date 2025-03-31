import Modal from "../../components/Modal"
import Button from "../../components/Button"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../redux/store"
import {AccountState} from "../../types"
import {toast} from "react-toastify"
import {CustomerToUpdate} from "../../redux/slices/CustomerSlice"
interface IProps {
  isModalOpen: boolean
  setIsConfirmOpen: (state: boolean) => void
}
const ConfirmPausedUserModal = ({isModalOpen, setIsConfirmOpen}: IProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const {customer} = useSelector((state: RootState) => state.customer)

  const onConfirm = async (state: string) => {
    try {
      closeModal()
      const user = JSON.parse(localStorage.getItem("storageUser")!)
      const name = customer?.IsABusiness
        ? {
            BusinessName: customer?.BusinessName,
          }
        : {
            FullName: {
              ...customer?.PersonName,
            },
          }
      if (customer) {
        const customerPayload: CustomerToUpdate = {
          LastLogin: "",
          AccountState: state,
          ModifiedBy: `${user.given_name} ${user.family_name}`,
          ModificationReason: "Account Paused",
          PhoneNumber: customer?.PhoneNumber,
          UserID: customer.UserID,
          // @ts-ignore
          Name: name,
          UserEmail: customer?.Email,
        }
      }
    } catch (err) {
      toast.error(`An error occurred while updating user state`)
    }
  }

  const closeModal = () => {
    setIsConfirmOpen(false)
  }

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <div>
        <p className="text-center">
          About update user state for{" "}
          <span className="text-darkgold font-bold">{customer?.Email} </span>
          to PAUSED
        </p>
        <p className="text-center">Are you sure?</p>
        <div className=" flex  justify-center">
          <Button
            text="Yes"
            handleClick={() => onConfirm(AccountState.PAUSED)}
            style=" text-sm text-[#FFF] confirm-button mr-[50px] rounded-[8px] mt-3 bg-green "
          />
          <Button
            text="No"
            handleClick={closeModal}
            style=" text-sm text-[#FFF] confirm-button rounded-[8px]  mt-3 bg-danger "
          />
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmPausedUserModal
