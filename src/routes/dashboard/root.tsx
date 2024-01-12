import React, { useCallback, useContext, useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../auth';
import { UserType } from '../../auth'

//components
import NavBar from '../../components/NavBar/NavBar';
//subcomponents
import MenuSide from './components/MenuSide';
//views
import Notes from './views/Notes';
import Overview from './views/Overview';
import Account from './views/Account';

interface ViewNameContextType {
  viewName: string,
  setViewName: React.Dispatch<React.SetStateAction<string>> | null,
}

export const ViewNameContext = createContext<ViewNameContextType>({viewName: 'notes', setViewName: null });

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [viewName, setViewName] = useState('notes')
  const [activeView, setActiveView] = useState((<></>));

  const { user, finishedLoadingUser } = useContext(UserContext);

  const setView = useCallback((viewName: string) => {
    if (viewName === 'notes') {
      setActiveView((<Notes />))
    } else if (viewName === 'overview') {
      setActiveView((<Overview />))
    } else if (viewName === 'account') {
      setActiveView((<Account />))
    }
  }, [setActiveView])

  useEffect(() => {
    setView(viewName)
  }, [setView, viewName])

  const getAuthStatus = async (user: UserType) => {
    const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/test-auth/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
      },
    })
    return resp.status;
  }

  useEffect(() => {
    if (finishedLoadingUser) {
      if (user) {
        getAuthStatus(user)
      } else {
        navigate('/signin')
      }
    }
  }, [user, finishedLoadingUser, navigate])

  if (user) {
    return (
      <>
        <NavBar requestNavigate={navigate}/>
        <ViewNameContext.Provider value={{viewName: viewName, setViewName}}>
        <div className='dashboard-wrapper px-4 mt-5 mx-auto w-100 max-w-screen-xl'>
          <div className="relative dashboard-inner h-[80vh] flex text-gray-300 p-4 font-medium rounded-lg bg-blue-900 ">
            <div className='w-1/4 min-w-[200px] border-r-[1px] border-gray-500'>
              <div className="top mb-4">
                <h1 className='px-4 text-2xl'>Dashboard</h1>
                <p className='px-4 font-light text-gray-400'>Welcome, <em className='not-italic'>{user.username}</em></p>
              </div>
              <MenuSide />
            </div>
            <div className='w-3/4 px-4 text-gray-400'>
              {activeView}
            </div>
          </div>
        </div>
        </ViewNameContext.Provider>
      </>
    )
  }
}

export default Dashboard;
