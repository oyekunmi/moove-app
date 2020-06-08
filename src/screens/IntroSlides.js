import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Alert, Platform, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { normalize } from './../normalizeFont';
import { useDispatch } from 'react-redux';
import { hideIntro } from '../redux/actions';


const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  titleContainerStyle: {
    flex: 1,
    paddingTop: 50 + StatusBar.currentHeight?? 20,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: normalize(14),
    color: '#F1F1F1',
    fontFamily: 'Roboto_400Regular'
  },
  subTitle: {
    fontSize:  normalize(28),
    marginTop: 15,
    fontFamily: 'Roboto_900Black',
    color: '#FFFFFF',
  },
  contentStyle: {
    flex: 4,
    alignItems:"center",
    justifyContent: "space-evenly"
  },
  image: {
    width: '95%',
    height: '50%',
    resizeMode: 'contain',
    
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    marginBottom: normalize(32),
    fontSize: normalize(14)
  },
  dotStyle: {
    width: normalize(30), 
    backgroundColor: '#E5E0E0'
  },
  activeDotStyle: {
    width: normalize(30),
    backgroundColor: '#E8505B'
  }
});

const slides = [
  {
    key: '1',
    title: 'Deliveries shouldn’t be a pain',
    subTitle: 'Why not “effortlessly”',
    text: 'We can take your packages and products \nto your desired location effortlessly and \nsafely...',
    image: require('./../../assets/intro1.png'),
    backgroundColor: '#FFFFFF',
    statusBarStyle: 'dark-content',
    titleStyle: [
      styles.title,
      { color: '#908F8F'}
    ],
    subTitleStyle: {
      ...styles.subTitle,
      color: '#181818',
    },
    textStyle: {
      ...styles.text,
      color: "#525151",
    },
    imageStyle: styles.image,
  },
  {
    key: '2',
    title: 'Do you know you can',
    subTitle: 'Get deliveries... “Stress free”',
    text: 'Let’s take the load off your shoulders. We are \njust a click away...',
    image: require('./../../assets/intro2.png'),
    statusBarStyle: 'light-content',
    backgroundColor: '#132535',
    titleStyle: styles.title,
    subTitleStyle: styles.subTitle,
    textStyle: styles.text,
    imageStyle: styles.image,
  },
  {
    key: '3',
    title: 'moovelogic offers',
    subTitle: 'superfast food delivery \nto your doorstep',
    text: 'get your food orders steaming hot \njust like it’s from the pot',
    image: require('./../../assets/intro3.png'), 
    statusBarStyle: 'light-content',
    backgroundColor: '#CE0303',
    titleStyle: styles.title,
    subTitleStyle: styles.subTitle,
    textStyle: styles.text,
    imageStyle: styles.image,
  }
];

export default function IntroSliders() {
  const dispatch = useDispatch()

  const onDone = async () => {
    await AsyncStorage.setItem('introduced', 'true');
    dispatch(hideIntro())
  }

  const _onSlideChange = (index) => {
    StatusBar.setBarStyle(slides[index].statusBarStyle)
  }

  const _renderItem = ({ item }) => {
    return (

      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.backgroundColor,
          },
        ]}
      >
        <View style={styles.titleContainerStyle}>
          <Text style={item.titleStyle}>{item.title}</Text>
          <Text style={item.subTitleStyle}>{item.subTitle}</Text>
        </View>

        <View style={styles.contentStyle}>
          <Image source={item.image} style={styles.image} />
          <Text style={item.textStyle}>{item.text}</Text>
        </View>
       
      </View>
    );
  }

  return ( 
    <>
    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
    <AppIntroSlider
      activeDotStyle={styles.activeDotStyle}
      dotStyle={styles.dotStyle}
      showNextButton={false}
      renderItem={_renderItem} 
      data={slides}
      onSlideChange={_onSlideChange}
      onDone={onDone} />
   </>
  )
}