import React, { forwardRef } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import { normalize } from '../normalizeFont';

const TextField = forwardRef((props, ref) => {
  return (
    <>
      {props.label && <Text style={{...styles.contentLabel, color: props.labelColor ? `${props.labelColor}`: '#545252'}}>{props.label}</Text>}
      <View style={{ marginBottom: normalize(8)}}>
        {props.iconSource && <Image style={[styles.icon, props.fieldIconPosition && {left: `${props.fieldIconPosition}%`} ]} source={props.iconSource} /> }

        <TextInput {...props } ref={ref} style={[styles.contentInput, props.iconSource && {paddingLeft: normalize(+props.placeholderPaddingLeft) ||normalize(38)} , props.marginBottom && { marginBottom: props.marginBottom}, {backgroundColor: props.inputBackgroundColor ? `${props.inputBackgroundColor}`:'#EFEFEF'}]} />
        { props.error && <Text style={{...styles.error, color: props.errorTextColor || '#CE0303' }}>{props.error}</Text> }
      </View>
    </>
  )})

const styles = StyleSheet.create({
  error: {
    fontSize: normalize(10),
    fontFamily: 'Roboto_400Regular',
    marginLeft: normalize(16),
    position: 'absolute',
    top: '100%',
  },
  contentInput: {
    borderRadius: normalize(20),
    height: normalize(40),
    fontSize: normalize(14),
    paddingHorizontal: normalize(20),
  },
  contentLabel: {
    fontFamily: 'Roboto_400Regular',
    fontSize: normalize(11),
    marginBottom: normalize(7),
    marginLeft: normalize(14)
  },
  icon: {
    width: normalize(15),
    height: normalize(16),
    left: '5%',
    top: '50%',
    transform: [{ translateY: normalize(-8) }],
    position: 'absolute',
    zIndex: 2,
  },
})

export default TextField