import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { normalize } from "../normalizeFont";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  titleContainer: {
    paddingBottom: normalize(16),
    marginTop: normalize(20),
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
    marginTop: normalize(10),
    fontFamily: 'Roboto_900Black',
    fontWeight: 'bold',
    color: '#181818',
  },
  icon: {
    width: normalize(14),
    height: normalize(14),
    display: 'flex',
    justifyContent: 'center',
    marginBottom: normalize(10),
  }
});

export default function Title({ subTitle, subTitleStyle, title, titleStyle, containerStyle, statusBarStyle, fontIcon, headerOptionHandler,orderId }) {

  const titleColor = statusBarStyle === 'light-content' ? '#F1F1F1' : styles.title.color
  const subTitleColor = statusBarStyle === 'light-content' ? '#FFFFFF' : styles.subTitle.color

  const _titleStyle = [styles.title, { color: titleColor }, titleStyle]
  const _subTitleStyle = [styles.subTitle, { color: subTitleColor }, subTitleStyle]
  const _containerStyle = [styles.titleContainer, containerStyle ]

  return (
    <View style={_containerStyle}>
      <View style={{ width: normalize(24)}}>
        <TouchableOpacity onPress={() => headerOptionHandler()}>
          {fontIcon === 'arrow_back' && (<View style={styles.icon}>
            <Image source={require('./../../assets/arrow_back.png')}  />
          </View>)}
          {fontIcon === 'arrow_back_light' && (<View style={styles.icon}>
            <Image source={require('./../../assets/arrow_back_light.png')}  />
          </View>)}
          {fontIcon === 'side_menu' && (<View style={styles.icon}>
            <Entypo name="menu" size={24} color="#DADADA" />
          </View>)}
        </TouchableOpacity>
      </View>
      <Text style={_titleStyle}>{title}</Text>
      <Text style={_subTitleStyle}>{subTitle} {orderId && <Text style={{ color: "#7AC043", borderWidth: 1, borderStyle: 'solid', borderColor: 'red' }}> {orderId}</Text>}</Text>
    </View>
  );

}