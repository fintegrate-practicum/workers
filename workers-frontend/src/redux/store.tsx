import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import deleteSlice from './apiCalls/deleteCall'
import postSlice from './apiCalls/postCall'
import editSlice from './apiCalls/putCall'
import messageSlice from "./messageSlice";
const store = configureStore({
    reducer:{
        employeeSlice,
        deleteSlice,
        postSlice,
        editSlice,
        messageSlice
       
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;