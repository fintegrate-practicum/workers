import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";



export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
    try {
        const response = await axios.delete(`https://api.example.com/employee/${_num}`)
        return response.data
    } catch (error) {
        return error
    }
});

export interface State {
    status: string;
    error: string | undefined;
}

const initialState: State = {
    status: 'idle',
    error: undefined,
};

const deleteSlice = createSlice({
    name: 'apiPost',
    initialState,
    reducers: {},
    extraReducers(builder) {

        builder.addCase(deleteEmployee.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(deleteEmployee.fulfilled, (state) => {
                state.status = 'succeeded'
                //delete()
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }

})
export default deleteSlice.reducer