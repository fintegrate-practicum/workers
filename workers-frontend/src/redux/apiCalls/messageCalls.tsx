import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";

export const getAllMessages = createAsyncThunk(
    'employees/getAllMessages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3001/message/all-message');
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);
export const updateIsRead = createAsyncThunk(
    'employees/updateIsRead',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3001/message/updateRead/${id}`);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export interface State {
    status: string;
    error: string | undefined;
}

const initialState: State = {
    status: 'idle',
    error: undefined,
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers(builder) {

        builder
            .addCase(getAllMessages.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllMessages.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateIsRead.pending, (state) => {
                state.status = 'updating'
            })
            .addCase(updateIsRead.fulfilled, (state) => {
                state.status = 'update_succeeded'
            })
            .addCase(updateIsRead.rejected, (state, action) => {
                state.status = 'update_failed'
                state.error = action.error.message
            });
    }

})

export default messagesSlice.reducer