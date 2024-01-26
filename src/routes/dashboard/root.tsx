import React, { useContext, useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/auth';
//components
import Window from '../../components/Window/Window';
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
      <ViewNameContext.Provider value={{viewName: viewName, setViewName}}>
        <Window requestNavigate={navigate}>
          <MenuSide/>
          <View/>
        </Window>
      </ViewNameContext.Provider>
    )
  }
}

export default Dashboard;
