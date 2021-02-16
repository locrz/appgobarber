import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthContextData {
  user: IUser;
  isSigned: boolean;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(): Promise<void>;
  updateUser(user: IUser): Promise<void>;
}

interface AuthState {
  user: IUser;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const [storagedToken, storagedUser] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      const token = storagedToken[1];
      const user = storagedUser[1];

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({token, user: JSON.parse(user)});
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({email, password}: SignInCredentials) => {
    const response = await api.post('/sessions', {email, password});

    const {token, user} = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:user', JSON.stringify(user)],
      ['@GoBarber:token', token],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({token, user});
  }, []);

  const signUp = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: IUser) => {
      setData({
        token: data.token,
        user,
      });

      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        isSigned: !!data.user,
        loading,
        signIn,
        signUp,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
