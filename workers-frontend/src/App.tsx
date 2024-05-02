import './App.css';
import { useAppSelector } from './redux/hooks';


const App = () => {
  const data = useAppSelector(state => state.employeeSlice)
  console.log(data);
  return (
    <>
      <h1>hello</h1>
    </>

  );
};


export default App;
