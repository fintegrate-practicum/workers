import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { useAppDispatch } from "./hooks";
import { getAllMessages, updateIsRead } from "./apiCalls/messageCalls";


const response = await axios.get('https://localhost:3001/messages');
const { data = {} } = response.data;

const messageSlice = createSlice({
    name: "messages",
    initialState: data,
    reducers: {
        getAll: (state) => {
            const dispatch = useAppDispatch()
            dispatch(getAllMessages())
            state.message.push()
        },
        updateIsRead: (state, action: PayloadAction<number>) => {
            const dispatch = useAppDispatch();
            const messageId = action.payload;
            dispatch(updateIsRead(messageId));
            // const foundMessage = state.find((message: any) => message.id === messageId);
            // if (foundMessage) {
            //     foundMessage.isRead = true;
            // }
        }
    }
}
)

export const { getAll } = messageSlice.actions;
export const selectMessage = (state: RootState) => state.messageSlice.messages
export default messageSlice.reducer;