import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./messageSlice";
import employeeSlice from "./employeeSlice";
import taskSlice from "./taskSlice";
// import messageSlice from "./messageSlice"
const store = configureStore({

    reducer: {
        employeeSlice,
<<<<<<< HEAD
        taskSlice,
        // messageSlice,
=======
        messageSlice,
        taskSlice
>>>>>>> main
    }

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;