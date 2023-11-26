"use client"
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import Cookies from "js-cookie"
import jwt from "jsonwebtoken";

import { $api } from '@/core/axios';
interface IUserContext {
	userId: number | null;
	setUserId: (userId: number | null) => void;
	isAuth: boolean;
	setIsAuth: (isAuth: boolean) => void;
	isLoading: boolean | null;
	setIsLoading: (isLoading: boolean) => void;
}

interface UserProviderProps {
	children: ReactNode;
}

const UserContext = createContext<IUserContext>({
	userId: null,
	setUserId: () => {},
	isAuth: false,
	setIsAuth: () => {},
	isLoading: null,
	setIsLoading: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  useEffect(() => {
    const handleAuthorizationCallback = () => {
      // Считываем значения cookies
      const accessToken = Cookies.get('access_token');

      if (accessToken) {
        localStorage.setItem('token', accessToken)		
        try {
          const decodedToken = jwt.decode(accessToken);
          // Извлекаем ID пользователя из декодированного токена
          const userId = (decodedToken?.sub) || '';
          setUserId(Number(userId));
        
          console.log('ID пользователя:', userId);
        } catch (error) {
          console.error('Ошибка при декодировании токена', error);
        }
        console.log('Успешная авторизация');
      } else {
        console.error('Ошибка авторизации');
      }
    };

    async function checkAuth () {
      setIsLoading(true)
      try {
        const response = await $api.post('/api/v1/user/check_access/')

        if(response.status === 200) {
          setIsAuth(true)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    handleAuthorizationCallback();
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, isAuth, setIsAuth, isLoading,  setIsLoading}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserId must be used within a UserProvider');
  }
  return context;
};
