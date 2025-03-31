import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReneganTiers, IUser, UserC2CTransferLimit, UserPayoutLimit } from "../../types";
import * as API from "../../apiV1";
import { createDraft } from "immer";

export interface KYCState {
  currentUser: IUser | undefined;
  userLoading: boolean;
  currentTier: ReneganTiers;
  status: string;
  error: any;
  currentPayout: UserPayoutLimit;
  currentC2CLimit: UserC2CTransferLimit;
  isUserPayoutOpen: boolean;
  isUserNoLimitOpen: boolean;
  isUserC2CLimitOpen: boolean;
  isConfirmPayoutOpen: boolean;
  isConfirmC2CLimitOpen: boolean;
}

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userID: string, thunkAPI) => {
    try {
      const response = await API.getUser(userID);
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      return error.response?.data?.Message ?
      thunkAPI.rejectWithValue(error.response.data.Message) :
      thunkAPI.rejectWithValue("Network Error");
    }
  }
);

const initialState: KYCState = {
  currentUser: undefined,
  currentTier: ReneganTiers.TIER1_PERSON,
  currentPayout: {
    currentTier: {
      name: "LOW",
    },
  } as UserPayoutLimit,
  currentC2CLimit: {} as UserC2CTransferLimit,
  isConfirmPayoutOpen: false,
  isConfirmC2CLimitOpen: false,
  isUserPayoutOpen: false,
  isUserC2CLimitOpen: false,
  isUserNoLimitOpen: false,
  userLoading: true,
  status: "idle",
  error: undefined,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser | undefined>) => {
      state.currentUser = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
    setCurrentPayout: (state, action: PayloadAction<UserPayoutLimit>) => {
      state.currentPayout = createDraft(action.payload);
    },
    setCurrentC2CLimit: (
      state,
      action: PayloadAction<UserC2CTransferLimit>
    ) => {
      state.currentC2CLimit = createDraft(action.payload);
    },
    setIsConfirmPayoutOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmPayoutOpen = action.payload;
    },
    setIsConfirmC2CLimitOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmC2CLimitOpen = action.payload;
    },
    setUserNoLimitOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserNoLimitOpen = action.payload;
    },
    setIsPayoutOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserPayoutOpen = action.payload;
    },
    setTier: (state, action: PayloadAction<ReneganTiers>) => {
      state.currentTier = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.currentUser = undefined;
        state.userLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.error = undefined;
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.currentTier = action.payload.Tier;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userLoading = false;
        state.status = "failed";
        state.error = action.payload === "Network Error" ? "Network Error" : undefined;
        state.currentTier = ReneganTiers.TIER1_PERSON;
      });
  },
});

export const {
  setCurrentUser,
  setUserLoading,
  setCurrentC2CLimit,
  setCurrentPayout,
  setIsConfirmC2CLimitOpen,
  setIsConfirmPayoutOpen,
  setUserNoLimitOpen,
  setIsPayoutOpen,
  setTier
} = UserSlice.actions;

export default UserSlice.reducer;
