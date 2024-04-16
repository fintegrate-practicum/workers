import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import employee from "../../employee";
import { createSlice } from "@reduxjs/toolkit";


export const editEmployee = createAsyncThunk('', async (_employee: employee) => {
  try {
    const response = await axios.put(`https://api.example.com/employee/${_employee.userId}`, _employee)
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

const editSlice = createSlice({
    name: 'apiPost',
    initialState,
    reducers: {},
    extraReducers(builder) {

        builder.addCase(editEmployee.pending, (state) => {
                state.status = 'loading'
              })
              .addCase(editEmployee.fulfilled, (state) => {
                state.status = 'succeeded'
                //put()
              })
              .addCase(editEmployee.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
              })
    }

})
export default editSlice.reducer