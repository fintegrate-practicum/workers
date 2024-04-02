import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./myStore";
import axios from "axios";
import worker from "../workers";

const res = await axios.get('');
const {workers = {}} = res.data;

const workerSlice = createSlice({
    name: "workers",
    initialState: workers,
    reducers: {
        add: (state, actions: PayloadAction<worker>) => {
            //קריאת שרת post
            state.workers.push(actions.payload)
        },
        remove: (state, actions: PayloadAction<number>) => {
            //קריאת שרת delete
            state.workers = state.workers.filter((worker: worker) => worker.id !== actions.payload)
        },
        update: (state, actions: PayloadAction<worker>) => {
            //קריאת שרת put
            const worker = state.workers.find((worker: worker) => worker.id === actions.payload.id)
            if(worker !== undefined){
                worker.name = actions.payload.name;
                worker.age = actions.payload.age;
            }
        }
    }
})

export const {add, remove, update} = workerSlice.actions;
export const selectWorkers = (state: RootState) => state.workerslice.workers
export default workerSlice.reducer;