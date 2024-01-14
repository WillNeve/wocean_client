import React, { useState, useEffect, createContext } from "react";

import { Dispatch, SetStateAction } from 'react';

interface AuthLayerProps {
  children: React.ReactNode
}

export interface UserType {
  id: number,
  username: string,
  email: string,
  token: string | null
}

interface UserContextType {
  user: null | UserType,
  setUser: Dispatch<SetStateAction<null | UserType>> | null,
  finishedLoadingUser: boolean
}

export const UserContext = createContext<UserContextType>({user: null, setUser: null, finishedLoadingUser: false})

const AuthLayer: React.FC<AuthLayerProps> = ({children}) => {
  const [user, setUser] = useState<null | UserType>(null)
  const [finishedLoadingUser, setFinishedLoadingUser] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      console.log('STORED USER FROM SESSION,', storedUser);

      setUser(JSON.parse(storedUser));
    }
    setFinishedLoadingUser(true)
  }, []);

  useEffect(() => {
    if (finishedLoadingUser) {
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("user");
      }
    }
  }, [user, finishedLoadingUser]);

  return (
    <UserContext.Provider value={{ user, setUser, finishedLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthLayer;
