/** @format */

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { normalize } from '../normalizeFont';

const OTPInput = (props) => {
  const [otpValue, setOtpValue] = useState('');

  const formatOtpHandler = (input) => {
    let arrInput = Array.from(input).filter(value => value !== '-');
    setOtpValue(arrInput.join('-'))
  }
	return (
    <>
    <View style={styles.otpContainer}>
      <TextInput
        style={styles.otpInput}
        keyboardType='numeric'
        autoFocus
        maxLength={7}
        value={otpValue}
        onChangeText={formatOtpHandler}
      />
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  otpContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  otpInput: {
    fontSize: normalize(48),
    lineHeight: normalize(56),
    letterSpacing: normalize(10),
    color: '#ffffff',
    width: normalize(220),
    textAlign: 'center'
  }
});

export default OTPInput;
