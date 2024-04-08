import { WorkersActionTypes } from "./apiCalls";

export interface State {
  workers: Worker[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  workers: [],
  loading: false,
  error: null,
};

export const workersReducer = (state = initialState, action: WorkersActionTypes): State => {
  switch (action.type) {
    case 'GET_WORKERS_REQUEST':
      return { ...state, loading: true };
    case 'GET_WORKERS_SUCCESS':
      return { ...state, loading: false, workers: action.workers };
    case 'GET_WORKERS_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};