import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import * as Linking from 'expo-linking';
import Application from './src/screens/Application';
import { Provider } from 'react-redux';
import store from './src/redux/store'

export default function App({ navigation }) {

  const prefix = Linking.makeUrl('/');

    const linking = {
      prefixes: [prefix],
      // config: {
      //   screens: {
      //     RegistrationVerifySuccessfulScreen: 'verify',
      //     PasswordResetScreen: {
      //       path:'reset/:email',
      //       params: {
      //         email :null,
      //         }
      //       },
      //   },
      // },
    };

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking} fallback={<Text>Please hold on...</Text>}>
        <Application />
      </NavigationContainer>
    </Provider>
  );
}