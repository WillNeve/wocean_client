import React, { useCallback, useContext, useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../auth';
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


  useEffect(() => {
    if (finishedLoadingUser) {
      if (!user) {
        navigate('/signin');
      }
    }
  }, [user, finishedLoadingUser, navigate])

  if (user) {
    let formattedViewName = viewName === 'notes' ? 'all' : viewName;
    formattedViewName = formattedViewName[0].toUpperCase() + formattedViewName.substring(1);
    return (
      <>
        <NavBar requestNavigate={navigate}/>
        <ViewNameContext.Provider value={{viewName: viewName, setViewName}}>
        <div className='dashboard-wrapper px-4 mt-5 mx-auto w-100 max-w-5xl'>
          <div className="relative dashboard-inner h-[80vh] flex text-gray-300 px-2 py-4 min-[700px]:px-4 font-medium rounded-lg bg-sky-900 ">
            <div className='min-w-[85px] w-[20%] min-[700px]:w-[30%] border-r-[1px] border-gray-500'>
              <div className="hidden top mb-4 min-[700px]:block">
                <h1 className='px-4 text-2xl text-gray-300'>Dashboard</h1>
                <p className='px-4 font-light text-gray-400'>Welcome, <em className='not-italic'>{user.username}</em></p>
              </div>
              <MenuSide />
            </div>
            <div className='w-3/4 px-4 text-gray-400'>
              <div className="block top mb-4 min-[700px]:hidden">
                <h1 className='text-xl text-gray-300'>Dashboard - {formattedViewName}</h1>
                <p className='text-sm font-light text-gray-400'>Welcome, <em className='not-italic'>{user.username}</em></p>
              </div>
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
