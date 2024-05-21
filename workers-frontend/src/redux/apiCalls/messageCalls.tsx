import axios from "axios";
import { createAsyncThunk ,createSlice} from '@reduxjs/toolkit'

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

  export interface State {
    status: string;
    error: string | undefined;
}

const initialState: State = {
    status: 'idle',
    error: undefined,
};

const getAllSlice = createSlice({
    name: 'apiGetAll',
    initialState,
    reducers: {},
    extraReducers(builder) {

        builder.addCase(getAllMessages.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getAllMessages.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }

})
export default getAllSlice.reducer