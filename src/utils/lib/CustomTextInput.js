import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import {GenericStyles} from '../styles/GenericStyles';

const CustomTextInput = function(props) {
  const {
    containerStyle,
    style,
    LeftComponent,
    RightComponent,
    refCallback,
    ...remainingProps
  } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {LeftComponent}
      <TextInput
        {...remainingProps}
        style={[styles.textInputStyle, GenericStyles.fill, style]}
        ref={refCallback}
      />
      {RightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
  },
  textInputStyle: {
    padding: 0,
  },
});

export default CustomTextInput;