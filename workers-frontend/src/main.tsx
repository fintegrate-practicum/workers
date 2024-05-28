import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.tsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Route>
        <Link></Link>
      </Route>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
