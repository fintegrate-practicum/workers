import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import employee from "../../employee";
import { createSlice } from "@reduxjs/toolkit";



export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await axios.post('https://api.example.com/employee')
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

const postSlice = createSlice({
    name: 'apiPost',
    initialState,
    reducers: {},
    extraReducers(builder) {

        builder.addCase(addEmployee.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(addEmployee.fulfilled, (state) => {
                state.status = 'succeeded'
                //post()
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }

})
export default postSlice.reducer