import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import apiSlice from "./reducers";

const store = configureStore({
    reducer:{
        employeeSlice,
        apiSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;