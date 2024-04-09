import { GET_WORKER } from "../actions/action";

const initialState={
    Workers:[],
    loading:false,
};
export default(state=initialState,action:)=>{
    switch(action.type){
        case GET_WORKER: {
            return{
                ...state,
                Workers:action.worker,
                loading:false
            }
        }
        default:
            return state
    }
}