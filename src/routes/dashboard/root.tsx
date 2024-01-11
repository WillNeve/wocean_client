import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../auth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  if (user) {
    return (
      <div>
        <h1>Dashboard for { user.username }</h1>
      </div>
    )
  } else {
    navigate('/signin')
  }
}

export default Dashboard;
