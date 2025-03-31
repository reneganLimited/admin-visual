import * as XLSX from "xlsx"
import Button from "../../../components/Button"
import {ITransaction} from "../../../types"
import {toast} from "react-toastify"

interface IProps {
  Transactions: ITransaction[]
  title: string
  text: string
  style?: string // Optional styling prop
  format?: "xlsx" | "csv" // File format
}

const DownloadCSVButton = ({
  Transactions,
  title,
  text,
  style,
  format = "xlsx",
}: IProps) => {
  const prepareTransactions = () => {
    if (!Transactions || Transactions.length === 0) return []
    return Transactions.map((transaction: ITransaction) => {
      return {
        Email: transaction.UserEmail || "N/A",
        Amount: transaction.TotalAmount || 0,
        DateReceived: transaction.CreatedAt
          ? new Date(transaction.CreatedAt).toLocaleDateString("en-US")
          : "N/A",
        ProviderCustomerId: transaction?.ProviderCustomerId,
        ProviderDepositId: transaction?.ProviderDepositId
      }
    })
  }

  const downloadFile = () => {
    const data = prepareTransactions()

    if (data.length === 0) {
      toast.warning("No flagged deposits found for the current filter!")
      return
    }

    if (format === "xlsx") {
      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, title)

      const filename = `${title}_${new Date().toISOString().replace(/:/g, "-")}.xlsx`
      XLSX.writeFile(wb, filename)
    } else if (format === "csv") {
      const ws = XLSX.utils.json_to_sheet(data)
      const csv = XLSX.utils.sheet_to_csv(ws)

      const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"})
      const link = document.createElement("a")
      const filename = `${title}_${new Date().toISOString().replace(/:/g, "-")}.csv`

      link.href = URL.createObjectURL(blob)
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="items-center mb-4">
      <Button
        text={text}
        handleClick={downloadFile}
        style={
          style ||
          `hover:bg-blue-400 px-4 py-3 rounded-md bg-blue-500 text-white flex float-left`
        }
      />
    </div>
  )
}

DownloadCSVButton.defaultProps = {
  title: "Transactions",
  text: "Download CSV",
  format: "csv",
}

export default DownloadCSVButton
