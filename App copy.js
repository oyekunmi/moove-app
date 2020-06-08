import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import HomeScreen from './Screens/HomeScreen';
import AuthContext from './AuthContext';
import LoginScreen from './Screens/LoginScreen';
import IntroSliders from './IntroSlides';
import {
  useFonts,
  Roboto_900Black,
  Roboto_400Regular
} from '@expo-google-fonts/roboto';
import HistoryScreen from './Screens/HistoryScreen';

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'SHOWN_INTRO':
          return {
            ...prevState,
            shownIntro: true,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      shownIntro: false,
    }
  );

  
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);


  let [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_400Regular
  });

  if (state.isLoading || !fontsLoaded) {
    return <AppLoading />
  }

  if (!state.shownIntro) {
    return <IntroSliders onDone={() => dispatch({ type: 'SHOWN_INTRO' })} />
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken != null ?
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="History" component={HistoryScreen} />
            </>
            :
            <>
              <Stack.Screen name="SignIn" component={LoginScreen} />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}