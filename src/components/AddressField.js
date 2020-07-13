import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { normalize } from '../normalizeFont';

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#e6e6e6",
    borderRadius: normalize(20),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    marginBottom: normalize(10),
  },
  label: {
    fontFamily: 'Roboto_700Bold',
  },
  input: {
    // backgroundColor: 'red',
    // borderRadius: normalize(20),
    // height: normalize(40),
    // fontSize: normalize(14),
    // paddingHorizontal: normalize(10),
    // marginVertical: normalize(5),
  },
})

function AddressField(props) {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.label && <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>}
      <TextInput
        style={[styles.input, props.inputStyle]}
        {...props}
      />
    </View>
  )
}

export default AddressField;