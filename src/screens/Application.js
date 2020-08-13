import React from 'react'
import { AsyncStorage, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from '../redux/actions';
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_900Black,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium
} from '@expo-google-fonts/roboto';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HistoryScreen from './/HistoryScreen';
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
import PasswordResetScreen from './PasswordResetScreen';
import PasswordUpdateSuccessfulScreen from './PasswordUpdateSuccessfulScreen';
import RegistrationVerifySuccessfulScreen from './RegistrationVerifySuccessfulScreen';
import AddCardSuccessfulScreen from './AddCardSuccessfulScreen';
import HomeDrawerScreen from './HomeDrawerScreen';

const Stack = createStackNavigator();


export default function Application() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth)

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
            <Stack.Screen name="Home" component={HomeDrawerScreen} />
            <Stack.Screen name="History" component={HomeDrawerScreen} />
            <Stack.Screen name = "Wallet" component = {HomeDrawerScreen}/>
            <Stack.Screen name="PackageDescription" component={PackageDescriptionScreen} />
            <Stack.Screen name="MooveVerification" component={MooveVerificationScreen} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
            <Stack.Screen name="CreditCardPayment" component={CreditCardPaymentMethodScreen} />
            <Stack.Screen name="ActiveMooveDetails" component={ActiveMooveDetailsScreen} />
            <Stack.Screen name="TrackActiveMoove" component={TrackActiveMooveScreen} />
            <Stack.Screen name="AddCardCardSuccess" component={AddCardSuccessfulScreen} />


          </>
          :
          <>
            <Stack.Screen name="SignIn" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
            <Stack.Screen name="Biometrics" component={BiometricsScreen} />
            <Stack.Screen name="PasswordUpdateSuccess" component={PasswordUpdateSuccessfulScreen} />
            <Stack.Screen name="RegistrationVerifySuccess" component={RegistrationVerifySuccessfulScreen} />
          </>
        }
      </Stack.Navigator>
    </>
  )
}