import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Summary from "./components/Summary";
import Expenses from "./components/Expenses";
import Incomes from './components/Incomes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Oh no!</div>,
    children: [
      {
        path: "",
        element: <Summary />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
      {
        path: "incomes",
        element: <Incomes />,
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
