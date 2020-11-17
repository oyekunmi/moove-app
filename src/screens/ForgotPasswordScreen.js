import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Image, Text, Alert, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import RedButton from '../components/RedButton';
import TextField from '../components/TextInput';
import { checkErrorHandler } from '../utils/helpers/validation_wrapper';
import { forgotPassword } from '../utils/helpers/api';
import { isAppLoading, isBtnDisabled } from '../redux/actions';

export default function ForgotPasswordScreen({ navigation }) {

  const dispatch = useDispatch();
  const common = useSelector(state => state.common);

  const [email, setEmail] = useState('');
  const [errorBag, setError] = useState({});
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
        dispatch(isBtnDisabled(!isValid));
    }

    useEffect(() => {
       isFormValid(errorBag,formFields);
    },[errorBag]);

    const resetPasswordHandler = async () => {
      dispatch(isAppLoading(true));
      dispatch(isBtnDisabled(true));
      try {
        await forgotPassword(email);
        resetDetails();
        navigation.navigate('RegistrationVerification', { email });

      } catch(error){
        if (error.response) {
          if(error.response.data.message){
            Alert.alert('An error has occurred', error.response.data.message);
          }	
        } else if (error.request) {
          console.log(error.request);
          Alert.alert('An error has occurred', 'Network error, Please try again.');
        } else {
          console.log('Error', error.message);
          Alert.alert('An error has occurred', error.message);
        }
      
      }
      dispatch(isAppLoading(false));
      dispatch(isBtnDisabled(true));
    }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(18),
      backgroundColor: '#ffffff'
    },
    content: {
      justifyContent: "space-between",
      flex: 2,
    },
    lastButton: {
      marginBottom: normalize(20),
      width:'100%'
    },
    lockLogo: {
      width: normalize(115),
      height: normalize(115),
      resizeMode: 'contain',
    },
    lockLogoContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: normalize(30),
      marginBottom: normalize(10),
    },
    forgotPasswordGuideLine: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: normalize(15),
      color: '#2F2D2D',
    },
    forgotPasswordText: {
      fontSize: normalize(14),
      color: '#2F2D2D',
      fontFamily: 'Roboto_400Regular',
      lineHeight: normalize(21),
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

    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

      <Title
        title="forgot password"
        subTitle="Oops! You’re only human everyone forgets"
        subTitleStyle={{ fontSize: normalize(21) }}
        titleStyle={{paddingTop:normalize(15)}}
        headerOptionHandler={() => {
          setError({})
          navigation.goBack() }}
      />


      <View style={styles.content}>
    <View >
      <KeyboardAvoidingView behavior={'position'}>
        <View style={styles.lockLogoContainer}>
          <Image source={require('./../../assets/forgotpass.png')} style={styles.lockLogo} />
        </View>

        <View style={styles.forgotPasswordGuideLine}>
          <Text style={styles.forgotPasswordText}>enter your email address and we’ll</Text>
          <Text style={styles.forgotPasswordText}>help you reset your password</Text>
        </View>

        <View>
          <View style={styles.contentInputContainer}>

            <TextField
              iconSource={require('./../../assets/email-vector.png')}
              fieldIconPosition='25'
              placeholderPaddingLeft='100'
              placeholder='Email Address'
              value={email}
              onChangeText={setEmail}
              onBlur={() => { checkErrorHandler('email', email, setError)}}
              error={errorBag['email']}
            />
          </View>
        </View>
        </KeyboardAvoidingView>
      </View>
        <RedButton
          title="Reset My Password"
          buttonStyle={styles.lastButton}
          disabled={common.isBtnDisabled}
          onPress={resetPasswordHandler}
         >
        </RedButton>

      </View>

    </ScrollView>
  );
}