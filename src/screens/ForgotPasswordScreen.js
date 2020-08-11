import * as React from 'react';
import { View, StyleSheet, StatusBar, Image, Text, TextInput } from 'react-native';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RedButton from '../components/RedButton';

export default function ForgotPasswordScreen({navigation}) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(18),
    },
    content: {
      justifyContent: "center",
    },
    lastButton: {
      marginVertical: normalize(20),
      width: '80%',
      borderRadius: normalize(20)
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
          subTitle="Oops! You’re only human everyone forgets"
          subTitleStyle={{ fontSize: normalize(22) }}
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
            <TextInput
              style={styles.contentIconInput}
              placeholder='Email Address'
            />
          </View>
        </View>

      </View>

      {/* <View style={{display: 'flex', alignItems: 'center'}}>
        <RedButton
          title="Login with Email"
          buttonStyle={styles.lastButton}
          onPress={() => {navigation.navigate('SignIn')}}>
        </RedButton>
      </View> */}

    </ScrollView>
  );
}