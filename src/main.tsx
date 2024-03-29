import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

//routes/pages
  // Home / Landing
  import Home from './routes/root';
  // user registry/auth
  import SignUp from './routes/signup/root'
  import SignIn from './routes/signin/root';
  //core
  import Dashboard from './routes/dashboard/root';
  import Editor from './routes/editor/root';
  import Notes from './routes/notes/root';
  // error pages
  import NotFound from './routes/404';

//contexts
import AuthLayer from './contexts/auth';

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
    path: '/notes',
    element: (<Notes/>)
  },
  {
    path: '/notes/new',
    element: (<Editor newNote={true}/>)
  },
  {
    path: '/notes/:note_id',
    element: (<Editor newNote={false}/>)
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
      <RouterProvider router={router}/>
    </AuthLayer>
  </React.StrictMode>
)
