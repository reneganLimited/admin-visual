import { useDispatch, useSelector } from "react-redux";
import {
  setLoginModal,
  setShowCloseModal,
  setShowExpiredAccountModal,
  setShowPausedModal,
  setShowRestoreModal,
} from "../../redux/slices/CustomerSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Button from "../../components/Button";
import ConfirmationCloseAccountModal from "./ConfirmCloseAccountModal";
import ConfirmationRestoreAccountModal from "./ConfirmRestoreAccountModal";
import { AccountState } from "../../types";
import ConfirmLoginModal from "./ConfirmLoginActivityModal";
import ConfirmPausedUserModal from "./ConfirmPausedUserModal";
import ConfirmExpiredAccountModal from "./ConfirmExpiredAccountModal";

function CustomerButtons({ editMode, setEditMode }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    customerPayload,
    showLoginModal,
    showCloseModal,
    showRestoreModal,
    customer,
    showPausedModal,
    showExpiredAccountModal,
  } = useSelector((state: RootState) => state.customer);

  const activeLoginBtn =
    "text-sm border rounded-[5px] m-2 border border-green-600 text-green w-auto";
  const inactiveLoginBtn =
    "text-sm border rounded-[5px] m-2 border-red-600 text-red w-auto";

  const handleUpdate = async () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <ConfirmPausedUserModal
        isModalOpen={showPausedModal}
        setIsConfirmOpen={(state: boolean) =>
          dispatch(setShowPausedModal(state))
        }
      />
      <ConfirmExpiredAccountModal
        isModalOpen={showExpiredAccountModal}
        setIsConfirmOpen={(state: boolean) =>
          dispatch(setShowExpiredAccountModal(state))
        }
      />
      <ConfirmationCloseAccountModal
        isModalOpen={showCloseModal}
        setIsConfirmOpen={(state: boolean) =>
          dispatch(setShowCloseModal(state))
        }
      />
      <ConfirmationRestoreAccountModal
        isModalOpen={showRestoreModal}
        setIsConfirmOpen={(state: boolean) =>
          dispatch(setShowRestoreModal(state))
        }
      />
      <ConfirmLoginModal
        isModalOpen={showLoginModal}
        setIsConfirmOpen={(state: boolean) => dispatch(setLoginModal(state))}
      />
      <div className="mt-4 space-x-3">
        <Button
          disabled={false}
          text={editMode ? "Cancel" : "Edit User"}
          handleClick={() => setEditMode(!editMode)}
          style="text-sm border rounded-[5px] m-2 bg-black text-white w-auto"
        />

        {editMode && (
          <Button
            text="Save Changes"
            handleClick={handleUpdate}
            style="text-sm border rounded-[5px] m-2 bg-green text-white w-auto"
          />
        )}
        {!editMode && (
          <>
            {(customer?.AccountState === AccountState.ACTIVE ||
              customer?.AccountState === AccountState.DISABLED_LOGIN ||
              customer?.AccountState === AccountState.BLOCKED ||
              customer?.AccountState === AccountState.PAUSED ||
              customer?.AccountState === AccountState.USD_ACCOUNT_EXPIRED) && (
              <Button
                text="Close Account"
                handleClick={() => {
                  dispatch(setShowCloseModal(true));
                }}
                style="text-sm border rounded-[5px] m-2 bg-red-600 text-white w-auto"
              />
            )}

            {(customer?.AccountState === AccountState.BLOCKED ||
              customer?.AccountState === AccountState.ADMIN_CLOSED ||
              customer?.AccountState === AccountState.DELETION_PLANNED ||
              customer?.AccountState === AccountState.PAUSED ||
              customer?.AccountState === AccountState.USD_ACCOUNT_EXPIRED) && (
              <Button
                text="Restore Account"
                handleClick={() => {
                  dispatch(setShowRestoreModal(true));
                }}
                style="text-sm border rounded-[5px] m-2 bg-green-600 text-white w-auto"
              />
            )}

            {(customer?.AccountState === AccountState.ACTIVE ||
              customer?.AccountState === AccountState.BLOCKED) && (
              <Button
                text="Pause Account"
                handleClick={async () => {
                  dispatch(setShowPausedModal(true));
                }}
                style="text-sm border rounded-[5px] m-2 bg-blue text-white w-auto ml-3"
              />
            )}

            {(customer?.AccountState === AccountState.ACTIVE ||
              customer?.AccountState === AccountState.BLOCKED ||
              customer?.AccountState === AccountState.PAUSED) &&
              ["NOT_STARTED", "PENDING", "VERIFICATION_STARTED"].includes(
                customer?.V4MigrationState!,
              ) && (
                <Button
                  text="Expire USD Account"
                  handleClick={async () => {
                    dispatch(setShowExpiredAccountModal(true));
                  }}
                  style="text-sm border rounded-[5px] m-2 bg-orange text-white w-auto ml-3"
                />
              )}

            {customer?.AccountState !== AccountState.ADMIN_CLOSED &&
              customer?.AccountState !== AccountState.DELETION_PLANNED && (
                <Button
                  text={
                    customer?.AccountState === AccountState.ACTIVE ||
                    customer?.AccountState === AccountState.BLOCKED ||
                    customer?.AccountState === AccountState.PAUSED ||
                    customer?.AccountState === AccountState.USD_ACCOUNT_EXPIRED
                      ? "Disable Login"
                      : "Re-activate Login"
                  }
                  handleClick={() => {
                    dispatch(setLoginModal(true));
                  }}
                  style={
                    (customer?.AccountState === AccountState.ACTIVE ||
                    customer?.AccountState === AccountState.BLOCKED ||
                    customer?.AccountState === AccountState.PAUSED ||
                    customer?.AccountState === AccountState.USD_ACCOUNT_EXPIRED
                      ? inactiveLoginBtn
                      : activeLoginBtn) + " ml-3"
                  }
                />
              )}
          </>
        )}
      </div>
    </>
  );
}

export default CustomerButtons;
