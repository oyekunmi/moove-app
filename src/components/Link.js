import React from 'react';
import { Text, Linking, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

})

export default function Link ({children, to, linkStyle} ){
    return (
      <Text
        style={[styles, linkStyle]}
        onPress={() => Linking.openURL(to)}>
        {children}
      </Text>
    )
}