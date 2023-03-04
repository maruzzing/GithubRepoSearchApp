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

import RootNavigation from '@/navigation/RootNavigation';

import { store } from '@/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
