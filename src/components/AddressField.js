import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { normalize } from '../normalizeFont';

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#EFEFEF",
    borderRadius: normalize(20),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    marginBottom: normalize(10),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  label: {
    fontFamily: 'Roboto_500Medium',
    color: '#181818',
    fontSize: normalize(14),
    lineHeight: normalize(16),
  },
  input: {
    color: '#545252',
    fontFamily: 'Roboto_400Regular',
    fontSize: normalize(13),
    lineHeight: normalize(15),
  },
  editBtn: {
    backgroundColor: '#2B4257',
    width: normalize(50),
    height: normalize(25),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(15),
  },
  editBtnLabel: {
    color: '#DADADA',
    fontFamily: 'Roboto_500Medium',
    fontSize: normalize(12),
    lineHeight: normalize(14)
  }
})

function AddressField(props) {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        {props.label && <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>}
        {props.isEditable &&
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnLabel}>Edit</Text>
        </TouchableOpacity>}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row'}}>
        <TextInput
          style={[styles.input, props.inputStyle]}
          {...props}
          placeholderTextColor="#545252"
        />
      </View>
    </View>
  )
}

export default AddressField;