import React from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import { normalize } from '../normalizeFont';

const TextField = props => {
  return (
    <View style={{ marginBottom: normalize(8)}}>
      {props.iconSource && <Image style={[styles.icon, props.fieldIconPosition && {left: `${props.fieldIconPosition}%`} ]} source={props.iconSource} /> }

      {props.label && <Text style={styles.contentLabel}>{props.label}</Text>}
      <TextInput {...props } style={[styles.contentInput, props.iconSource && {paddingLeft: normalize(+props.placeholderPaddingLeft) ||normalize(38)} , props.marginBottom && { marginBottom: props.marginBottom}]} />
      { props.error && <Text style={styles.error}>{props.error}</Text> }
    </View>
  )}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: normalize(10),
    fontFamily: 'Roboto_400Regular',
    marginLeft: normalize(16),
    position: 'absolute',
    top: '100%',
  },
  contentInput: {
    backgroundColor: '#E5E5E5',
    borderRadius: normalize(20),
    height: normalize(40),
    fontSize: normalize(14),
    paddingHorizontal: normalize(20),
  },
  contentLabel: {
    color: '#545252',
    fontFamily: 'Roboto_400Regular',
    fontSize: normalize(11),
    marginBottom: normalize(7),
    marginLeft: normalize(14)
  },
  icon: {
    width: normalize(16),
    height: normalize(16),
    left: '5%',
    top: '50%',
    transform: [{ translateY: normalize(-8) }],
    position: 'absolute',
    zIndex: 2,
  },
})

export default TextField