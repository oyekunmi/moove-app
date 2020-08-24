import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Text, StatusBar, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { normalize } from '../normalizeFont';
import { changePackageInfo } from '../redux/actions';
import RedButton from '../components/RedButton';
import Title from '../components/Title';
import AddressField from '../components/AddressField';
import {  changeSourceAddress, changeDestinationAddress } from '../redux/actions';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingTop: normalize(10),
    justifyContent: 'space-between',
    flexGrow: 2,

  },
  packageContainer: {
    zIndex: -500
  },
  packageLabel: {
    marginVertical: normalize(10),
    paddingHorizontal: normalize(15),
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(14),
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

// https://maps.googleapis.com/maps/api/distancematrix/json?origin=19.107163,72.862375&destination=place_id:ChIJ_0P9DzjI5zsRf5xuhTv8VCk&sensor=false&mode=driving&alternatives=true&key=XXXXXXXXXXXXXXXXXXXXXX

export default function PackageDescriptionScreen({ navigation }) {

  const dispatch = useDispatch();

  useEffect(() => {
    const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${trip.sourceCoord.latitude},${trip.sourceCoord.longitude}&destinations=${trip.destinationCoord.latitude},${trip.destinationCoord.longitude}&&mode=driving&key=${GOOGLE_PLACES_API_KEY}`;


    async function fetchData() {
      const response = await axios.get(distanceMatrixUrl);
      console.log('FROM DISTANCE MATRIX ----->', response);
    }

    fetchData();

  }, []);


  let trip = useSelector(state => state.trip);
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
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow:1 }} keyboardShouldPersistTaps='always'>

        <Title
          showBackButton={true}
          title={"package description"}
          fontIcon='arrow_back'
          headerOptionHandler={() => navigation.goBack()}
          subTitle={"One more step. Enter your package description"}
          subTitleStyle={{ fontSize: normalize(21),lineHeight: normalize(25), width: normalize(240) }}
          containerStyle={{ paddingHorizontal: normalize(18),}} />

        <View style={styles.content}>
            <View>
                <AddressField
                  value={trip.source}
                  label="Pickup Location"
                  event={changeSourceAddress}
                  containerStyle={{ height: normalize(71) }} />

                <AddressField
                  value={trip.destination}
                  label="Delivery Location"
                  event={changeDestinationAddress}
                  containerStyle={{ height: normalize(71) }} />

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