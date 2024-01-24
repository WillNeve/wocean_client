import React, { useContext, useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../auth';
//components
import NavBar from '../../components/NavBar/NavBar';
//subcomponents
import MenuSide from './components/MenuSide';
import View from './components/View';

interface ViewNameContextType {
  viewName: string,
  setViewName: React.Dispatch<React.SetStateAction<string>> | null,
}

export const ViewNameContext = createContext<ViewNameContextType>({viewName: 'notes', setViewName: null });

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [viewName, setViewName] = useState('overview')
  const { user, finishedLoadingUser } = useContext(UserContext);



  useEffect(() => {
    if (finishedLoadingUser) {
      if (!user) {
        navigate('/signin');
      }
    }
  }, [user, finishedLoadingUser, navigate])

  if (user) {
    return (
      <>
        <NavBar requestNavigate={navigate}/>
        <ViewNameContext.Provider value={{viewName: viewName, setViewName}}>
        <div className='dashboard-wrapper mt-5 px-4 mx-auto w-100 max-w-5xl h-[85lvh]'>
          <div className="dashboard-inner flex border border-gray-600 relative h-full text-gray-400 font-medium rounded-lg overflow-hidden shadow-2xl shadow-waveLight-500/10">
            <MenuSide/>
            <View/>
          </div>
        </div>
        </ViewNameContext.Provider>
      </>
    )
  }
}

export default Dashboard;
