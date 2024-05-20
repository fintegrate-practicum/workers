import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import employee from "../employee";
const businessId = 1; //from auth0
const res = await axios.get(`http://localhost:3001/workers?businessId=${businessId}`);
const { data = {} } = res.data;
// const {data = {}} = {};

const employeeSlice = createSlice({
    name: "employees",
    initialState: data,
    reducers: {}
})

export const { } = employeeSlice.actions;
export const selectEmployees = (state: RootState) => state.employeeSlice.employees
export default employeeSlice.reducer;

export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await axios.post('http://localhost:3001/workers', _employee)
        return response.data
    } catch (error) {
        return error
    }
});

export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
    try {
        const response = await axios.delete(`http://localhost:3001/workers/${_num}`)
        return response.data
    } catch (error) {
        return error
    }
});

export const editEmployee = createAsyncThunk('', async (_employee: employee) => {
    try {
        const response = await axios.put(`http://localhost:3001/workers/${_employee.userId}`, _employee)
        return response.data
    } catch (error) {
        return error
    }
});