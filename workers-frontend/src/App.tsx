// 
// import React from 'react';
// import { Provider } from 'react-redux';
// import store from '../src/redux/store';
// import MessageList from '../src/components/messageList';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <div>
//         <h1>Messages :</h1>
//         <MessageList />
//       </div>
//     </Provider>
//   );
// };

// export default App;
// App.tsx
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store, { useAppDispatch } from "./redux/store";
import MessageList from "../src/components/messageList";
import { fetchEmployees } from "./redux/employeeSlice"; // You might need to create this thunk to fetch employees

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployees()); // Assuming fetchEmployees is defined in your employeeSlice
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>Messages</h1>
          <Switch>
            <Route path="/messages" component={MessageList} />
            {/* Add other routes as needed */}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
