import './App.css';
import Tami from './components/Tami';
import WelcomeMessage from './components/WelcomeMessage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
     <Router>
      <Routes>
        <Route path='/' element={  <WelcomeMessage/>}></Route>
        <Route path='Tami' element={  <Tami/>}></Route>
      </Routes>
    </Router>
  );
};
export default App;