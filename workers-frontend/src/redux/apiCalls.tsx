// import axios from "axios";
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import employee from "../employee";

// export const getEmployee = createAsyncThunk('', async () => {
//   try {
//     const response = await axios.get('https://api.example.com/employee')
//     return response.data
//   } catch (error) {
//     return error
//   }

// });
// export const addEmployee = createAsyncThunk('', async (_employee: employee) => {
//   try {
//     const response = await axios.post('https://api.example.com/employee')
//     return response.data
//   } catch (error) {
//     return error
//   }

// });
// export const editEmployee = createAsyncThunk('', async (_employee: employee) => {
//   try {
//     const response = await axios.put(`https://api.example.com/employee/${_employee.userId}`, _employee)
//     return response.data
//   } catch (error) {
//     return error
//   }

// });
// export const deleteEmployee = createAsyncThunk('', async (_num: number) => {
//   try {
//     const response = await axios.delete(`https://api.example.com/employee/${_num}`)
//     return response.data
//   } catch (error) {
//     return error
//   }

// });


