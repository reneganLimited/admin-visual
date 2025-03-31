import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import SmallModal from "../../components/SmallModal";
import { TransactionStateEnum } from "../../types";
import { returnV4UsdCreditTransaction } from "../../apiv4";
interface IProps {
  isModalOpen: boolean;
  setIsConfirmOpen: (state: boolean) => void;
  refresh?: () => void;
  setLoader?: (state: boolean) => void;
}
const ConfirmReturnTransactionModal = ({ isModalOpen, setIsConfirmOpen, refresh, setLoader }: IProps) => {
  const currentTransaction = useSelector(
    (state: RootState) => state.transactions.oneTransaction,
  );

  const handleError = (error: any, action: string) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred."
    console.error(`${action} - ${errorMessage}`)
    toast.error(`An error occurred while ${action}. Please try again.`)
  }

  const returnTransaction = async (currentTransaction: any) => {
    closeModal();
    setLoader && setLoader(true);
    try {
      await returnV4UsdCreditTransaction({
        TransactionIdentifier: currentTransaction?.TransactionIdentifier!,
        NewTransactionState: TransactionStateEnum.RETURNED
      });
      toast.success("Credit transaction returned!");
      refresh && (await refresh());
    } catch (error: any) {
      handleError(error, "Return USD Credit");
      console.log(error);
    } finally {
      setLoader && setLoader(false);
    }
  };

  const closeModal = () => {
    setIsConfirmOpen(false);
  };

  return (
    <SmallModal title="Confirm Update" isOpen={isModalOpen} closeModal={closeModal}>
      <div>
        <p className="text-center">
          You are about to return this transaction{" "}
          <span className="text-darkgold font-bold">
            ({currentTransaction?.TransactionIdentifier})
          </span>{" "}
        </p>
        <p className="text-center">Are you sure?</p>
        <div className=" flex  justify-center">
          <Button
            text="Yes"
            handleClick={async () => {
              await returnTransaction(currentTransaction);
              setIsConfirmOpen(false);
            }}
            style=" text-sm text-[#FFF] confirm-button mr-[50px] rounded-[8px] mt-3  bg-green "
          />
          <Button
            text="No"
            handleClick={closeModal}
            style=" text-sm text-[#FFF] confirm-button rounded-[8px] bg-danger  mt-3 "
          />
        </div>
      </div>
    </SmallModal>
  );
};

export default ConfirmReturnTransactionModal;
