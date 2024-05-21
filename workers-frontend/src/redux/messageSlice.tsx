import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const http = 'http://localhost:3001';

export const editMessage = createAsyncThunk('', async (id: Number) => {
    try {
        const response = await axios.put(http + `/message/${id}`)
        return response.data
    } catch (error) {
        return error
    }
});