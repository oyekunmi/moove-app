import React from "react";
import { normalize } from "../normalizeFont";
import { StatusBar, View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    marginTop: normalize(20 + StatusBar.currentHeight ?? 20),
  },
  title: {
    fontSize: normalize(14),
    color: '#908F8F',
    fontFamily: 'Roboto_400Regular',
  },
  subTitle: {
    fontSize: normalize(28),
    marginTop: 15,
    fontFamily: 'Roboto_900Black',
    color: '#181818',
  },
});
export default function Title({ subTitle, subTitleStyle, title, titleStyle, containerStyle, statusBarStyle }) {

  const titleColor = statusBarStyle === 'light-content' ? '#F1F1F1': styles.title.color
  const subTitleColor = statusBarStyle === 'light-content' ? '#FFFFFF': styles.subTitle.color

  const _titleStyle = [styles.title, { color: titleColor }, titleStyle]
  const _subTitleStyle = [styles.subTitle, { color: subTitleColor }, subTitleStyle]
  const _containerStyle = [styles.titleContainer, containerStyle]

  return (
    <View style={_containerStyle}>
      <Text style={_titleStyle}>{title}</Text>
      <Text style={_subTitleStyle}>{subTitle}</Text>
    </View>
  );

} 