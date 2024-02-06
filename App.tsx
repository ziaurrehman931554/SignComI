import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AppProvider } from './AppContext';
import AppContainer from './AppContainer';

export default function App() {
  return (
    <AppProvider>
      <AppContainer />
      <StatusBar style="auto" />
    </AppProvider>
  );
}
