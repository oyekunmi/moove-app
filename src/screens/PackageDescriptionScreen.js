import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, Keyboard, Text, StatusBar, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { normalize } from '../normalizeFont';
import { changePackageInfo, setTripCost } from '../redux/actions';
import RedButton from '../components/RedButton';
import Title from '../components/Title';
import AddressField from '../components/AddressField';
import {  changeSourceAddress, changeDestinationAddress } from '../redux/actions';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';
import { calculateCost } from '../utils/helpers/api';

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
    color: '#181818'
  },
  packageInput: {
    backgroundColor: "#efefef",
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    height: normalize(145),
    fontSize: normalize(13),
    color: '#545252'
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(20),
    alignSelf: "center",
    width: '100%',
  },
})

export default function PackageDescriptionScreen({ navigation }) {

  let trip = useSelector(state => state.trip);
  let auth = useSelector(state => state.auth);

  const [distance, setDistance ] = useState('');
  const [duration, setDuration] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {

    const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${trip.sourceCoord.latitude},${trip.sourceCoord.longitude}&destinations=${trip.destinationCoord.latitude},${trip.destinationCoord.longitude}&&mode=driving&key=${GOOGLE_PLACES_API_KEY}`;

    async function fetchData() {
      const response = await axios.get(distanceMatrixUrl);
      let { distance, duration } = response.data.rows[0].elements[0];
      const { status } = response.data.rows[0].elements[0];

      if( status === 'OK') {
        distance = distance.text.split(' ').filter(value => Number(value)).join('');
        duration = duration.text.split(' ').filter(value => Number(value)).join('.');
      }

      setDistance(distance);
      setDuration(duration);

    }

    fetchData();

  }, []);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const onContinue = async () => {
    if (!trip.package) {
      Alert.alert('No package description', 'Please fill out the package description field' , null, { cancelable: true });
      return;
    }

    const cost = await calculateCost(auth.name, auth.phone, trip.package, null, trip.source, trip.destination, null, distance, duration);

    dispatch(setTripCost(cost));

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