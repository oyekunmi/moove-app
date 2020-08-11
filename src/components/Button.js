import React, { Children } from 'react'
import {TouchableNativeFeedback, StyleSheet, View, Text} from 'react-native';
import { normalize } from '../normalizeFont';

const noop = () => {}

const styles = StyleSheet.create({
  button: {
    height: normalize(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: normalize(4),
    borderRadius: normalize(20),
  }
});

const AppButton = ({
  onPress = noop,
  onLongPress = noop,
  onLayout = noop,
  children,
  rippleColor,
  style,
  background,
  disabled
}) => {
    return (
      <TouchableNativeFeedback
        disabled={disabled}
        onLongPress={onLongPress}
        onLayout={onLayout}
        onPress={onPress}
        background={background ? TouchableNativeFeedback[background]() : TouchableNativeFeedback.Ripple(rippleColor, false)}>
        <View style={[styles.button,style]}>
          {Children.map(children, child => child)}
        </View>
      </TouchableNativeFeedback>
    )
}


export default AppButton