import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, Image} from 'react-native';
import AppButton from './Button';
import { normalize } from '../normalizeFont';

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(13),
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#CE0303',
    marginBottom: normalize(5)
  }
})

const RedButton = ({
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

  const commonState = useSelector((state) => state.common)

    return (
      <AppButton
        onLongPress={onLongPress}
        onLayout={onLayout}
        disabled={disabled}
        onPress={onPress}
        rippleColor={rippleColor}
        background={background}
        style={[styles.button, buttonStyle]}
      >
          { commonState.isLoading === true ? <Image source={require('../../assets/loading_light.png')} /> : <Text style={[styles.text, textStyle]}>{title}</Text>}
      </AppButton>
    )
}


export default RedButton