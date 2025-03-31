import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  FilterBy,
  ISingleTransaction,
  ITransaction,
  ListTransactionFilter,
  Note,
  NoteRequestData,
  TransactionFilter,
  TransactionStateEnum,
  TransactionTypeEnum,
} from "../../types";
import { MAX_TRANSACTIONS_LIMIT } from "../../constants";

export interface TransactionsState {
  allTransactions: ITransaction[];
  currentTransaction: ITransaction | undefined;
  oneTransaction: ISingleTransaction | undefined;
  currentTransactions: ITransaction[] | null;
  listTransactionFilter: ListTransactionFilter;
  isConfirmTransactionOpen: boolean;
  isTransactionOpen: boolean;
  toBeUpdatedTransaction: string | null;
  toBeCancelledTransaction: string | null;
  isCancelTransactionOpen: boolean;
  filterBy: string;
  isProcessTransactionOpen: boolean;
  TransactionsLoading: boolean;
  transactionFilter: TransactionFilter;
  PreviousTokens: string[];
  NextToken: string;
  currentPage: number;
  perPage: number;
  isNoteOpen: boolean;
  notes: Note[];
  isReviewTransactionOpen: boolean;
  isReturnTransactionOpen: boolean;
  isFlagTransactionOpen: boolean;
}

let today = new Date();

// Subtract 24 hours from the current time
let last24Hours = new Date(today.getTime() - 24 * 60 * 60 * 1000); // Subtracting 24 hours in milliseconds

// Extract year, month, day, hour, and minute for the date 24 hours ago
let hourYear = last24Hours.getFullYear();
let hourMonth = (last24Hours.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
let hourDay = last24Hours.getDate().toString().padStart(2, "0");

// Create the formatted date and time string
let last24HoursString = `${hourYear}-${hourMonth}-${hourDay}`;

// Subtract 7 days (a week) from today's date
// let oneWeekAgo = new Date(today);
// oneWeekAgo.setDate(today.getDate() - 7);

// Extract year, month, and day for the date one week ago
// let weekYear = oneWeekAgo.getFullYear();
// let weekMonth = (oneWeekAgo.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
// let weekDay = oneWeekAgo.getDate().toString().padStart(2, "0");

// Create the formatted date string
// let oneWeekAgoString = `${weekYear}-${weekMonth}-${weekDay}`;

// let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

// Extract year, month, and day
// let year = firstDayOfMonth.getFullYear();
// let month = (firstDayOfMonth.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
// let day = firstDayOfMonth.getDate().toString().padStart(2, "0");

// Create the formatted date string
// let firstDayString = `${year}-${month}-${day}`;

const initialState: TransactionsState = {
  allTransactions: [],
  currentTransaction: {} as ITransaction,
  oneTransaction: {} as ISingleTransaction,
  listTransactionFilter: {
    TransactionType: TransactionTypeEnum.MAKE_PAYMENT,
    TransactionState: TransactionStateEnum.COMPLETED,
    StartDate: last24HoursString,
    limit: MAX_TRANSACTIONS_LIMIT,
  },
  filterBy: FilterBy.UserEmail,
  isConfirmTransactionOpen: false,
  isTransactionOpen: false,
  toBeUpdatedTransaction: null,
  currentTransactions: null,
  toBeCancelledTransaction: null,
  isCancelTransactionOpen: false,
  isProcessTransactionOpen: false,
  isFlagTransactionOpen: false,
  TransactionsLoading: false,
  transactionFilter: {},
  PreviousTokens: [],
  NextToken: "",

  currentPage: 1,
  perPage: 50,
  isNoteOpen: false,
  isReviewTransactionOpen: false,
  isReturnTransactionOpen: false,
  notes: [],
};

const transformNoteRequestDataToNote = (data: NoteRequestData): Note => {
  return {
    ID: data.id,
    Text: data.text,
    Date: data.date,
    Name: data.name
  };
};


export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setAllTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.allTransactions = [...action.payload];
      if (!state.listTransactionFilter?.TransactionState) {
        state.currentTransactions = [...action.payload];
      }
    },
    setCurrentTransaction: (
      state,
      action: PayloadAction<ITransaction | undefined>,
    ) => {
      state.currentTransaction = action.payload;
    },
    setTransactionFilter: (state, action: PayloadAction<TransactionFilter>) => {
      state.transactionFilter = action.payload;
    },
    setListTransactionFilter: (
      state,
      action: PayloadAction<ListTransactionFilter>,
    ) => {
      state.listTransactionFilter = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<FilterBy>) => {
      state.filterBy = action.payload;
    },
    setIsConfirmTransactionOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmTransactionOpen = action.payload;
    },
    setIsProcessTransactionOpen: (state, action: PayloadAction<boolean>) => {
      state.isProcessTransactionOpen = action.payload;
    },
    setIsTransactionOpen: (state, action: PayloadAction<boolean>) => {
      state.isTransactionOpen = action.payload;
    },
    setToBeUpdatedTransaction: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.toBeUpdatedTransaction = action.payload;
    },
    setToBeCancelledTransaction: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.toBeCancelledTransaction = action.payload;
    },
    setIsCancelTransactionOpen: (state, action: PayloadAction<boolean>) => {
      state.isCancelTransactionOpen = action.payload;
    },
    setIsFlagTransactionOpen: (state, action: PayloadAction<boolean>) => {
      state.isFlagTransactionOpen = action.payload;
    },
    setTransactionsLoading: (state, action: PayloadAction<boolean>) => {
      state.TransactionsLoading = action.payload;
    },
    setOneTransaction: (state, action: PayloadAction<ISingleTransaction>) => {
      state.oneTransaction = action.payload;
    }, 
    saveToken: (state, action: PayloadAction<any>) => {
      state.PreviousTokens = action.payload;
    },
    setNextToken: (state, action: PayloadAction<string>) => {
      state.NextToken = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setIsNoteOpen: (state, action: PayloadAction<boolean>) => {
      state.isNoteOpen = action.payload;
    },
    setReviewModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isReviewTransactionOpen = action.payload;
    },
    setReturnModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isReturnTransactionOpen = action.payload;
    },
    addNote: (state, action: PayloadAction<NoteRequestData>) => {
      const newNote = transformNoteRequestDataToNote(action.payload);
      state.notes = [...state.notes, newNote];
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    }
  },
});

export const {
  setIsTransactionOpen,
  setToBeUpdatedTransaction,
  setAllTransactions,
  setCurrentTransaction,
  setIsConfirmTransactionOpen,
  setToBeCancelledTransaction,
  setIsCancelTransactionOpen,
  setIsFlagTransactionOpen,
  setOneTransaction,
  setTransactionsLoading,
  setFilterBy,
  setListTransactionFilter,
  setIsProcessTransactionOpen,
  setTransactionFilter,
  saveToken,
  setCurrentPage,
  setNextToken,
  setIsNoteOpen,
  setReviewModalOpen,
  setReturnModalOpen,
  addNote,
  setNotes
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
