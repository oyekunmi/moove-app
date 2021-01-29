import React from 'react'
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken, signIn } from '../redux/actions';
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_900Black,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium
} from '@expo-google-fonts/roboto';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import IntroSlidersScreen from './IntroSlidesScreen';
import BiometricsScreen from './BiometricsScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import PasswordResetScreen from './PasswordResetScreen';
import PasswordUpdateSuccessfulScreen from './PasswordUpdateSuccessfulScreen';
import RegistrationVerifySuccessfulScreen from './RegistrationVerifySuccessfulScreen';
import VerifyEmailScreen from './VerifyEmailScreen';
import PasswordResetEmailSentScreen from './PasswordResetEmailSentScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MooveFlow from './MooveFlow';
import TokenVerificationScreen from './TokenVerificationScreen';


const Stack = createStackNavigator();


export default function Application() {
  const dispatch = useDispatch();
  const state = useSelector(s => s.auth)
  // console.log("reload app");
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let introduced, token, name, phoneNo;

      try {
        // await AsyncStorage.removeItem('userDetails');
        introduced = await AsyncStorage.getItem('introduced');
        const userDetails = await AsyncStorage.getItem('userDetails');
        ({ token, name, phoneNo } = JSON.parse(userDetails));

        dispatch(signIn(token, name, phoneNo));

      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch(restoreToken(token, introduced));
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

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator headerMode="none">
        {state.userToken != null && state.userToken != undefined ?
          <>
            <Stack.Screen name="MooveFlow" component={MooveFlow} />
            <Stack.Screen name="RegistrationVerifySuccessfulScreen" component={RegistrationVerifySuccessfulScreen} />
          </>
          :
          <>
            <Stack.Screen name="SignIn" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="TokenVerificationScreen" component={TokenVerificationScreen} />
            <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
            <Stack.Screen name="Biometrics" component={BiometricsScreen} />
            <Stack.Screen name="PasswordUpdateSuccess" component={PasswordUpdateSuccessfulScreen} />
            <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
            <Stack.Screen name="PasswordResetEmailSentScreen" component={PasswordResetEmailSentScreen} />
          </>
        }
      </Stack.Navigator>
    </>
  )
}