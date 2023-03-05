/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigation from '@/navigation/RootNavigation';

import Snackbar from '@/components/common/Snackbar';

import { store } from '@/store';

import theme from '@/styles/theme';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <NavigationContainer>
            <RootNavigation />
            <Snackbar />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
