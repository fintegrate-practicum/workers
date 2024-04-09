import axios from 'axios'; 
export const GET_WORKER = 'GET_WORKER';
const GetWorkers = () => {
  return async dispatch=> {
    try {
      const response = await axios.get('https://reqres.in/api/workers');
      const workers = response.data;
      dispatch({
        type: GET_WORKER,
        payload: workers, 
      });
    } catch (error) {
      console.error('error', error); 
    }
  };
};

export default GetWorkers;
