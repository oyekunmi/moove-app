import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity , Alert} from 'react-native';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { normalize } from '../normalizeFont';
import WhiteButton from '../components/WhiteButton';
import Title from '../components/Title';
import { verifyOTP } from '../utils/helpers/api';

export default function RegistrationVerificationScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	const { email } = route.params;
	const [otp, setOtp]= useState('');


	
	const verifyOTPHandler = async ()=>{
		try{
			await verifyOTP(otp);
			navigation.navigate('PasswordResetScreen', { otpCode:otp });
		}
		catch(error){
			if (error.response) {
				if(error.response.data.message){
					Alert.alert('An error has occurred', error.response.data.message);
				}	
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
		
		}
		
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
				subTitleStyle={{ fontSize: normalize(22) }}
				headerOptionHandler={() => navigation.goBack()}
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
							placeholder='- - -'
                        />

				<View style={styles.resendCodeOrEmail}>
					<TouchableOpacity>
						<Text style={styles.resendCodeOrEmailText}>Resend Code</Text>
					</TouchableOpacity>
					<Text style={styles.separator}>|</Text>
					<TouchableOpacity>
						<Text style={styles.resendCodeOrEmailText}>Change Email</Text>
					</TouchableOpacity>
				</View>
				</View>
				<WhiteButton
					title='Verify'
					// disabled={common.isBtnDisabled}
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
		marginBottom: normalize(10),
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
		marginTop: normalize(30)
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
		paddingHorizontal: normalize(20),
		marginHorizontal: normalize(65)
	}
});
