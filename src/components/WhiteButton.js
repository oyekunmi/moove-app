import React from 'react'
import { StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import AppButton from './Button';
import { normalize } from '../normalizeFont';

const styles = StyleSheet.create({
  text: {
    color: "#CE0303",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  button: {
    marginBottom: normalize(5)
  }
});

const GreenButton = ({
  onPress,
  onLongPress,
  onLayout,
  rippleColor,
  textStyle,
  buttonStyle,
  background,
  title,
  disabled
}) => {

    const commonState = useSelector((state) => state.common);

    return (
      <AppButton
        onLongPress={onLongPress}
        onLayout={onLayout}
        disabled={disabled}
        onPress={onPress}
        rippleColor={rippleColor}
        background={background}
        style={[styles.button, buttonStyle, disabled ? {backgroundColor: 'rgba(255, 255, 255, 0.5)'}: { backgroundColor: '#ffffff'}]}
      >
        { commonState.isLoading === true ? <ActivityIndicator size="large" color="#CE0303" /> : <Text style={[styles.text, textStyle]}>{title}</Text>}
      </AppButton>
    )
}


export default GreenButton