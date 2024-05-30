// import { configureStore } from "@reduxjs/toolkit";
// import employeeSlice from "./employeeSlice";
// import deleteSlice from './apiCalls/deleteCall'
// import postSlice from './apiCalls/postCall'
// import editSlice from './apiCalls/putCall'
// import messageSlice from "./messageSlice";
// const store = configureStore({
//     reducer:{
//         employeeSlice,
//         deleteSlice,
//         postSlice,
//         editSlice,
//         messageSlice
       
//     }
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export default store;
import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import deleteSlice from './apiCalls/deleteCall';
import postSlice from './apiCalls/postCall';
import editSlice from './apiCalls/putCall';
import messageSlice from "./messageSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    messages: messageSlice,
    employees: employeeSlice,
    deleteSlice,
    postSlice,
    editSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
