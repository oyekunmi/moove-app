import React, { useState, useEffect,createRef } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { normalize } from '../normalizeFont';
import WhiteButton from '../components/WhiteButton';
import Title from '../components/Title';
import OTPInput from '../components/OTPInput';

export default function RegistrationVerificationScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	const { email } = route.params;

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ flexGrow: 1 }}>
			<Title
				title='user registration | email verification'
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

					<OTPInput />

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
					onPress={() => { navigation.navigate('SuccessScreen', { title: 'password reset', subTitle: 'Password Updated'})}}></WhiteButton>
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
	contentInputContainer: {
		marginVertical: normalize(5),
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
		marginBottom: normalize(25),
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
	// hiddenInput: {
	// 	position: 'absolute',
	// 	zIndex: -200,
	// 	display: 'none'
	// }
});
