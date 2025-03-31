import { useDispatch, useSelector } from "react-redux";
import {
    CustomerToUpdate,
} from "../../redux/slices/CustomerSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { AccountState } from "../../types";

interface IProps {
    isModalOpen: boolean;
    setIsConfirmOpen: (state: boolean) => void;
}

const ConfirmLoginActivityModal = ({
    isModalOpen,
    setIsConfirmOpen,
}: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { customer } = useSelector((state: RootState) => state.customer);
    const condition = customer?.AccountState === AccountState.BLOCKED || 
    customer?.AccountState === AccountState.ACTIVE ||
    customer?.AccountState === AccountState.PAUSED;
    const onConfirm = async (state: string) => {
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
                ModificationReason: condition ? "Disabled user login" : "Re-activated user login",
                PhoneNumber: customer.PhoneNumber,
                UserID: customer.UserID,
                // @ts-ignore
                Name: name,
                UserEmail: customer.Email,
            };
        }
    };

    const closeModal = () => {
        setIsConfirmOpen(false);
    };

    return (
        <Modal title={(customer?.AccountState === AccountState.DISABLED_LOGIN || 
            customer?.AccountState !== AccountState.ACTIVE 
          ) ? "Re-activate Login" : "Disable Login"} isOpen={isModalOpen} closeModal={closeModal}>
            <p className="text-center">
                Are you sure you want to {condition ? "disable":"re-activate"} login for this user <b>{customer?.Email}</b>?
            </p>
            <div className=" flex justify-center">
                <Button
                    text="Yes"
                    handleClick={() => onConfirm(condition ? AccountState.DISABLED_LOGIN : AccountState.ENABLED_LOGIN)}
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

export default ConfirmLoginActivityModal;
