import React from "react";
import { StatusBar, View, Text, StyleSheet, Button } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { normalize } from "../normalizeFont";
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    marginTop: normalize(StatusBar.currentHeight ?? 20),
  },
  backIcon: {
    // backgroundColor: "#ccc",
    color: "#000",
    padding: 0,
    marginBottom: normalize(10),
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
  if(showBackButton)
    navigation = useNavigation();

  const titleColor = statusBarStyle === 'light-content' ? '#F1F1F1' : styles.title.color
  const subTitleColor = statusBarStyle === 'light-content' ? '#FFFFFF' : styles.subTitle.color

  const _titleStyle = [styles.title, { color: titleColor }, titleStyle]
  const _subTitleStyle = [styles.subTitle, { color: subTitleColor }, subTitleStyle]
  const _containerStyle = [styles.titleContainer, containerStyle]

  return (
    <View style={_containerStyle}>

      {showBackButton && <View style={styles.backIcon}>
          <FontAwesome.Button
            style={{ padding: 0 }}
            name="long-arrow-left"
            color="#000"
            // backgroundColor="#fff"
            onPress={() => navigation.goBack()}
          >Back</FontAwesome.Button>
        </View>
      }
      <Text style={_titleStyle}>{title}</Text>
      <Text style={_subTitleStyle}>{subTitle}</Text>
    </View>
  );

} 