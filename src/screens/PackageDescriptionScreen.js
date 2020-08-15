import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Text, StatusBar, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { normalize } from '../normalizeFont';
import { changePackageInfo } from '../redux/actions';
import RedButton from '../components/RedButton';
import Title from '../components/Title';
import SourceAddress from '../components/SourceAddress';
import DeliveryAddress from '../components/DeliveryAddress';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,

  },
  packageContainer: {
  },
  packageLabel: {
    marginVertical: normalize(10),
    paddingHorizontal: normalize(15),
    fontFamily: 'Roboto_700Bold',
  },
  packageInput: {
    backgroundColor: "#efefef",
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    height: normalize(145),
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(20),
    alignSelf: "center",
    width: '100%',
  },
})

export default function PackageDescriptionScreen({ navigation }) {
  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const onContinue = () => {
    if (!trip.package) {
      return;
    }
    navigation.navigate('MooveVerification')
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  StatusBar.setBackgroundColor("#ffffff");
  StatusBar.setBarStyle("dark-content");

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>

        <Title
          showBackButton={true}
          title={"package description"}
          fontIcon={{name: 'long-arrow-left', color: "#000000", size: 14 }}
          headerOptionHandler={() => navigation.goBack()}
          subTitle={"One more step. Enter your package description"}
          subTitleStyle={{ fontSize: normalize(21),lineHeight: normalize(25), width: normalize(240) }}
          containerStyle={{ paddingHorizontal: normalize(18),}} />

        <View style={styles.content}>

          <SourceAddress theme="dark-content" />
          <DeliveryAddress theme="dark-content" />

          <View style={styles.packageContainer}>
            <Text style={styles.packageLabel}>Delivery Item Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              style={styles.packageInput}
              value={trip.package}
              onChangeText={text => dispatch(changePackageInfo(text))}
              autoFocus />
          </View>

          <RedButton
            title="Complete moove request"
            buttonStyle={styles.button}
            onPress={onContinue} />

        </View>

      </ScrollView>

    </>
  );

}