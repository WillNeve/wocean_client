import React, { useState, useEffect, createContext } from "react";

import { Dispatch, SetStateAction } from 'react';

interface AuthLayerProps {
  children: React.ReactNode
}

interface UserType {
  id: number,
  username: string,
  email: string,
  token: string | null
}

interface UserContextType {
  user: null | UserType;
  setUser: Dispatch<SetStateAction<null | UserType>> | null;
}

export const UserContext = createContext<UserContextType>({user: null, setUser: null})

const AuthLayer: React.FC<AuthLayerProps> = ({children}) => {
  const [user, setUser] = useState<null | UserType>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthLayer;
