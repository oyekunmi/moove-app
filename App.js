import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Application from './src/screens/Application';
import { Provider } from 'react-redux';
import store from './src/redux/store'

export default function App({ navigation }) {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Application />
      </NavigationContainer>
    </Provider>
  );
}