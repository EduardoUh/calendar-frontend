import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { CalendarApp } from './CalendarApp';

import './styles.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <CalendarApp />
    {/* </React.StrictMode> */}
  </Provider>
)
