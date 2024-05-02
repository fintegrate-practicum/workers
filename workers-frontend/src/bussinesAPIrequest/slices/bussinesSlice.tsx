import { createSlice } from '@reduxjs/toolkit';
import { deleteBusiness } from '../reducers/bussinesRedux';


export interface BusinessState {
    status: string;
    error: string | null;
}

const initialState: BusinessState = {
    status: 'idle',
    error: null
};

const businessSlice = createSlice({
    name: 'apiBusiness',
    initialState,
    reducers: {},
    extraReducers: {
        [deleteBusiness.pending]: (state) => {
            state.deleting = true;
            state.error = null;
        },
        [deleteBusiness.fulfilled]: (state) => {
            state.deleting = false;
            console.log('Business deleted successfully');
        },
        [deleteBusiness.rejected]: (state, action) => {
            state.deleting = false;
            state.error = action.error.message;
            console.error('Error deleting business:', action.error);
        }
    }
});

export default businessSlice.reducer;

