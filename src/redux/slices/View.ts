import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types";

export interface ViewState {
  currentlyViewing: Category
}

const initialState: ViewState = {
  currentlyViewing: Category.Transactions,
};

export const viewSlice = createSlice({
  name: "view",
  reducers: {
    setCurrentlyViewing: (
      state,
      action: PayloadAction<Category>,
    ) => {
      state.currentlyViewing = action.payload;
    },
  },
  initialState,
});

export const { setCurrentlyViewing } = viewSlice.actions;

export default viewSlice.reducer;
