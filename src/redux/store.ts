import { configureStore } from "@reduxjs/toolkit";
import TransactionsReducer from "./slices/TransactionsSlice";
import UserReducer from "./slices/UserSlice";
import AdminReducer from "./slices/AdminSlice";
import ViewReducer from "./slices/View";
import CustomerSlice from "./slices/CustomerSlice";
import TabsSlice from "./slices/TabsSlice";

export const store = configureStore({
  reducer: {
    transactions: TransactionsReducer,
    admin: AdminReducer,
    view: ViewReducer,
    user: UserReducer,
    customer: CustomerSlice,
    tabs: TabsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
