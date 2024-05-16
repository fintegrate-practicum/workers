import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import task from "../task";

const {data = {}} = {};

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
        console.log(_task);          
        const response = await axios.post(`http://localhost:3001/tasks/manager/new-task`, _task)
        console.log(response.data); 
        return response.data
    } catch (error) {
        return error
    }
});