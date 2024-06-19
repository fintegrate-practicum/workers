import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import employee from "../classes/employee";

const http = import.meta.env.VITE_HTTP;
const businessId = import.meta.env.VITE_BUSINESSID;
const res = await axios.get(http+`/workers?businessId=${businessId}`);
const { data = {} } = res.data;

const employeeSlice = createSlice({
    name: "employees",
    initialState: data,
    reducers: {}
})

export const { } = employeeSlice.actions;
export const selectEmployees = (state :RootState) => state.employeeSlice.employees
export default employeeSlice.reducer;

export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await axios.post(http+'/workers', _employee)
        return response.data
    } catch (error) {
        return error
    }
});

export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
    try {
        const response = await axios.delete(http+`/workers/${_num}`)
        return response.data
    } catch (error) {
        return error
    }
});

export const editEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await axios.put(http+`/workers/${_employee._id}`, _employee)
        return response.data
    } catch (error) {
        return error
    }
});