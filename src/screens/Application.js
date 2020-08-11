import React, { useEffect } from 'react'
import { AsyncStorage, Button, Text, TextInput, View, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, appLoaded, showIntro, restoreToken, hideIntro } from '../redux/actions';
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_900Black,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium
} from '@expo-google-fonts/roboto';
import { createStackNavigator } from '@react-navigation/stack';

import HistoryScreen from './/HistoryScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import IntroSlidersScreen from './IntroSlidesScreen';
import PackageDescriptionScreen from './PackageDescriptionScreen';
import MooveVerificationScreen from './MooveVerificationScreen';
import PaymentMethodScreen from './PaymentMethodScreen';
import ActiveMooveDetailsScreen from './ActiveMooveDetailsScreen';
import CreditCardPaymentMethodScreen from './CreditCardPaymentMethodScreen';
import TrackActiveMooveScreen from './TrackActiveMooveScreen';
import BiometricsScreen from './BiometricsScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function Application() {
  const dispatch = useDispatch();
  const state = useSelector(state=>state.auth)

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken, introduced;

      try {
        await AsyncStorage.removeItem('introduced');
        await AsyncStorage.removeItem('userToken');

        userToken = await AsyncStorage.getItem('userToken');
        introduced = await AsyncStorage.getItem('introduced');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch(restoreToken(userToken, introduced));
    };

    bootstrapAsync();
  }, []);


  let [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium
  });

  if (state.isLoading || !fontsLoaded) {
    return <AppLoading />
  }

  if (state.showIntro) {
    return <IntroSlidersScreen />
  }
  console.log(state.userToken)
  return (
    <>
    <StatusBar translucent backgroundColor="transparent" />
    <Stack.Navigator headerMode="none">
      {state.userToken != null && state.userToken != undefined ?
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="PackageDescription" component={PackageDescriptionScreen} />
          <Stack.Screen name="MooveVerification" component={MooveVerificationScreen} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
          <Stack.Screen name="CreditCardPayment" component={CreditCardPaymentMethodScreen} />
          <Stack.Screen name="ActiveMooveDetails" component={ActiveMooveDetailsScreen} />
          <Stack.Screen name="TrackActiveMoove" component={TrackActiveMooveScreen} />

        </>
        :
        <>
          <Stack.Screen name="SignIn" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component = {SignupScreen}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Biometrics" component={BiometricsScreen} />
        </>
      }
    </Stack.Navigator>
    </>
  )
}