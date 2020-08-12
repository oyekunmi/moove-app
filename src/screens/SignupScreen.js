import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, CheckBox, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import { ScrollView } from 'react-native-gesture-handler';
import Title from '../components/Title';
import TextField from '../components/TextInput';
import { signUp } from '../redux/actions';
import { checkErrorHandler } from '../utils/helpers/validation_wrapper';
import { userSignUp } from '../utils/helpers/api';


export default function SignupScreen({ navigation }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorBag, setError] = useState({});
    const [isBtnDisabled, setBtnDisabled] = useState(true);
    const formFields = ['firstname', 'lastname', 'email', 'password', 'confirmPassword', 'phone'];

    const dispatch = useDispatch();

    const userSignUpHandler = async () => {
        setBtnDisabled(true);
        try {
           const token = await userSignUp(firstname, lastname, email, phone, password, confirmPassword);
           resetDetails();
           dispatch(signUp(token));

           navigation.navigate('Home');
        } catch(error) {
            const errorMessage = Object.values(error.response.data.errors)[0][0];
            Alert.alert('An error has occurred', `${errorMessage}`, null, { cancelable: true });
        }

    }

    const resetDetails = () => {
        const fieldHandlers = [setFirstname, setLastname, setPhone, setEmail, setPassword, setConfirmPassword];

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
            <Title
                title="user sign up"
                statusBarStyle="light-content"
                subTitle="Let’s get you signed up with just a few details"
                subTitleStyle={{ fontSize: normalize(22) }}
                containerStyle={{ paddingHorizontal: normalize(18) }}
            />

            <View style={styles.content}>

                <View style={styles.form}>

                    <View style={styles.contentInputContainer}>

                        <TextField
                            placeholder='Firstname'
                            style={styles.contentInput}
                            value={firstname}
                            onChangeText={setFirstname}
                            onBlur={() => {checkErrorHandler('firstName', firstname, setError)}}
                            error={errorBag['firstName']}
                        />

                    </View>
                     <View style={styles.contentInputContainer}>
                        <TextField
                            placeholder='Lastname'
                            style={styles.contentInput}
                            value={lastname}
                            onChangeText={setLastname}
                            onBlur={() => {checkErrorHandler('lastName', lastname, setError)}}
                            error={errorBag['lastName']}
                        />

                    </View>
                    <View style={styles.contentInputContainer}>
                        <Image style={styles.icon} source={require('./../../assets/phone-vector.png')} />
                        <TextField
                            placeholder='Phone - 23480XXXXXXX'
                            style={styles.contentIconInput}
                            value={phone}
                            onChangeText={setPhone}
                            onBlur={() => {checkErrorHandler('phone', phone, setError)}}
                            error={errorBag['phone']}
                        />
                    </View>
                    <View style={styles.contentInputContainer}>
                        <Image style={styles.icon} source={require('./../../assets/email-vector.png')} />
                        <TextField
                            placeholder='Email Address'
                            style={styles.contentIconInput}
                            value={email}
                            onChangeText={setEmail}
                            onBlur={() => {checkErrorHandler('email', email, setError)}}
                            error={errorBag['email']}
                        />
                    </View>

                    <View style={styles.contentInputContainer}>
                        <Image style={styles.icon} source={require('./../../assets/lock-vector.png')} />
                        <TextField
                            placeholder='Password'
                            style={styles.contentIconInput}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            onBlur={() => {checkErrorHandler('password', password, setError)}}
                            error={errorBag['password']}
                        />
                    </View>
                    <View style={styles.contentInputContainer}>
                        <Image style={styles.icon} source={require('./../../assets/lock-vector.png')} />
                        <TextField
                            placeholder='Confirm Password'
                            style={styles.contentIconInput}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            onBlur={() => {checkErrorHandler('confirmPassword', {'password': password, 'confirmPassword': confirmPassword }, setError)}}
                            error={errorBag['confirmPassword']}
                        />
                    </View>

                    <View style={styles.links}>
                    <CheckBox></CheckBox>
                    <Text style={styles.text}>I Agree To the Terms</Text>

                    </View>
                    <RedButton
                        title="Sign Me Up"
                        disabled={isBtnDisabled}
                        buttonStyle={styles.lastButton}
                        onPress={userSignUpHandler}>
                    </RedButton>

                </View>
            </View>

        </ScrollView>

    )
}