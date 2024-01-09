import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//components
import Root from './routes/root';
import SignUp from './routes/signup/root'
// styles
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<Root/>)
  },
  {
    path: '/signup',
    element: (<SignUp/>)
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
