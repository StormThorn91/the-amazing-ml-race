import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { User } from './pages/User/User';
import { Admin } from './pages/Admin/Admin';
import { Form } from './pages/Form/Form';
import { Provider } from 'react-redux';
import { store } from './store';
import { Hint } from './pages/Hint/Hint';
import { Reset } from './pages/Reset/Reset';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path="/reset" element={<Reset />} />
        <Route path="/login" element={<Form />} />
        <Route path="/puzzle" element={<Form />} />
        <Route path="/game" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hints" element={<Hint />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
