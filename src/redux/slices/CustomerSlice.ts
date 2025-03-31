// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as v2 from "../../apiV2";
import { createDraft } from "immer";
import { VirtualAccountProviderKYCEntity } from "../../types";

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

// export const modifyAccount = createAsyncThunk(
//     'customer/modifyAccount',
//     async (details: AccountModificationInput, thunkAPI) => {
//         const response = await v2.updateAccount(details.UserID, details);
//         return response.data.closeAccount;
//     }
// );
export const fetchUserByEmail = createAsyncThunk(
  "customer/fetchByEmail",
  async (email: string, thunkAPI) => {
    try {
      const user = await v2.getUserByEmail(email);
      return user;
    } catch (error: any) {
      // Return the custom error message from the server
      console.error("Error obj:", error);
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to fetch user by email",
      );
    }
  },
);

export const fetchUserByName = createAsyncThunk(
  "customer/fetchByName",
  async (
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
    },
    thunkAPI,
  ) => {
    try {
      const user = await v2.getUserByName(name);
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to fetch user by email",
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  "customer/updateUser",
  async (userDetails: CustomerToUpdate, thunkAPI) => {
    try {
      const response = await v2.updateAccount(userDetails.UserID, userDetails);
      return response;
    } catch (error: any) {
      // Return the custom error message from the server
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to update user",
      );
    }
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.status = "loading";
        state.customer = {} as Customer;
        state.error = undefined;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customer = action.payload;
        state.error = undefined;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.data.User) {
          state.customer = action.payload.data.User;
        } else {
          state.error = action.payload.data.Body.message;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserByName.pending, (state) => {
        state.status = "loading";
        state.searchResults = [];
        state.error = undefined;
      })
      .addCase(fetchUserByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(fetchUserByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
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
