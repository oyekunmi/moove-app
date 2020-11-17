import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity , Alert} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { normalize } from '../normalizeFont';
import WhiteButton from '../components/WhiteButton';
import Title from '../components/Title';
import { resendOTP, verifyOTP } from '../utils/helpers/api';
import { isAppLoading, isBtnDisabled } from '../redux/actions';


export default function RegistrationVerificationScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const { email } = route.params;
	const [otp, setOtp]= useState('');
	
	
	const resetDetails = () => {
		const fieldHandlers = [setOtp];
	
		for (let handler of fieldHandlers) {
		  handler('');
		}
	}
	
	const verifyOTPHandler = async ()=>{
		dispatch(isAppLoading(true));
      	dispatch(isBtnDisabled(true));
		try{
			await verifyOTP(otp);
			resetDetails();
			navigation.navigate('PasswordResetScreen', { otpCode:otp });
		}
		catch(error){
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

	const resendOTPHandler = async ()=>{
		dispatch(isAppLoading(true));
		dispatch(isBtnDisabled(true));
		try {
			await resendOTP(email);
			Alert.alert('Successful!', 'Check ' +email + ' for your new code.')
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

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ flexGrow: 1 }}>
			<Title
				title='forgot password | email verification'
				statusBarStyle='light-content'
				fontIcon='arrow_back_light'
				subTitle='Let’s verify your email address'
				fontIcon='arrow_back_light'
				subTitleStyle={{ fontSize: normalize(20) }}
				headerOptionHandler={() => navigation.goBack()}
				titleStyle={styles.title}
			/>

			<View style={styles.content}>
				<View>
					<View style={styles.emailLogoContainer}>
						<Image
							source={require('./../../assets/white-email-icon.png')}
							style={styles.emailLogo}
						/>
					</View>

					<View style={styles.otpContainer}>
						<Text style={styles.otpCodeInstruction}>
							Please enter the 4 digit code sent to
						</Text>
						<Text style={styles.otpEmail}>{email}</Text>
					</View>

					<TextInput
							style = {styles.otpInput}
							value={otp}
							onChangeText={setOtp}  
							placeholder='  - - -'
							maxLength= {4}
							keyboardType='numeric'
              				
                        />

				<View style={styles.resendCodeOrEmail}>
					<TouchableOpacity>
						<Text style={styles.resendCodeOrEmailText} onPress={resendOTPHandler}>Resend Code</Text>
					</TouchableOpacity>
					<Text style={styles.separator}>|</Text>
					<TouchableOpacity>
						<Text style={styles.resendCodeOrEmailText} onPress={() => navigation.goBack()}>Change Email</Text>
					</TouchableOpacity>
				</View>
				</View>
				<WhiteButton
					title='Verify'
					disabled={otp.length < 4 ||otp.length > 4 }
					buttonStyle={styles.lastButton}
					onPress={verifyOTPHandler}></WhiteButton>
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
	content: {
		justifyContent: 'space-between',
		flex: 2,
	},
	lastButton: {
		marginBottom: normalize(20),
	},
	emailLogo: {
		width: normalize(115),
		height: normalize(115),
		resizeMode: 'contain',
	},
	emailLogoContainer: {
		display: 'flex',
		alignItems: 'center',
		marginTop: normalize(30),
		marginBottom: normalize(10),
	},
	otpContainer: {
		display: 'flex',
		alignItems: 'center',
		color: '#2F2D2D',
		marginBottom: normalize(10),
	},
	otpCodeInstruction: {
		fontSize: normalize(14),
		color: '#ffffff',
		fontFamily: 'Roboto_400Regular',
		lineHeight: normalize(21),
		paddingTop:normalize(35)
	},

	otpEmail: {
		color: '#7AC043',
	},
	otpNumber: {
		fontSize: normalize(48),
		color: '#ffffff',
		textAlign: 'center',
	},
	resendCodeOrEmail: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: normalize(60),
		paddingTop:normalize(15)
	},
	resendCodeOrEmailText: {
		color: '#ffffff',
		fontSize: normalize(14),
	},
	dashes: {
		paddingHorizontal: normalize(20),
	},
	separator: {
		color: '#ffffff',
		fontSize: normalize(14),
		paddingHorizontal: normalize(8)
	},
	otpInput:{
		backgroundColor:'#CE0303',
		color:'#ffffff',
		fontSize: normalize(50),
		paddingHorizontal: normalize(25),
		marginHorizontal: normalize(60),
		paddingTop:normalize(25)
	},
	title:{
		color:'#f1f1f1',
		fontFamily: 'Roboto_400Regular',
	}
});
