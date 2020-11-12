import React, { useState, useEffect,useCallback } from 'react';
import { Alert, View, StyleSheet, Keyboard, Text, StatusBar, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { normalize } from '../normalizeFont';
import { changePackageInfo, setTripCost, isAppLoading,addRecipientPhone, isBtnDisabled } from '../redux/actions';
import RedButton from '../components/RedButton';
import Title from '../components/Title';
import AddressField from '../components/AddressField';
import {  changeSourceAddress, changeDestinationAddress } from '../redux/actions';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';
import { calculateCost } from '../utils/helpers/api';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingTop: normalize(20)
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
    height: normalize(100),
    fontSize: normalize(13),
    color: '#545252'
  },
  phoneInput: {
    backgroundColor: "#efefef",
    borderRadius: normalize(20),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    color: '#545252'
  },
  deliveryLocation: {
    height: normalize(80),
    marginTop: normalize(7),
    borderRadius: normalize(15),
    display: 'flex',
    backgroundColor: "#efefef"
  },
  deliveryContent: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: normalize(14),
    paddingTop: normalize(30),
    paddingBottom:normalize(35)
  },
  deliveryLocationLabel: {
    fontSize: normalize(14),
    fontFamily: 'Roboto_500Medium',
    marginBottom: normalize(10),
    marginTop: normalize(18)
  },
  deliveryLocationDetails: {
    fontSize: normalize(13),
    color: '#545252',
    fontFamily: 'Roboto_400Regular',
    lineHeight: normalize(15)
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
  let common = useSelector(state => state.common);

  const [distance, setDistance ] = useState('');
  const [duration, setDuration] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

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

  useEffect(() => {
    changePackageDescriptionHandler(packageDescription);
    changeRecipientPhoneHandler(recipientPhone);
    dispatch(changePackageInfo(packageDescription));
  }, [packageDescription, trip.package]);

  const changePackageDescriptionHandler = value => {

    value.length === 0 ?
      dispatch(isBtnDisabled(true)) :
      dispatch(isBtnDisabled(false));

  };
  const changeRecipientPhoneHandler = value => {

    value.length === 0 ?
      dispatch(isBtnDisabled(true)) :
      dispatch(isBtnDisabled(false));

  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const onContinue = async () => {

    dispatch(isBtnDisabled(true));
    dispatch(isAppLoading(true));

    try {

      const cost = await calculateCost(auth.name, recipientPhone, trip.package, null, trip.source, trip.destination, null, distance, duration);
      dispatch(addRecipientPhone(recipientPhone));
      dispatch(setTripCost(cost));
      dispatch(isAppLoading(false));
      navigation.navigate('MooveVerification');
    } catch (error) {
      // There is no error response that can be tapped into from the backend this should be changed to reflect the error
      Alert.alert('An error has occurred', 'Please verify your input', null, { cancelable: true });
      dispatch(isAppLoading(false));
    }
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
          subTitleStyle={{ fontSize: normalize(20),lineHeight: normalize(25), width: normalize(240) }}
          containerStyle={{ paddingHorizontal: normalize(18),}} />

        <View style={styles.content}>
            <View>
                <AddressField
                  value={trip.source}
                  label="Pickup Location"
                  event={changeSourceAddress}
                  editable={false}
                  containerStyle={{ height: normalize(71) }} />
              <View style={styles.deliveryLocation}>
                <View style={styles.deliveryContent}>
                <Text style={styles.deliveryLocationLabel} >Delivery Location</Text>
                <Text style={styles.deliveryLocationDetails}>{trip.destination}</Text>
              </View>
          </View>

              <View style={styles.packageContainer}>
                <Text style={styles.packageLabel}>Recipient Phone Number:</Text>
                <TextInput                 
                  style={styles.phoneInput}
                  value={recipientPhone}
                  onChangeText={setRecipientPhone}
                  autoFocus />
              </View>
              <View style={styles.packageContainer}>
                <Text style={styles.packageLabel}>Delivery Item Description</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  style={styles.packageInput}
                  value={packageDescription}
                  onChangeText={setPackageDescription}
                  autoFocus />
              </View>
            </View>

          <RedButton
            title="Complete moove request"
            buttonStyle={styles.button}
            disabled={common.isBtnDisabled}
            onPress={onContinue} />
        </View>

      </ScrollView>

    </>
  );

}