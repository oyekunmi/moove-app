import React from 'react';
import { Button, View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Title from '../components/Title';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-"
  },
  map: {
    flex: 4,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  spinner: {
    flex: 4,
    alignSelf: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: normalize(18),
    marginTop: normalize(20),
  },
  source: {
    backgroundColor: "#e6e6e6",
    borderRadius: normalize(20),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    marginBottom: normalize(10),
  },
  sourceTitle: {
    fontFamily: 'Roboto_700Bold',
  },
  contentInput: {
    // backgroundColor: 'red',
    // borderRadius: normalize(20),
    // height: normalize(40),
    // fontSize: normalize(14),
    // paddingHorizontal: normalize(10),
    // marginVertical: normalize(5),

  },
  button: {
    position: 'absolute',
    left: normalize(18),
    right: normalize(18),
    bottom: normalize(10),
    width: '90%',
  },
})

export default function PackageDescription({navigation}) {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Title
        title={"package description"}
        subTitle={"One more step. Enter your package description"}
        subTitleStyle={{ fontSize: normalize(22) }}
        containerStyle={{ paddingHorizontal: normalize(18), }} />
 
      <RedButton
        title="Complete moove request"
        buttonStyle={styles.button}
        onPress={() => dispatch(signOut())} />
    </View>
  );

}