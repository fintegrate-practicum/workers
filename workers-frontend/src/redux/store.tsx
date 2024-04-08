import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";

const store = configureStore({
    reducer:{
        employeeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
