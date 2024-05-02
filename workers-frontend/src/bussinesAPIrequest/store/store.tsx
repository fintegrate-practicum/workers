import { configureStore } from '@reduxjs/toolkit';
import businessReducer from '../slices/bussinesSlice';

const store = configureStore({
    reducer: {
        businessReducer,
        //here i will add another reducers.
    },
});

export default store;