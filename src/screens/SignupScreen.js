import * as React from 'react';
import { View, TextInput, Button, StyleSheet, StatusBar, Text, Image, CheckBox } from 'react-native';
import { useDispatch } from 'react-redux';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import Link from '../components/Link';
import Title from '../components/Title';
import { ScrollView } from 'react-native-gesture-handler';


export default function SignupScreen() {

    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfrimPassword] = React.useState('');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#132535',
            paddingHorizontal: normalize(18),

        },
        title: {
            fontSize: normalize(14),
            color: '#FFFFFF',
            fontFamily: 'Roboto_400Regular',
        },
        subTitle: {
            fontSize: normalize(28),
            marginTop: 15,
            fontFamily: 'Roboto_900Black',
            color: '#FFFFFF',
        },
        content: {
            // flex: 4,
            justifyContent: "center",
        },
        contentInputContainer: {
            marginVertical: normalize(5),
        },
        contentLabel: {
            fontFamily: 'Roboto_400Regular',
            fontSize: normalize(14),
            marginVertical: normalize(5),
        },
        contentInput: {
            backgroundColor: '#E3E3EC',
            borderRadius: normalize(20),
            height: normalize(40),
            fontSize: normalize(14),
            paddingHorizontal: normalize(15),
            marginVertical: normalize(5),

        },
        contentIconInput: {
            backgroundColor: '#E3E3EC',
            borderRadius: normalize(20),
            height: normalize(40),
            fontSize: normalize(14),
            paddingHorizontal: normalize(40),
            marginVertical: normalize(5),

        },
        links: {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: normalize(10)
           
        },
        link: {
            marginVertical: normalize(5),
            fontSize: normalize(14),
        },
        icon: {
            padding: 10,
            margin: 18,
            position: 'absolute',
            zIndex: 2
        },
        text :{
            color: "#FFFFFF"
        },
        lastButton: {
            marginVertical: normalize(20),
          },

    })
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>user sign up</Text>
            <Text style={styles.subTitle} >Let’s get you signed up with just a few details.</Text>

            <View style={styles.content}>

                <View style={styles.form}>

                    <View style={styles.contentInputContainer}>

                        <TextInput
                            placeholder='Firstname'
                            style={styles.contentInput}
                            value={firstname}
                            onChangeText={setFirstname}
                        />

                    </View>
                    <View style={styles.contentInputContainer}>
                        <TextInput
                            placeholder='Lastname'
                            style={styles.contentInput}
                            value={lastname}
                            onChangeText={setLastname}
                        />

                    </View>
                    <View style={styles.contentInputContainer}>
                        <Image style={styles.icon} source={require('./../../assets/phone-vector.png')} />
                        <TextInput
                            placeholder='Phone - 23480XXXXXXX'
                            style={styles.contentIconInput}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.contentInputContainer}>
                        <Image style={styles.icon} source={require('./../../assets/email-vector.png')} />
                        <TextInput
                            placeholder='Email Address'
                            style={styles.contentIconInput}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.contentInputContainer}>
                        <Image style={styles.icon} source={require('./../../assets/lock-vector.png')} />
                        <TextInput
                            placeholder='Password'
                            style={styles.contentIconInput}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.contentInputContainer}>
                        <Image style={styles.icon} source={require('./../../assets/lock-vector.png')} />
                        <TextInput
                            placeholder='Confirm Password'
                            style={styles.contentIconInput}
                            value={confirmPassword}
                            onChangeText={setConfrimPassword}
                            secureTextEntry
                        />
                    </View>
                    
                    <View style={styles.links}>
                    <CheckBox ></CheckBox>
                    <Text style={styles.text}>I Agree To the Terms</Text>
                        
                    </View>
                    <RedButton
                        title="Sign Me Up"
                        buttonStyle={styles.lastButton}
                        onPress={() => dispatch(signIn({ username, password }))}>
                    </RedButton>

                </View>
            </View>

        </ScrollView>

    )
}