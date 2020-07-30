import * as React from 'react';
import { View, TextInput, Button, StyleSheet, StatusBar, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import Link from '../components/Link';
import Title from '../components/Title';
import { ScrollView } from 'react-native-gesture-handler';
import SignupScreen from './SignupScreen';

export default function LoginScreen({navigation}) {

  const dispatch = useDispatch()

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(18),
    },
    image: {
      width: normalize(150),
      height: normalize(80),
      resizeMode: 'contain',
      // backgroundColor: "red",
      // flex: 1,
      marginVertical: normalize(20),
    },
    content: {
      // flex: 4,
      justifyContent: "center",
    },
    contentInputContainer: {
      marginVertical: normalize(5),
    },
    contentLabel: {
      color: '#545252',
      fontFamily: 'Roboto_400Regular',
      fontSize: normalize(14),
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
    lastButton: {
      marginVertical: normalize(20),
    },
    links: {
      alignItems: "center",
    },
    link: {
      marginVertical: normalize(5),
      fontSize: normalize(14),
    },
  })

  StatusBar.setBarStyle('dark-content');
  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor("#Fff");
  return (

    <ScrollView style={styles.container}>
      
      <Title
          title="user sign up"
          subTitle="Let’s get you signed in."
        />

      <Image source={require('./../../assets/logo.png')} style={styles.image} />

      <View style={styles.content}>

        <View style={styles.form}>

          <View style={styles.contentInputContainer}>
            <Text style={styles.contentLabel}>Username</Text>
            <TextInput
              style={styles.contentInput}
              value={username}
              onChangeText={setUsername}
            />

          </View>

          <View style={styles.contentInputContainer}>
            <Text style={styles.contentLabel}>Password</Text>
            <TextInput
              style={styles.contentInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

        </View>

        <View style={styles.links}>
          <Link linkStyle={styles.link}>Forgot Password ?</Link>
           <Button title="New User? Sign Up"
          onPress={() => {navigation.push("SignupScreen")}}/>
          <Link linkStyle={styles.link}>Help ?</Link>
        </View>
      </View>

      <RedButton
        title="Sign in"
        buttonStyle={styles.lastButton}
        onPress={() => dispatch(signIn({ username, password }))}>
      </RedButton>

    </ScrollView>
  );
}