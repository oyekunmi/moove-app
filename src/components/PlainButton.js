import React from 'react'
import { TouchableNativeFeedback, StyleSheet, View, Text } from 'react-native';
import { normalize } from '../normalizeFont';

const noop = () => {}

const styles = StyleSheet.create({
  button: {
    height: normalize(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const PlainButton = ({
  onPress = noop,
  onLongPress = noop,
  onLayout = noop,
  rippleColor,
  style,
  background,
  title,
  titleStyle,
}) => {
    return (
      <TouchableNativeFeedback
        onLongPress={onLongPress}
        onLayout={onLayout}
        onPress={onPress}
        background={background ? TouchableNativeFeedback[background]() : TouchableNativeFeedback.Ripple(rippleColor, false)}>
        <View style={[styles.button,style]}>
          <Text style={titleStyle}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    )
}


export default PlainButton