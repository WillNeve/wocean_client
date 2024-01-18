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
  const [viewName, setViewName] = useState('notes')
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
        <div className='dashboard-wrapper mt-5 px-4 mx-auto w-100 max-w-5xl'>
          <div className="dashboard-inner relative  h-[80vh] flex text-gray-600 font-medium rounded-lg overflow-hidden bg-white ">
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
