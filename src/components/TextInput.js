import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { normalize } from '../normalizeFont';

const TextField = props => (
  <View>
    <TextInput {...props} />
    { props.error && <Text style={styles.error}>{props.error}</Text> }
  </View>
)

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: normalize(10),
    fontFamily: 'Roboto_400Regular',
    marginLeft: normalize(16),
  }
})
export default TextField