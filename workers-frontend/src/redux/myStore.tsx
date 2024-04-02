import { configureStore } from "@reduxjs/toolkit";
import workerslice from "./workerslice";

const myStore = configureStore({
    reducer:{
        workerslice
    }
})

export type RootState = ReturnType<typeof myStore.getState>
export type AppDispatch = typeof myStore.dispatch
export default myStore;
