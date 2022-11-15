import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import UserService from "../../services/user.service";

import {
  getToken as getLocalStorageToken, 
  login as setTokenLocalStorage, 
  logout as removeTokenLocalStorage
} from "../../services/auth";
import { ILoginInterface } from "../../types/user.types";

interface IAuthenticationContext {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<ILoginInterface>;
  logout: () => void;
  getToken: () => string;
  setToken: (token: string) => void;
}

interface IAuthenticationContextProviderProps {
  children: ReactNode;
}


const AuthenticationContext = createContext<IAuthenticationContext>({token: null} as IAuthenticationContext);


export function useAuth(): IAuthenticationContext {
  return useContext<IAuthenticationContext>(AuthenticationContext);
}


export function AuthenticationContextProvider ({children}: IAuthenticationContextProviderProps) : JSX.Element{
  const [_token, _setToken] = useState<string | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const userService = useRef(new UserService());

  const login = async (email: string, password: string) => {    
    return await userService.current.login(email, password);
  }

  const getToken = () => getLocalStorageToken();

  const setToken = (token) => {
    setTokenLocalStorage(token);
    _setToken(token);
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
    removeTokenLocalStorage();
  };

  useEffect(()=> {
    setAuthenticated(getToken() != null);
  },[])

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        token: _token,
        getToken,
        setToken,
        login,
        logout
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}