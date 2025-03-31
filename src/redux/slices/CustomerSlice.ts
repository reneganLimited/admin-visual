// src/redux/slices/userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as API from "../../apiV1";
import { createDraft } from "immer";
export interface AccountModificationInput {
  UserID: string;
  ModifiedBy: string;
  AccountState: string;
  ModificationReason: string;
}

export interface AccountModificationDetail {
  UserID: string;
  ModifiedBy: string;
  AccountState: string;
  ModificationReason: string;
  ModifiedAt: string;
}

export interface Customer {
  UserID: string;
  PersonName?: { FirstName: string; LastName: string; MiddleName: string };
  Email: string;
  PhoneNumber: string;
  DateCreated: string;
  IsABusiness: boolean;
  KYCState: string;
  AccountState: string;
  LastLogin: string;
  BusinessName?: string;
  History: AccountModificationDetail[];
  V4MigrationState?: string;
  NGNAccount:object|null
  V4Account:{status?:string}|null
}

export interface CustomerToUpdate {
  UserID: string;
  Name: {
    BusinessName?: string;
    FullName?: { FirstName: string; LastName: string; MiddleName: string };
  };
  PhoneNumber: string;
  UserEmail: string;
  KYCState: string;
  LastLogin: string;
  AccountState: string;
  ModifiedBy?: string;
  ModificationReason?: string;
  ModifiedAt?: string;
}

interface SearchResult {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  State: string;
}


const CustomerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: {} as Customer,
    status: "idle",
    error: undefined as any,
    editedCustomer: {} as Customer,
    customerPayload: {} as CustomerToUpdate,
    showCloseModal: false,
    showLoginModal: false,
    showRestoreModal: false,
    showPausedModal: false,
    showExpiredAccountModal: false,
    searchResults: [] as SearchResult[],
  },
  reducers: {
    setEditedCustomer: (state, action: PayloadAction<Customer>) => {
      state.editedCustomer = createDraft(action.payload);
    },
    setCustomerPayload: (state, action: PayloadAction<CustomerToUpdate>) => {
      state.customerPayload = createDraft(action.payload);
    },
    setShowCloseModal: (state, action: PayloadAction<boolean>) => {
      state.showCloseModal = action.payload;
    },
    setShowRestoreModal: (state, action: PayloadAction<boolean>) => {
      state.showRestoreModal = action.payload;
    },
    setShowPausedModal: (state, action: PayloadAction<boolean>) => {
      state.showPausedModal = action.payload;
    },
    setShowExpiredAccountModal: (state, action: PayloadAction<boolean>) => {
      state.showExpiredAccountModal = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setLoginModal: (state, action: PayloadAction<boolean>) => {
      state.showLoginModal = action.payload;
    },
  },
});

export const {
  setEditedCustomer,
  setCustomerPayload,
  setShowCloseModal,
  setShowRestoreModal,
  clearSearchResults,
  setLoginModal,
  setShowPausedModal,
  setShowExpiredAccountModal,
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
