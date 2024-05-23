import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

const http = 'http://localhost:3001/'
const res = await axios.get(`${http}message/664ba623dcc176acb8cbdf69`)
const { data = {} } = res.data;

const messageSlice = createSlice({
    name: "message",
    initialState: data,
    reducers: {}
})
export const { } = messageSlice.actions;
export const selectMessage = (state: RootState) => state.messageSlice.messages;
export default messageSlice.reducer;

export const editMessage = createAsyncThunk('', async (id: number) => {
    try {
        const response = await axios.put(`${http}message/${id}`)
        return response.data
    } catch (error) {
        return error
    }
});