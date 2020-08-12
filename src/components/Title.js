import React from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { normalize } from "../normalizeFont";

const styles = StyleSheet.create({
  titleContainer: {
    paddingBottom: normalize(20),
  },
  backIcon: {
    color: "#000",
    padding: 0,
    marginBottom: normalize(10),
    width: normalize(50),
  },
  title: {
    fontSize: normalize(13),
    color: '#545252',
    fontFamily: 'Roboto_400Regular',
    lineHeight: normalize(15)
  },
  subTitle: {
    fontSize: normalize(21),
    lineHeight: normalize(25),
    marginTop: 15,
    fontFamily: 'Roboto_900Black',
    color: '#000000',
    width: normalize(267),
  },
});

export default function Title({ subTitle, subTitleStyle, title, titleStyle, containerStyle, statusBarStyle, fontIcon, headerOptionHandler,orderId }) {

  const titleColor = statusBarStyle === 'light-content' ? '#F1F1F1' : styles.title.color
  const subTitleColor = statusBarStyle === 'light-content' ? '#FFFFFF' : styles.subTitle.color

  const _titleStyle = [styles.title, { color: titleColor }, titleStyle]
  const _subTitleStyle = [styles.subTitle, { color: subTitleColor }, subTitleStyle]
  const _containerStyle = [styles.titleContainer, containerStyle, fontIcon? {marginTop: normalize(10)}: {} ]

  return (
    <View style={_containerStyle}>
      {(
        <TouchableWithoutFeedback
          onPress={() => headerOptionHandler()}
        >
          <FontAwesome name={fontIcon ? fontIcon.name:''} size={fontIcon ? normalize(fontIcon.size) : normalize(14)} style={{ paddingVertical: normalize(10), color: fontIcon ? fontIcon.color : subTitleColor }}  />
        </TouchableWithoutFeedback>
      )}
      <Text style={_titleStyle}>{title}</Text>
      <Text style={_subTitleStyle}>{subTitle} {orderId && <Text style={{ color: "#7AC043", borderWidth: 1, borderStyle: 'solid', borderColor: 'red' }}> {orderId}</Text>}</Text>
    </View>
  );

}