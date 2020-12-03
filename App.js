import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import Application from './src/screens/Application';
import { Provider } from 'react-redux';
import store from './src/redux/store'

export default function App({ navigation }) {


  return (
    <Provider store={store}>
      <NavigationContainer fallback={<Text>Please hold on...</Text>}>
        <Application />
      </NavigationContainer>
    </Provider>
  );
}