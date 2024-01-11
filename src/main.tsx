import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//components
import NavBar from './components/NavBar';

//routes/pages
  // Home / Landing
  import Home from './routes/root';
  // user registry/auth
  import SignUp from './routes/signup/root'
  import SignIn from './routes/signin/root';
  //core
  import Dashboard from './routes/dashboard/root';
  import Editor from './routes/editor/root';
  // error pages
  import NotFound from './routes/404';

//contexts
import AuthLayer from './auth';

// styles
import './index.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: (<Home/>)
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
    path: '/edit/:id',
    element: (<Editor/>)
  },
  {
    path: '/dashboard',
    element: (<Dashboard/>)
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
