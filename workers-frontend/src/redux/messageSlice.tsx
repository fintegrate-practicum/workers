
import {  createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
const http='http://localhost:3001/'
const res =await axios.get(`${http}message/664c4ced63112b0c0f736930`)
const { data = {} } = res.data;
const messageSlice = createSlice({
    name: "messages",
    initialState: data,
    reducers: {}
})

export const { } = messageSlice.actions;
export const selectMessage = (state: RootState) => state.messageSlice.messages;
export default messageSlice.reducer;


