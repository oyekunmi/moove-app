import React, { Children } from 'react'
import {TouchableNativeFeedback, StyleSheet, View, Text} from 'react-native';
import AppButton from './Button';
import { normalize } from '../normalizeFont';

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(18),
  },
  button: {
    backgroundColor: '#7AC043',
  }
})

const GreenButton = ({
  onPress,
  onLongPress,
  onLayout,
  rippleColor,
  textStyle,
  buttonStyle,
  background,
  title,
}) => {


    return (
      <AppButton
        onLongPress={onLongPress}
        onLayout={onLayout}
        onPress={onPress}
        rippleColor={rippleColor}
        background={background}
        style={[styles.button, buttonStyle]}
      >
          <Text style={[styles.text, textStyle]}>{title}</Text>
      </AppButton>
    )
}


export default GreenButton