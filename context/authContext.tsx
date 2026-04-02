import type { ReactNode } from "react";
import authService from "../service/authService";
import type { user } from "../types/user";

import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store'; // ou AsyncStorage
import { Text } from "react-native";

type User = user | null;
type AuthState = { isLoading: boolean; user: User; token: string | null };

type Action =
  | { type: 'RESTORE'; token: string | null; user: User }
  | { type: 'SIGN_IN'; token: string; user: User }
  | { type: 'SIGN_OUT' };

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'RESTORE':
      return { ...state, isLoading: false, token: action.token, user: action.user };
    case 'SIGN_IN':
      return { ...state, isLoading: false, token: action.token, user: action.user };
    case 'SIGN_OUT':
      return { ...state, isLoading: false, token: null, user: null };
    default:
      return state;
  }
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    user: null,
    token: null,
  });

  // Restore token au démarrage de l'app
  useEffect(() => {
    const init = async () => {
      let token: string | null = null;
      let user: User = null;
      try {
        token = await localStorage.getItem('jwtToken');
        if (token) {
          const res = await authService.me();
          user = await res.data.user;
        }
      } catch (e) {
        token = null;
      }
      dispatch({ type: 'RESTORE', token, user });
    };
    init();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        const res = await authService.login({ email, password });
        const token = res.data.token;
        const user = res.data.user;
        await localStorage.setItem('jwtToken',token );
        dispatch({ type: 'SIGN_IN', token, user });
        return res.data;
      },
      signOut: async () => {
        await authService.logout();
        await localStorage.removeItem('jwtToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      // signUp peut appeler signIn après création du compte
    }),
    []
  );

  if (state.isLoading) {
    return <Text>chargement...</Text>; // ton écran de chargement
  }

  return (
    <AuthContext.Provider value={{ ...authContext, user: state.user, token: state.token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hooks utiles
export const useAuth = () => useContext(AuthContext);

export const useIsSignedIn = () => {
  const { user } = useAuth();
  return !!user;
};

export const useIsSignedOut =  () =>{ 
  return !useIsSignedIn();
};

export const useIsStudent = () => {
  const { user } = useAuth();
  console.log(user?.role);
  return user?.role === 'student';
};

export const useIsProfessor = () => {
  const { user } = useAuth();
  return user?.role === 'professor';
};