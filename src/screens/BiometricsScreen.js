import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, StatusBar, Image, Text } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import {signIn } from '../redux/actions';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RedButton from '../components/RedButton';

export default function BiometricsScreen({navigation}) {

  const dispatch = useDispatch();

  useEffect(() => {
    biometricLogin();
  },[]);

  const biometricLogin = async () => {
    const { success } = await LocalAuthentication.authenticateAsync({promptMessage: 'Scanning'});
    if (success) {
      dispatch(signIn('user_signed-in^using|biometrics'));
      navigation.navigate('Home');
    }
  }

  StatusBar.setBarStyle('dark-content');
  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor("#Fff");
  return (

    <ScrollView style={styles.container}>

      <Title
          title="welcome"
          subTitle="Let’s get you signed in"
          fontIcon={{
						name: 'long-arrow-left',
						color: '#132535',
						size: 14,
					}}
					headerOptionHandler={() => navigation.goBack()}
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18) }}
        />

      <Image source={require('./../../assets/logo.png')} style={styles.image} />

      <View style={styles.content}>

      <View style={styles.biometricsContainer}>
        <Image source={require('./../../assets/touch-id.png')} style={styles.biometric} />
      </View>

      <View style={styles.bioOverview}>
        <Text style={styles.bioLabel}>use biometrics for faster,</Text>
        <Text style={styles.bioLabel}>easier access to your account</Text>
      </View>

      </View>

      <View style={{display: 'flex', alignItems: 'center'}}>
        <RedButton
          title="Login with Email"
          buttonStyle={styles.lastButton}
          onPress={() => {navigation.navigate('SignIn')}}>
        </RedButton>
      </View>

      <View style={styles.newUserSignUp}>
        <Text style={styles.newUserSignUpText}>New User?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('SignupScreen')}}>
          <Text style={styles.newUserSignUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

        <TouchableOpacity>
          <Text style={{textAlign: 'center', fontFamily: 'Roboto_900Black', fontSize: normalize(14)}}>help?</Text>
        </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(18),
  },
  image: {
    width: normalize(120),
    height: normalize(50),
    resizeMode: 'contain',
    marginVertical: normalize(15),
  },
  content: {
    justifyContent: "center",
  },
  lastButton: {
    marginVertical: normalize(20),
    width: '80%',
    borderRadius: normalize(20)
  },
  biometric: {
    width: normalize(64),
    height: normalize(81)
  },
  biometricsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: normalize(30)
  },
  bioOverview: {
    marginTop: normalize(25),
    marginBottom: normalize(20)
  },
  bioLabel: {
    fontSize: normalize(18),
    fontFamily: 'Roboto_400Regular',
    color: '#2F2D2D',
    lineHeight: normalize(21),
    textAlign: 'center'
  },
  newUserSignUp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: normalize(20)
  },
  newUserSignUpText: {
    fontSize: normalize(14),
    color: '#181818',
    fontFamily: 'Roboto_900Black',
    paddingRight: normalize(5)
  }
})