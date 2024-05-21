import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { useAppDispatch } from "./hooks";
import { getAllMessages } from "./apiCalls/messageCalls";


const response = await axios.get('https://api.example.com/messages');
const {data = {}} = response.data;

const messageSlice = createSlice({
    name: "messages",
    initialState: data,
    reducers: {
        getAll: (state ) => {
            const dispatch = useAppDispatch()
            dispatch(getAllMessages())
            state.messages.push()
        }
        
        }
    }
)

export const {getAll} = messageSlice.actions;
export const selectMessage= (state: RootState) => state.messageSlice.messages
export default messageSlice.reducer;

