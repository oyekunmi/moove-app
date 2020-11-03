import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, CheckBox, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import { ScrollView } from 'react-native-gesture-handler';
import Title from '../components/Title';
import TextField from '../components/TextInput';
import { signUp, isAppLoading, isBtnDisabled } from '../redux/actions';
import { checkErrorHandler } from '../utils/helpers/validation_wrapper';
import { userSignUp } from '../utils/helpers/api';


export default function SignupScreen({ navigation }) {
    const [ agreedToTerms, setAgreedToTerms ] = useState(false)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorBag, setError] = useState({});
    const formFields = ['firstname', 'lastname', 'email', 'password', 'confirmPassword', 'phone'];

    const dispatch = useDispatch();
    const common = useSelector(state => state.common);

    const userSignUpHandler = async () => {
        if(!agreedToTerms) {
            return Alert.alert('Terms and condition applies', 'Please accept our terms and condition to proceed' , null, { cancelable: true });
        }
        dispatch(isBtnDisabled(true));
        dispatch(isAppLoading(true));
        try {
            // console.log('signing up')
           const token = await userSignUp(firstname, lastname, email, phone, password, confirmPassword);
           resetDetails();

           const name = `${firstname} ${lastname}`;
           dispatch(signUp(token, name, phone));
           dispatch(isAppLoading(false));
        //console.log('storing..')
           await AsyncStorage.setItem('userDetails', JSON.stringify({token, name, phone}));
            // console.log('navigating...')
           navigation.navigate('RegistrationVerifySuccess');

        } catch(error) {
            // console.log('something went wrong.')
            dispatch(isAppLoading(false));
                if (error.response) {
                    const errorMessage = Object.values(error.response.data.errors)[0][0];
                    Alert.alert('An error has occurred', `${errorMessage}`, null, { cancelable: true });
                } else if (error.request) {
                    console.log(error.request);
                    Alert.alert('An error has occurred', 'Network error, Please try again.');
                } else {
                    console.log('Error', error.message);
                }
            
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
        dispatch(isBtnDisabled(!isValid));
    }

    useEffect(() => {
        isFormValid(errorBag,formFields);
    },[errorBag, agreedToTerms]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#132535',
            paddingHorizontal: normalize(18),
            paddingTop: normalize(25)
        },
        title: {
            fontSize: normalize(14),
            color: '#F1F1F1',
            fontFamily: 'Roboto_400Regular',
        },
        subTitle: {
            fontSize: normalize(28),
            marginTop: 15,
            fontFamily: 'Roboto_900Black',
            color: '#FFFFFF',
        },
        content: {
            justifyContent: "space-between",
            flex: 2,
        },
        contentInputContainer: {
            marginVertical: normalize(5),
        },
        contentLabel: {
            fontFamily: 'Roboto_400Regular',
            fontSize: normalize(14),
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
            marginTop: normalize(5)
        },
        link: {
            marginVertical: normalize(5),
            fontSize: normalize(14),
        },
        agreeToTermsLabel :{
            color: "#FFFFFF",
            fontSize: normalize(10),
            fontFamily: 'Roboto_400Regular',
            fontWeight:'bold',
          
        },
        lastButton: {
            marginBottom: normalize(25),
        },

    })
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <Title
                title="user sign up"
                fontIcon="arrow_back_light"
                statusBarStyle="light-content"
                subTitle="Let’s get you signed up with just a few details"
                subTitleStyle={{ fontSize: normalize(22) }}
                titleStyle={styles.title}
				headerOptionHandler={() => {
                    setError({})
                    navigation.goBack() }}
            />

            <View style={styles.content}>

                <View>

                    <View style={styles.contentInputContainer}>

                        <TextField
                            placeholder="Firstname"
                            value={firstname}
                            onChangeText={setFirstname}
                            onBlur={() => {checkErrorHandler('firstName', firstname, setError)}}
                            error={errorBag['firstName']}
                        />

                    </View>

                     <View style={styles.contentInputContainer}>
                        <TextField
                            placeholder='Lastname'
                            value={lastname}
                            onChangeText={setLastname}
                            onBlur={() => {checkErrorHandler('lastName', lastname, setError)}}
                            error={errorBag['lastName']}
                        />

                    </View>
                    <View style={styles.contentInputContainer}>
                        <TextField
                            placeholder='Phone - 23480XXXXXXX'
                            style={styles.contentIconInput}
                            iconSource={require('./../../assets/phone-vector.png')}
                            value={phone}
                            onChangeText={setPhone}
                            onBlur={() => {checkErrorHandler('phone', phone, setError)}}
                            error={errorBag['phone']}
                        />
                    </View>
                    <View style={styles.contentInputContainer}>
                        <TextField
                            placeholder='Email Address'
                            iconSource={require('./../../assets/email-vector.png')}
                            value={email}
                            onChangeText={setEmail}
                            onBlur={() => {checkErrorHandler('email', email, setError)}}
                            error={errorBag['email']}
                        />
                    </View>

                    <View style={styles.contentInputContainer}>
                        <TextField
                            placeholder='Password'
                            iconSource={require('./../../assets/lock-vector.png')}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            onBlur={() => {
                                checkErrorHandler('password', password, setError);
                                if(confirmPassword !== '') checkErrorHandler('confirmPassword', {'password': password, 'confirmPassword': confirmPassword }, setError);
                            }}
                            error={errorBag['password']}
                        />
                    </View>
                    <View style={styles.contentInputContainer}>
                        <TextField
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            iconSource={require('./../../assets/lock-vector.png')}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            onBlur={() => {
                                 checkErrorHandler('confirmPassword', {'password': password, 'confirmPassword': confirmPassword }, setError);
                                if(password !== '') checkErrorHandler('password', password, setError);
                            }}
                            error={errorBag['confirmPassword']}
                        />
                    </View>

                    <View style={styles.links}>
                    <CheckBox
                        tintColors={{ true: '#F15927', false: '#ffffff' }}
                        value={agreedToTerms}
                        onValueChange={setAgreedToTerms}
                    ></CheckBox>
                    <Text style={styles.agreeToTermsLabel}>I Agree To the Terms</Text>

                    </View>

                </View>
                <RedButton
                    title="Sign Me Up"
                    disabled={common.isBtnDisabled}
                    buttonStyle={styles.lastButton}
                    onPress={userSignUpHandler}>
                </RedButton>
            </View>

        </ScrollView>

    )
}