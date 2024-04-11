import { createSlice } from "@reduxjs/toolkit";
import { getEmployee, addEmployee, deleteEmployee, editEmployee } from "./apiCalls";
//import {get,post,put,delete} from "./redux"

export interface State {
  employees: Employee[];
  status: string;
  error: string | undefined;
}

const initialState: State = {
  employees: [],
  status: 'idle',
  error: undefined,
};

const apiSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getEmployee.pending, (state) => {
      state.status = 'loading'
    })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // get()

      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }).addCase(addEmployee.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded'
        //post()
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(editEmployee.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded'
        //put()
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded'
        //delete()
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

  }
})

export default apiSlice.reducer