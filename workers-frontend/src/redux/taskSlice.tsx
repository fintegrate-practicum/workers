import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import task from "../task";

const managerId = 1; //from auth0
const res = await axios.get(`http://localhost:3001/tasks/manager/${managerId}/new-task:managerId/new-task`);
const {data = {}} = res.data;
// const {data = {}} = {};

const taskSlice = createSlice({
    name: "tasks",
    initialState: data,
    reducers: {}
})

export const {} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.taskSlice.tasks;
export default taskSlice.reducer;

export const createTask = createAsyncThunk('', async (_task: task) => {
    
    try {        
        const response = await axios.post(`http://localhost:3001/tasks/manager/${managerId}/new-task`, _task)
        return response.data
    } catch (error) {
        return error
    }
});