import axios from "axios";
import { ThunkAction } from "redux-thunk";

export type Worker = {
  id: number;
  name: string;
};

export type GetWorkersAction = {
  type: 'GET_WORKERS';
  workers: Worker[];
};

export type GetWorkersRequestAction = {
  type: 'GET_WORKERS_REQUEST';
};

export type GetWorkersSuccessAction = {
  type: 'GET_WORKERS_SUCCESS';
  workers: Worker[];
};

export type GetWorkersFailureAction = {
  type: 'GET_WORKERS_FAILURE';
  error: string;
};

export type WorkersActionTypes =
  | GetWorkersAction
  | GetWorkersRequestAction
  | GetWorkersSuccessAction
  | GetWorkersFailureAction;

  export const getWorkers = (): ThunkAction<void, State, unknown, WorkersActionTypes> => {
    return (dispatch) => {
      // dispatch({ type: 'GET_WORKERS_REQUEST' });
  
      return axios.get('https://api.example.com/workers')
        .then(response => {
          dispatch({ type: 'GET_WORKERS_SUCCESS', workers: response.data });
        })
        .catch(error => {
          dispatch({ type: 'GET_WORKERS_FAILURE', error: error.message });
        });
    };
  };
  