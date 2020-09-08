/** @format */

import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { GenericStyles } from '../utils/styles/GenericStyles';
import { CustomTextInput } from '../utils/lib';
import colors from '../utils/styles/colors';
import { normalize } from '../normalizeFont';

const OtpVerification = (props) => {
	const [otpArray, setOtpArray] = useState(['', '', '', '']);

	// TextInput refs to focus programmatically while entering OTP
	const firstTextInputRef = useRef(null);
	const secondTextInputRef = useRef(null);
	const thirdTextInputRef = useRef(null);
	const fourthTextInputRef = useRef(null);

	const refCallback = (textInputRef) => (node) => {
		textInputRef.current = node;
	};

	const onOtpChange = (index) => {
		return (value) => {
			if (isNaN(Number(value))) {
				// do nothing when a non digit is pressed
				return;
			}
			const otpArrayCopy = otpArray.concat();
			otpArrayCopy[index] = value;
			setOtpArray(otpArrayCopy);

			// auto focus to next InputText if value is not blank
			if (value !== '') {
				if (index === 0) {
					secondTextInputRef.current.focus();
				} else if (index === 1) {
					thirdTextInputRef.current.focus();
				} else if (index === 2) {
					fourthTextInputRef.current.focus();
				}
			}
		};
	};

	const onOtpKeyPress = (index) => {
		return ({ nativeEvent: { key: value } }) => {
			if (value === 'Backspace' && otpArray[index] === '') {
				if (index === 1) {
					firstTextInputRef.current.focus();
				} else if (index === 2) {
					secondTextInputRef.current.focus();
				} else if (index === 3) {
					thirdTextInputRef.current.focus();
				}

				if (Platform.OS === 'android' && index > 0) {
					const otpArrayCopy = otpArray.concat();
					otpArrayCopy[index - 1] = '';
					setOtpArray(otpArrayCopy);
				}
			}
		};
	};

	return (
		<View style={styles.container}>
			<View style={[GenericStyles.row]}>
				{[
					firstTextInputRef,
					secondTextInputRef,
					thirdTextInputRef,
					fourthTextInputRef,
				].map((textInputRef, index) => (
					<CustomTextInput
						RightComponent={
							index !== 3 && <Text style={styles.dashes}>-</Text>
						}
						containerStyle={[GenericStyles.fill]}
						value={otpArray[index]}
						onKeyPress={onOtpKeyPress(index)}
						onChangeText={onOtpChange(index)}
						keyboardType={'numeric'}
						maxLength={1}
						selectionColor={colors.WHITE}
						style={[
							styles.otpText,
							GenericStyles.centerAlignedText,
						]}
						autoFocus={index === 0 ? true : undefined}
						refCallback={refCallback(textInputRef)}
						key={index}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flex: 1,
	},
	otpText: {
		fontWeight: 'bold',
		color: colors.WHITE,
		fontSize: normalize(48),
		width: '100%',
	},
	dashes: {
		fontSize: normalize(48),
		position: 'relative',
		top: normalize(-5),
		color: colors.WHITE,
	},
});

export default OtpVerification;
