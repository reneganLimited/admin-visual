import Modal from "../../components/Modal"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import {useEffect, useState} from "react"
import {Note, NoteRequestData, TransactionStateEnum, TransactionTypeEnum} from "../../types"
import {addNote, setNotes} from "../../redux/slices/TransactionsSlice"
import {toast} from "react-toastify"
import {updateTransaction} from "../../apiV1"
import Button from "../../components/Button"
import {MdAdd} from "react-icons/md"

interface IProps {
  isModalOpen: boolean
  setIsConfirmOpen: (state: boolean) => void
  refresh?: () => void
}

const NoteModal = ({isModalOpen, setIsConfirmOpen, refresh}: IProps) => {
  const oneTransaction: any = useSelector(
    (state: RootState) => state.transactions.oneTransaction
  )
  const {adminData} = useSelector((state: RootState) => state.admin)
  const {notes} = useSelector((state: RootState) => state.transactions) // Assume `notes` is in your Redux state
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const RequiredNoteStates = [TransactionTypeEnum.USD_CREDIT]
  const RequiredTypeForNotes = [
    TransactionStateEnum.IN_REVIEW,
    TransactionStateEnum.FURTHER_REVIEW,
    TransactionStateEnum.FLAGGED,
    TransactionStateEnum.DAILY_LIMIT_EXCEEDED,
    TransactionStateEnum.WEEKLY_LIMIT_EXCEEDED,
    TransactionStateEnum.MONTHLY_LIMIT_EXCEEDED,
    TransactionStateEnum.RETURNED,
    TransactionStateEnum.REJECTED,
  ]

  useEffect(() => {
    console.log(`adminData`, adminData)
    if (oneTransaction?.AdditionalDetails?.Notes) {
      // Initialize notes in the Redux store
      dispatch(setNotes(oneTransaction.AdditionalDetails.Notes))
    } else {
      dispatch(setNotes([]))
    }
  }, [oneTransaction, dispatch])

  const closeModal = () => {
    setIsConfirmOpen(false)
  }

  const addNewNote = async () => {
    if (note.trim()) {
      const newNote: NoteRequestData = {
        id: Date.now(),
        name: `${adminData?.given_name ?? ""} ${adminData?.family_name ?? ""}`, // Replace with logged-in user's name
        text: note,
        date: new Date().toLocaleString(),
      }
      setIsLoading(true)
      try {
        // Dispatch an action to add the note (update your Redux logic accordingly)
        dispatch(addNote(newNote))
        await updateTransaction(
          oneTransaction?.TransactionIdentifier!,
          oneTransaction?.TransactionState!,
          newNote
        )
        refresh && refresh()
        toast.success("Note added successfully")
        setNote("")
      } catch (error) {
        toast.error("Failed to add note")
        console.error("Error adding note:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.warn("Note cannot be empty")
    }
  }

  return (
    <Modal title="Notes" isOpen={isModalOpen} closeModal={closeModal}>
      <div
        className="notes-container"
        style={{
          maxHeight: "40vh", // Set a fixed height for the notes area
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {notes?.length ? (
          notes.map((note: Note) => (
            <div
              key={note.ID}
              className="note"
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div
                className="note-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <strong>{note.Name}</strong>
                <small style={{color: "#666"}}>{note.Date}</small>
              </div>
              <p style={{margin: 0}}>{note.Text}</p>
            </div>
          ))
        ) : (
          <p style={{textAlign: "center", color: "#666"}}>
            No notes available yet.
          </p>
        )}
      </div>
      {RequiredNoteStates.includes(oneTransaction?.TransactionType) &&
        RequiredTypeForNotes.includes(oneTransaction?.TransactionState) && (
          <div
            className="note-input-container"
            style={{
              width: "100%",
              background: "#f9f9f9",
              padding: "0.5rem 1rem",
            }}
          >
            <div style={{display: "flex", gap: "0.5rem"}}>
              <input
                type="text"
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
              <Button
                handleClick={addNewNote}
                iconLeft={true}
                icon={
                  isLoading ? (
                    <div className="loader"></div>
                  ) : (
                    <MdAdd className="float-right mt-1 ml-2" />
                  )
                }
                text={isLoading ? "Adding..." : "Add"}
                style={`text-sm text-white rounded-[8px] mb-2 bg-black`}
                disabled={isLoading || !note.trim()}
              />
            </div>
          </div>
        )}
    </Modal>
  )
}

export default NoteModal
