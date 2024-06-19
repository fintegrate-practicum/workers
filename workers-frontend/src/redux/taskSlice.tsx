import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import task from "../classes/task";
import {  UpdateTaskEmployeeDTO } from "../dto/updateTaskEmployeeDto";
import { UpdateTaskManagerDTO } from "../dto/updateTaskManagerDto";
interface EditTaskArgs {
    taskId: string;
    updateTask: UpdateTaskManagerDTO | UpdateTaskEmployeeDTO;
    employeeType: string; 
}

const http = import.meta.env.VITE_HTTP;
const managerId = import.meta.env.VITE_MANAGERID;
const businessId = import.meta.env.VITE_BUSINESSID;
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

export const createTask = createAsyncThunk('',async (_task: task) => {
    try {
        const response = await axios.post(`${http}/tasks/manager/task`, _task)
        return response.data
    } catch (error) {
        return error
    }
});

export const editTask = createAsyncThunk('',async ({ taskId, updateTask, employeeType }: EditTaskArgs) => {
      try {
        
        const response = await axios.put(`${http}/tasks/task/${taskId}`, updateTask, {
          headers: {
            'employee-type': employeeType
          }
        });

        return response.data;
      } catch (error) {
        return error
      }
    }
);


export const deleteTask = createAsyncThunk('',async (taskId:string) => {
    try {
        const response = await axios.delete(http+`/tasks/manager/task/${taskId}`)
        return response.data
    } catch (error) {
        return error
    }
});