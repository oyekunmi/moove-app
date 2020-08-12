import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Image, Text, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import RedButton from '../components/RedButton';
import TextField from '../components/TextInput';
import { checkErrorHandler } from '../utils/helpers/validation_wrapper';
import { resetPassword } from '../utils/helpers/api'

export default function ForgotPasswordScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [errorBag, setError] = useState({});
  const [isBtnDisabled, setBtnDisabled] = useState(true);
  const formFields = ['email'];

  const resetDetails = () => {
      const fieldHandlers = [setEmail];

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

    useEffect(() => {
       isFormValid(errorBag,formFields);
    },[errorBag, isBtnDisabled]);

    const resetEmailHandler = async () => {
      setBtnDisabled(true);
      try {
        await resetPassword(email);
        resetDetails();
        navigation.navigate('SignIn');

      } catch(error) {
        const { message } = error.response.data;
        Alert.alert('Invalid credentials', `${message}`, null, { cancelable: true });
      }
    }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(18),
    },
    content: {
      justifyContent: "center",
    },
    lastButton: {
      marginVertical: normalize(70),
    },
    lockLogo: {
      width: normalize(141),
      height: normalize(141),
      resizeMode: 'contain',
    },
    lockLogoContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: normalize(30)
    },
    forgotPasswordGuideLine: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: normalize(10)
    },
    forgotPasswordText: {
      fontSize: normalize(15),
      color: '#2F2D2D',
      fontFamily: 'Roboto_400Regular',
      lineHeight: normalize(21),
    },
    contentInputContainer: {
      marginVertical: normalize(5),
    },
    contentInput: {
      backgroundColor: '#E3E3EC',
      borderRadius: normalize(20),
      height: normalize(40),
      fontSize: normalize(14),
      paddingHorizontal: normalize(10),
      marginVertical: normalize(5),

    },
    contentIconInput: {
      backgroundColor: '#E3E3EC',
      borderRadius: normalize(20),
      height: normalize(40),
      fontSize: normalize(14),
      paddingHorizontal: normalize(90),
      marginVertical: normalize(9),

    },
    icon: {
      padding: 10,
      marginVertical: 27,
      marginHorizontal: 80,
      position: 'absolute',
      zIndex: 2
    },
  })

  StatusBar.setBarStyle('dark-content');
  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor("#Fff");
  return (

    <ScrollView style={styles.container}>

      <Title
        title="forgot password "
        subTitle="Oops! You’re only human, everyone forgets"
        subTitleStyle={{ fontSize: normalize(21) }}
        containerStyle={{ paddingHorizontal: normalize(18) }}
      />


      <View style={styles.content}>

        <View style={styles.lockLogoContainer}>
          <Image source={require('./../../assets/forgotpass.png')} style={styles.lockLogo} />
        </View>

        <View style={styles.forgotPasswordGuideLine}>
          <Text style={styles.forgotPasswordText}>enter your email address and we’ll</Text>
          <Text style={styles.forgotPasswordText}>help you reset your password</Text>
        </View>

        <View>
          <View style={styles.contentInputContainer}>
            <Image style={styles.icon} source={require('./../../assets/email-vector.png')} />
            <TextField
              style={styles.contentIconInput}
              placeholder='Email Address'
              value={email}
              onChangeText={setEmail}
              onBlur={() => { checkErrorHandler('email', email, setError)}}
              error={errorBag['email']}
            />
          </View>
        </View>
        <RedButton
          title="Reset My Password"
          buttonStyle={styles.lastButton}
          disabled={isBtnDisabled}
          onPress={resetEmailHandler}
         >
        </RedButton>

      </View>

    </ScrollView>
  );
}