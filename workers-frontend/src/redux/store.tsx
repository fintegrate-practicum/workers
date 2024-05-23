import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import taskSlice from "./taskSlice";
import messageSlice from "./messageSlice"
const store = configureStore({
    reducer: {
        employeeSlice,
        taskSlice,
        messageSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;