import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Text, Image, AsyncStorage , Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';
import { signIn, isAppLoading, isBtnDisabled } from '../redux/actions';
import { userSignIn } from '../utils/helpers/api';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import Title from '../components/Title';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TextField from '../components/TextInput';

export default function LoginScreen({navigation}) {

  const dispatch = useDispatch();
  const common = useSelector(state => state.common);

  const passwordInputEl = useRef();

  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMsg, setShowErrorMessage] = useState(false)
  const [hasFingerPrintScanner, setHasFingerPrintScanner] = useState(false);
  const [hasEnrolledFingerPrint, setHasEnrolledFingerPrint] = useState(false);
  const [canLoginUsingFingerPrint, setCanLoginUsingFingerPrint] = useState(false);

  useEffect(() => {
    biometricCapability();
  },[hasFingerPrintScanner, hasEnrolledFingerPrint]);

  const biometricCapability = async () => {
    const [supportedAuth] = await LocalAuthentication.supportedAuthenticationTypesAsync();
    setHasFingerPrintScanner(supportedAuth === 1);

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setHasEnrolledFingerPrint(isEnrolled);

    setCanLoginUsingFingerPrint(hasFingerPrintScanner && hasEnrolledFingerPrint);
  }

  const resetDetails = () => {
    const fieldHandlers = [setPhoneOrEmail, setPassword];

    for (let handler of fieldHandlers) {
      handler('');
    }
  }

  const loginUserHandler = async () => {
    dispatch(isBtnDisabled(true));
    dispatch(isAppLoading(true));
    try {
      const { access_token: token, phoneNo, name } = await userSignIn(phoneOrEmail, password);
      resetDetails();

      dispatch(signIn(token, name, phoneNo));

      await AsyncStorage.setItem('userDetails', JSON.stringify({token, name, phoneNo}));

      dispatch(isAppLoading(false));

      navigation.navigate('Home');
    } catch(error) {
        dispatch(isAppLoading(false));  
        if (error.response) {
          if(error.response.data.message){
          setPassword('')
          setShowErrorMessage(true);
          }	
        } 
        else if (error.request) {
          console.log(error.request);
          Alert.alert('An error has occurred', 'Network error, Please try again.');
        }
        else{
          setPassword('')
          setShowErrorMessage(true);
        }
    }
  }

   useEffect(() => {
      (phoneOrEmail.length === 0 || password.length === 0) ? dispatch(isBtnDisabled(true)): dispatch(isBtnDisabled(false))
   },[phoneOrEmail, password]);


  const gotoBiometrics = () => {
    setShowErrorMessage(false);
    navigation.navigate("Biometrics");
  }

  StatusBar.setBarStyle('dark-content');
  // StatusBar.setTranslucent(false); // comment this in if you want the screens contents to show below the statusBar anfddo well to add it to all other screens too to avoid weird jerking when you navigate screens
  StatusBar.setBackgroundColor("#fff");
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

      <Title
          title="welcome"
          subTitle="Let’s get you signed in"
					headerOptionHandler={() => navigation.goBack()}
          subTitleStyle={{ fontSize: normalize(22) }}
        />

      <Image source={require('./../../assets/logo.png')} style={styles.image} />

      <View style={styles.content}>
    <View>
        <View style={styles.form}>

          <View style={styles.contentInputContainer}>
            <TextField
              label="Phone No/Email Address"
              value={phoneOrEmail}
              onChangeText={setPhoneOrEmail}
              returnKeyType ="next"
              onSubmitEditing={() => { passwordInputEl.current.focus() }}
              blurOnSubmit={false}
              onFocus={() => setShowErrorMessage(false)}
            />

          </View>

          <View style={styles.contentInputContainer}>
            <TextField
              ref={passwordInputEl}
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => setShowErrorMessage(false)}
            />
          </View>

        </View>

        { showErrorMsg && <View>
          <Text style={styles.invalidCredentialsErroMsg}>The provided login details is not valid.</Text>
          <Text style={styles.invalidCredentialsErroMsg}>Please verify , then try again</Text>
        </View>}

        <View style={styles.links}>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: normalize(10)}}>
            <TouchableOpacity onPress={() => {
              setShowErrorMessage(false)
              navigation.navigate('ForgotPassword')
              }}>
              <Text style={styles.link}>Forgot Password</Text>
            </TouchableOpacity>
            { canLoginUsingFingerPrint && <Text style={{...styles.link, paddingHorizontal: normalize(5)}}>|</Text>}
            {canLoginUsingFingerPrint && <TouchableOpacity onPress={gotoBiometrics}>
              <Text style={styles.link}>Use Biometrics</Text>
            </TouchableOpacity>}
          </View>
          <TouchableOpacity style={styles.helpAndSignUp} onPress={() =>{
            setShowErrorMessage(false)
            navigation.navigate('SignupScreen')}}><Text style={styles.helpAndSignUpText}>New User? Sign Up</Text></TouchableOpacity>
          <TouchableOpacity style={styles.helpAndSignUp}><Text style={styles.helpAndSignUpText}>help?</Text></TouchableOpacity>
        </View>
        </View>
        <RedButton
          title="Sign In"
          buttonStyle={styles.lastButton}
          disabled={common.isBtnDisabled}
          onPress={loginUserHandler}>
        </RedButton>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(18),
      backgroundColor: '#ffffff',
      paddingTop: normalize(20)
    },
    image: {
      width: normalize(100),
      height: normalize(70),
      resizeMode: 'contain',
      marginTop: normalize(10)
    },
    content: {
      justifyContent: "space-between",
      flex: 2,
      paddingTop: normalize(50)
    },
    contentInputContainer: {
     
    },
   
    lastButton: {
      marginBottom: normalize(10),
    },

    links: {
      alignItems: "center",
      marginTop: normalize(40),
      fontWeight: '700'
    },
    link: {
      marginTop: normalize(45),
      marginBottom: normalize(10),
      fontSize: normalize(11),
      color: '#181818',
      fontFamily: 'Roboto_900Black',
      fontWeight: 'bold',
      fontSize: normalize(15)
    },
    helpAndSignUp: {
      marginBottom: normalize(8)
    },
    helpAndSignUpText: {
      fontFamily: 'Roboto_900Black',
      fontWeight: 'bold',
      fontSize: normalize(15)
    },
    invalidCredentialsErroMsg: {
      color: '#FF1111',
      fontSize: normalize(14),
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center'
    }
  })