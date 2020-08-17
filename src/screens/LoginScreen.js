import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, StatusBar, Text, Image, PixelRatio } from 'react-native';
import { useDispatch } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';
import { checkErrorHandler } from '../utils/helpers/validation_wrapper';
import { signIn, isAppLoading } from '../redux/actions';
import { userSignIn } from '../utils/helpers/api';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import Title from '../components/Title';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TextField from '../components/TextInput';

export default function LoginScreen({navigation}) {

  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorBag, setError] = useState({});
  const [isBtnDisabled, setBtnDisabled] = useState(true);
  const [hasFingerPrintScanner, setHasFingerPrintScanner] = useState(false);
  const [hasEnrolledFingerPrint, setHasEnrolledFingerPrint] = useState(false);
  const [canLoginUsingFingerPrint, setCanLoginUsingFingerPrint] = useState(false);
  const formFields = ['phone', 'password'];

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
    const fieldHandlers = [setPhone, setPassword];

    for (let handler of fieldHandlers) {
      handler('');
    }
  }

  const isFormValid = (formErrorBag, fields) => {
    let isValid = false;
    const errorBagValues = Object.values(formErrorBag);
    if(errorBagValues.length === fields.length) {
        isValid = errorBagValues.every((value) => value === undefined);
    }
    setBtnDisabled(!isValid);
  }

  const loginUserHandler = async () => {
    dispatch(isAppLoading(true));
    try {
      const { access_token: token, phoneNo, name } = await userSignIn(phone, password);
      resetDetails();
      dispatch(signIn(token, name, phoneNo));

      navigation.navigate('Home');

    } catch(error) {
      const { message } = error.response.data;
      Alert.alert('An error has occurred', message, null, { cancelable: true });
    }
    dispatch(isAppLoading(false));
  }

   useEffect(() => {
    isFormValid(errorBag,formFields);
   },[errorBag, isBtnDisabled]);


  const gotoBiometrics = () => {
    navigation.navigate("Biometrics");
  }

  StatusBar.setBarStyle('dark-content');
  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor("#Fff");
  return (

    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

      <Title
          title="welcome"
          subTitle="Let’s get you signed in"
          fontIcon='arrow_back'
					headerOptionHandler={() => navigation.goBack()}
          subTitleStyle={{ fontSize: normalize(22) }}
        />

      <Image source={require('./../../assets/logo.png')} style={styles.image} />

      <View style={styles.content}>
    <View>
        <View style={styles.form}>

          <View style={styles.contentInputContainer}>
            <TextField
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              onBlur={() => checkErrorHandler('phone', phone, setError) }
              error={errorBag['phone']}
            />

          </View>

          <View style={styles.contentInputContainer}>
            <TextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onBlur={() => checkErrorHandler('password', password, setError)}
              error={errorBag['password']}
            />
          </View>

        </View>

        <View style={styles.links}>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: normalize(10)}}>
            <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword')}}>
              <Text style={styles.link}>Forgot Password</Text>
            </TouchableOpacity>
            { canLoginUsingFingerPrint && <Text style={{...styles.link, paddingHorizontal: normalize(5)}}>|</Text>}
            {canLoginUsingFingerPrint && <TouchableOpacity onPress={gotoBiometrics}>
              <Text style={styles.link}>Use Biometrics</Text>
            </TouchableOpacity>}
          </View>
          <TouchableOpacity style={styles.helpAndSignUp} onPress={() => navigation.navigate('SignupScreen')}><Text style={styles.helpAndSignUpText}>New User? Sign Up</Text></TouchableOpacity>
          <TouchableOpacity style={styles.helpAndSignUp}><Text style={styles.helpAndSignUpText}>help?</Text></TouchableOpacity>
        </View>
        </View>
        <RedButton
          title="Sign In"
          buttonStyle={styles.lastButton}
          disabled={isBtnDisabled}
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
      backgroundColor: '#EFEFEF'
    },
    image: {
      width: normalize(90),
      height: normalize(70),
      resizeMode: 'contain',
      marginBottom: normalize(10)
    },
    content: {
      justifyContent: "space-between",
      flex: 2,
    },
    contentInputContainer: {
      marginVertical: normalize(5),
    },

    lastButton: {
      marginBottom: normalize(10),
    },

    links: {
      alignItems: "center",
      fontFamily: 'Roboto_400Regular',
    },
    link: {
      marginTop: normalize(24),
      marginBottom: normalize(10),
      fontSize: normalize(11),
      color: '#181818',
      fontFamily: 'Roboto_900Black',
    },
    helpAndSignUp: {
      marginBottom: normalize(8)
    },
    helpAndSignUpText: {
      fontFamily: 'Roboto_900Black',
    }
  })