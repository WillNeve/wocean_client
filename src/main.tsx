import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//components
import NavBar from './components/NavBar';

//routes/pages
import Root from './routes/root';
import SignUp from './routes/signup/root'
import NotFound from './routes/404';

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
  },
  {
    path: '*',
    element: (<NotFound/>)
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar/>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
