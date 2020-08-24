import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { normalize } from '../normalizeFont';
import WhiteButton from '../components/WhiteButton';
import Title from '../components/Title';
import TextField from '../components/TextInput';
import { checkErrorHandler } from '../utils/helpers/validation_wrapper';
import { resetNewPassword } from '../utils/helpers/api';
import { isAppLoading, isBtnDisabled } from '../redux/actions';

export default function PasswordResetScreen({ navigation , route}) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorBag, setError] = useState({});
	const formFields = ['email', 'password', 'confirmPassword'];

	useEffect(() => {
		setEmail(route.params.email);
	}, [])

	const dispatch = useDispatch();
	const common = useSelector(state => state.common);

	const resetForgottenPasswordHandler = async () => {
		dispatch(isAppLoading(true));
		dispatch(isBtnDisabled(true));
		try {
			await resetNewPassword(email, password, confirmPassword);
			resetDetails();

			dispatch(isAppLoading(false));

			navigation.navigate('SuccessScreen', { title: 'password reset', subTitle: 'Password Updated'});
		} catch (error) {
			dispatch(isAppLoading(false));
			const errorMessage = Object.values(
				error.response.data.errors,
			)[0][0];
			Alert.alert('An error has occurred', `${errorMessage}`, null, {
				cancelable: true,
			});
		}

	};

	const resetDetails = () => {
		const fieldHandlers = [setEmail, setPassword, setConfirmPassword];

		for (let handler of fieldHandlers) {
			handler('');
		}
	};

	const isFormValid = (formErrorBag, fields) => {
		let isValid = false;
		const errorBagValues = Object.values(formErrorBag);
		if (errorBagValues.length === fields.length) {
			isValid = errorBagValues.every((value) => value === undefined);
		}
		dispatch(isBtnDisabled(!isValid));
	};

	useEffect(() => {
		isFormValid(errorBag, formFields);
	}, [errorBag]);

	return (
		<ScrollView style={styles.container}>
			<Title
				title='password reset'
				statusBarStyle='light-content'
				subTitle='enter a secure password'
				fontIcon='arrow_back_light'
				subTitleStyle={{ fontSize: normalize(22) }}
				headerOptionHandler={() =>{
					setError({})
					navigation.goBack()}}
			/>

			<View style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.lockLogoContainer}>
					<Image
						source={require('./../../assets/forgotpass.png')}
						style={styles.lockLogo}
					/>
				</View>

				<View>
					<View style={styles.contentInputContainer}>
						<TextField
							label='Email'
							labelColor='#F1F1F1'
							errorTextColor='#F1F1F1'
							style={styles.contentIconInput}
							iconSource={require('./../../assets/email-vector.png')}
							inputBackgroundColor='#E07A7A'
							autoFocus
							value={email}
							onChangeText={setEmail}
							onBlur={() => {
								checkErrorHandler('email', email, setError);
							}}
							error={errorBag['email']}
						/>
					</View>
					<View style={styles.contentInputContainer}>
						<TextField
							label='New Password'
							labelColor='#F1F1F1'
							errorTextColor='#F1F1F1'
							style={styles.contentIconInput}
							iconSource={require('./../../assets/lock-vector.png')}
							inputBackgroundColor='#E07A7A'
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							onBlur={() => {
								checkErrorHandler(
									'password',
									password,
									setError,
								);
								if(confirmPassword !== '') checkErrorHandler(
									'confirmPassword',
									{
										password: password,
										confirmPassword: confirmPassword,
									},
									setError,
								);
							}}
							error={errorBag['password']}
						/>
					</View>
					<View style={styles.contentInputContainer}>
						<TextField
							label='Confirm Password'
							labelColor='#F1F1F1'
							errorTextColor='#F1F1F1'
							style={styles.contentIconInput}
							iconSource={require('./../../assets/lock-vector.png')}
							inputBackgroundColor='#E07A7A'
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry
							onBlur={() => {
								if(password !== '') checkErrorHandler(
									'password',
									password,
									setError,
								);
								checkErrorHandler(
									'confirmPassword',
									{
										password: password,
										confirmPassword: confirmPassword,
									},
									setError,
								);
							}}
							error={errorBag['confirmPassword']}
						/>
					</View>
				</View>
				<WhiteButton
					title='Update Password'
					disabled={common.isBtnDisabled}
					buttonStyle={styles.lastButton}
					onPress={resetForgottenPasswordHandler}></WhiteButton>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#CE0303',
		paddingHorizontal: normalize(18),
	},
	contentInputContainer: {
		marginVertical: normalize(5),
	},
	lastButton: {
		marginVertical: normalize(70),
		marginBottom: normalize(10),
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
});
