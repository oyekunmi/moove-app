import React from "react";
import { StatusBar, View, Text, StyleSheet, Button, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { normalize } from "../normalizeFont";
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: normalize(StatusBar.currentHeight ?? 20),
    paddingBottom: normalize(20),
  },
  backIcon: {
    color: "#000",
    padding: 0,
    marginBottom: normalize(10),
    width: normalize(50),
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

export default function Title({ subTitle, subTitleStyle, title, titleStyle, containerStyle, statusBarStyle, showBackButton }) {

  let navigation;
  if (showBackButton)
    navigation = useNavigation();

  const titleColor = statusBarStyle === 'light-content' ? '#F1F1F1' : styles.title.color
  const subTitleColor = statusBarStyle === 'light-content' ? '#FFFFFF' : styles.subTitle.color

  const _titleStyle = [styles.title, { color: titleColor }, titleStyle]
  const _subTitleStyle = [styles.subTitle, { color: subTitleColor }, subTitleStyle]
  const _containerStyle = [styles.titleContainer, containerStyle, showBackButton? {marginTop: normalize(10)}: {} ]

  return (
    <View style={_containerStyle}>
      {showBackButton && (
        <TouchableWithoutFeedback
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="long-arrow-left" size={normalize(14)} style={{ paddingVertical: normalize(10), color: subTitleColor }}  />
        </TouchableWithoutFeedback>
      )}
      <Text style={_titleStyle}>{title}</Text>
      <Text style={_subTitleStyle}>{subTitle}</Text>
    </View>
  );

} 