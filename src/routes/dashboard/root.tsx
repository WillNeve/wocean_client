import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../auth';
import { UserType } from '../../auth'

//components
import NavBar from '../../components/NavBar/NavBar';

//subcomponents
import MenuSide from './components/MenuSide';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const { user, finishedLoadingUser } = useContext(UserContext);

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
        <div className='dashboard-wrapper mx-auto p-6 w-100 max-w-screen-xl'>
          <div className="dashboard-inner min-h-[80vh] flex text-gray-200 p-4 font-medium rounded-lg bg-blue-900 ">
            <div className='w-1/4 min-w-[250px] border-r-[1px] border-gray-500'>
              <h1 className='px-4 text-2xl text-gray-300'>Dashboard</h1>
              <MenuSide />
            </div>
            <div className='w-3/4'>

            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Dashboard;
