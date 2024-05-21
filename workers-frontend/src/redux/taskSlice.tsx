import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import task from "../classes/task";

const http = 'http://localhost:3001';//process.env.REACT_APP_HTTP;
const managerId = '1234managet'; //from auth0

const response = await axios.get(`${http}/tasks/manager/${managerId}/all-tasks`);

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

export const getAllTasks = createAsyncThunk(
    '/getAllTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(http + 'tasks/manager/rrr/all-tasks');
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);