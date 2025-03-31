import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdmin } from "../../types";

interface AdminState {
  adminData: IAdmin | null;
  loggedin: boolean;
}

const initialState: AdminState = {
  adminData: JSON.parse(localStorage.getItem("storageUser")!) || null,
  loggedin: JSON.parse(localStorage.getItem("loggedin")!) || false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminState["adminData"]>) => {
      state.adminData = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedin = action.payload;
      if (state.loggedin === true) {
        localStorage.setItem("loggedin", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("loggedin");
      }
    },
  },
});

export const { setAdmin, setLoggedIn } = adminSlice.actions;

export default adminSlice.reducer;
