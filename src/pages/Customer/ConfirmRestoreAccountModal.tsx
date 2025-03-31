import { useDispatch, useSelector } from "react-redux";
import {
  CustomerToUpdate,
  updateUser,
} from "../../redux/slices/CustomerSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { AccountState } from "../../types";

interface IProps {
  isModalOpen: boolean;
  setIsConfirmOpen: (state: boolean) => void;
}

const ConfirmationRestoreAccountModal = ({
  isModalOpen,
  setIsConfirmOpen,
}: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { customer } = useSelector((state: RootState) => state.customer);

  const onConfirm = async(state: string) => {
    closeModal();
    const user = JSON.parse(localStorage.getItem("storageUser")!);

    const name = customer?.IsABusiness
      ? {
          BusinessName: customer?.BusinessName,
        }
      : {
          FullName: {
            ...customer?.PersonName,
          },
        };
    if (customer) {
      const customerPayload: CustomerToUpdate = {
        LastLogin: "",
        AccountState: state,
        ModifiedBy: `${user.given_name} ${user.family_name}`,
        ModificationReason: "Account Restoration",
        PhoneNumber: customer.PhoneNumber,
        UserID: customer.UserID,
        // @ts-ignore
        Name: name,
        UserEmail: customer.Email,
        KYCState: customer.KYCState,
      };
      await dispatch(updateUser(customerPayload));
     }
  };
 
  const closeModal = () => {
    setIsConfirmOpen(false);
  };

  return (
    <Modal title="Restore Account" isOpen={isModalOpen} closeModal={closeModal}>
      <p className="text-center">
        Are you sure you want to restore this account?
      </p>
      <div className=" flex justify-center">
        <Button
          text="Yes"
          handleClick={() => onConfirm(AccountState.ACTIVE)}
          style=" text-sm text-[#FFF] confirm-button mr-[50px] rounded-[8px] mt-3  bg-green "
        />

        <Button
          text="No"
          handleClick={closeModal}
          style=" text-sm text-[#FFF] confirm-button rounded-[8px]  border-2 border-[red]  mt-3 bg-danger "
        />
      </div>
    </Modal>
  );
};

export default ConfirmationRestoreAccountModal;
