import React, { useEffect, useState } from 'react';
import { useStyle } from '../AppContext';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Home';
import Login from './Login';

interface MainAppProps {
  reset: () => void;
}

export default function MainApp({ reset }: MainAppProps) {
  const { appStyles } = useStyle();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string>('');

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setUserToken(storedToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    }

    checkAuthentication();
  }, []);

  const handleLogin = (email: string) => {
    setUserToken(email);
    AsyncStorage.setItem('userToken', email)
      .then(() => setIsAuthenticated(true))
      .catch((error) => console.error('Error saving token:', error));
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('userToken')
      .then(() => setIsAuthenticated(false))
      .catch((error) => console.error('Error removing token:', error));
  };

  return (
    <View style={[appStyles.container, appStyles.background]}>
      {isAuthenticated ? (
        <Home onLogout={handleLogout} userToken={userToken} reset={reset} />
      ) : (
        <Login onLogin={handleLogin} reset={reset} />
      )}
    </View>
  );
}
