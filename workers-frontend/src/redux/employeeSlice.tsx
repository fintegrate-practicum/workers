import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import employee from "../employee";
import { useAppDispatch } from "./hooks";
import {addEmployee} from './apiCalls/postCall'
import {deleteEmployee} from "./apiCalls/deleteCall";
import {editEmployee} from './apiCalls/putCall'


const res = await axios.get('');
const {employees = {}} = res.data;

const employeeSlice = createSlice({
    name: "employees",
    initialState: employees,
    reducers: {
        add: (state, actions: PayloadAction<employee>) => {
            const dispatch = useAppDispatch()
            dispatch(addEmployee(actions.payload))
            state.employees.push(actions.payload)
        },
        remove: (state, actions: PayloadAction<number>) => {
            const dispatch = useAppDispatch()
            dispatch(deleteEmployee(actions.payload))
            state.employees = state.employees.filter((employee: employee) => employee.userId !== actions.payload)
        },
        update: (state, actions: PayloadAction<employee>) => {
            const dispatch = useAppDispatch()
            dispatch(editEmployee(actions.payload))
            const employee = state.employees.find((employee: employee) => employee.userId === actions.payload.userId)
            if(employee !== undefined){
                employee.updatedBy = actions.payload.updatedBy;
                employee.position = actions.payload.position;
            }
        }
    }
})

export const {add, remove, update} = employeeSlice.actions;
export const selectEmployees = (state: RootState) => state.employeeSlice.employees
export default employeeSlice.reducer;