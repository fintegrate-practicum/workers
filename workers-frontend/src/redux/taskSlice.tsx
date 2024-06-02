import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import task from "../classes/task";
import {  UpdateTaskEmployeeDTO } from "../dto/updateTaskEmployeeDto";
import { UpdateTaskManagerDTO } from "../dto/updateTaskManagerDto";

const http = 'http://localhost:3001';//process.env.REACT_APP_HTTP;
const managerId = '1234managet'; //from auth0
const businessId = 'company123'; //from auth0
const response = await axios.get(`${http}/tasks/manager/${businessId}/${managerId}`);
const { data = {} } = response.data;

const taskSlice = createSlice({
    name: "tasks",
    initialState: data,
    reducers: {}
})

export const { } = taskSlice.actions;
export const selectTasks = (state: RootState) => state.taskSlice.tasks;
export default taskSlice.reducer;

export const createTask = createAsyncThunk('', async (_task: task) => {
    try {
        const response = await axios.post(`${http}/tasks/manager/task`, _task)
        return response.data
    } catch (error) {
        return error
    }
});


export const editTaskManager = createAsyncThunk('', async ({ taskId, updateTask }: { taskId: string, updateTask: UpdateTaskManagerDTO }, { rejectWithValue }) => {
    try {
        console.log(updateTask); 
        const response = await axios.put(`${http}/tasks/manager/task/${taskId}`, updateTask);
        return response.data;
    } catch (error) {
        return error
    }
});
export const editTaskEmployee = createAsyncThunk('', async ({ taskId, updateTask }: { taskId: string, updateTask: UpdateTaskEmployeeDTO }, { rejectWithValue }) => {
    try {
        console.log(updateTask); 
        const response = await axios.put(`${http}/tasks/employee/task/${taskId}`, updateTask);
        return response.data;
    } catch (error) {
        return error
    }
});

export const deleteTask = createAsyncThunk('', async (taskId:string) => {
    try {
        const response = await axios.delete(http+`/tasks/manager/task/${taskId}`)
        return response.data
    } catch (error) {
        return error
    }
});