import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//components
import NavBar from './components/NavBar';

//routes/pages
import Root from './routes/root';
import SignUp from './routes/signup/root'
import SignIn from './routes/signin/root';
import NotFound from './routes/404';

//contexts
import AuthLayer from './auth';

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
    path: '/signin',
    element: (<SignIn />)
  },
  {
    path: '*',
    element: (<NotFound/>)
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthLayer>
      <NavBar/>
      <RouterProvider router={router}/>
    </AuthLayer>
  </React.StrictMode>
)
