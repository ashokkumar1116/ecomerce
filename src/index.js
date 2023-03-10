import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store, persistor } from './store/store';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react'

const entryPoint = document.getElementById("root");
ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  // </React.StrictMode>
  entryPoint
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
