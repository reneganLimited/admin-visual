import { useDispatch, useSelector } from "react-redux";
import { CustomerToUpdate } from "../../redux/slices/CustomerSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import SmallModal from "../../components/SmallModal";
import Button from "../../components/Button";
import { AccountState } from "../../types";
import { toast } from "react-toastify";

interface IProps {
  isModalOpen: boolean;
  setIsConfirmOpen: (state: boolean) => void;
}

const ConfirmationCloseAccountModal = ({
  isModalOpen,
  setIsConfirmOpen,
}: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState<string>("");
  const { customer } = useSelector((state: RootState) => state.customer);

  const onConfirm = async (state: string) => {
    try {
      closeModal();
      console.log("Selected reason:", selectedReasons, "Custom reason:", customReason);
      const user = JSON.parse(localStorage.getItem("storageUser")!);

      if (customer) {
        const name = customer.IsABusiness
          ? { BusinessName: customer.BusinessName }
          : { FullName: { ...customer.PersonName } };

        const reason =
          selectedReasons[0] === "Other" && customReason
            ? `Account Closure - ${customReason}`
            : `Account Closure - ${selectedReasons[0]}`;

        const customerPayload: CustomerToUpdate = {
          LastLogin: "",
          AccountState: state,
          ModifiedBy: `${user.given_name} ${user.family_name}`,
          ModificationReason: reason,
          PhoneNumber: customer.PhoneNumber,
          UserID: customer.UserID,
          // @ts-ignore
          Name: name,
          UserEmail: customer.Email,
        };

        toast.success("User account updated successfully.");
      }
    } catch (err) {
      toast.error("An error occurred while updating the user account.");
    }
  };

  const closeModal = () => {
    setIsConfirmOpen(false);
    setSelectedReasons([]);
    setCustomReason("");
  };

  const handleCheckboxChange = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : prev.length < 1
        ? [...prev, reason]
        : prev
    );
  };

  const reasons = [
    "Unusual account for AML reasons",
    "Reversal of deposits",
    "Unusual sender of funds",
    "Duplicate account",
    "Account managed by existing Renegan user",
    "Account purchased from someone else",
    "Inability to verify account ownership",
    "Problematic customer behavior",
    "User requested closure",
    "Other",
  ];

  return (
    <SmallModal
      title="Close Account"
      isOpen={isModalOpen}
      closeModal={closeModal}
    >
      <p className="text-left m-2">Reason for Account Closure:</p>

      <div className="text-left text-dark mb-5 space-y-2">
        {reasons.map((reason) => {
          const isSelected = selectedReasons.includes(reason);
          const isMaxSelected = selectedReasons.length === 1;
          const shouldDisable = !isSelected && isMaxSelected;

          return (
            <div key={reason} className="flex items-center">
              <input
                type="checkbox"
                id={reason}
                value={reason}
                onChange={() => handleCheckboxChange(reason)}
                className="toggle-checkbox"
                checked={isSelected}
                disabled={shouldDisable}
              />
              <label
                htmlFor={reason}
                className={`cursor-pointer text-sm ml-2 ${
                  shouldDisable ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {reason}
              </label>
            </div>
          );
        })}
        {selectedReasons.includes("Other") && (
          <div className="mt-3">
            <label htmlFor="custom-reason" className="block text-sm font-medium">
              Please specify:
            </label>
            <textarea
              id="custom-reason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Enter your reason here..."
              className="w-full p-2 border border-gray-300 rounded mt-1"
              rows={3}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          text="Yes"
          disabled={
            selectedReasons.length < 1 ||
            (selectedReasons.includes("Other") && customReason.trim() === "")
          }
          handleClick={() => onConfirm(AccountState.ADMIN_CLOSED)}
          style="text-sm text-white confirm-button mr-12 rounded-lg mt-3 bg-green"
        />

        <Button
          text="No"
          handleClick={closeModal}
          style="text-sm text-white confirm-button rounded-lg border-2 border-red mt-3 bg-danger"
        />
      </div>
    </SmallModal>
  );
};

export default ConfirmationCloseAccountModal;