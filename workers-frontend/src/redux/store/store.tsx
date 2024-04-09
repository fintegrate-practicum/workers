import { createStore,applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {reducers} from "../reducers"
import { GET_WORKER } from "../actions/action";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";

const persistconfig={
    key:'root',
    storage:'storge'
}
const middlewares=[thunk]
const logger = createLogger();
middlewares.push(logger)
const persistedReducer=persistReducer(persistconfig,reducers)
export default ()=>{

    let store=createStore(
        persistedReducer,
        applyMiddleware(...middlewares)

    )
    let persiststore=persistStore(store)
    return {store,persiststore}
}


