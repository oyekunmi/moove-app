import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, StyleSheet, Keyboard, Text, StatusBar, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { changePackageInfo, setTripCost, isAppLoading, addRecipientPhone, addRecipientName } from '../redux/actions';

import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import { calculateCost } from '../utils/helpers/api';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';

export default function OrderMoovePackageDescriptionScreen({ navigation }) {

  let trip = useSelector(state => state.trip);
  let common = useSelector(state => state.common);

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [enableButton, setEnableButton] = useState(true);
  const recipientPhone = trip.recipientPhone;
  const recipientName = trip.recipientName;
  const packageDescription = trip.package;
  const dispatch = useDispatch();

  useEffect(() => {

    const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${trip.sourceCoord.latitude},${trip.sourceCoord.longitude}&destinations=${trip.destinationCoord.latitude},${trip.destinationCoord.longitude}&&mode=driving&key=${GOOGLE_PLACES_API_KEY}`;

    async function fetchData() {
      const response = await axios.get(distanceMatrixUrl);
      let { distance, duration } = response.data.rows[0].elements[0];
      const { status } = response.data.rows[0].elements[0];

      if (status === 'OK') {
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

    dispatch(isAppLoading(true));

    try {

      const cost = await calculateCost(recipientName, recipientPhone, trip.package, null, trip.source, trip.destination, null, distance, duration);
      dispatch(setTripCost(cost));
      dispatch(isAppLoading(false));
      navigation.navigate('OrderMoovePackageVerification');
    } catch (error) {
      // There is no error response that can be tapped into from the backend this should be changed to reflect the error
      Alert.alert('An error has occurred', 'Please verify your input', null, { cancelable: true });
      dispatch(isAppLoading(false));
    }
  }

  const onChangeRecipientPhone = (recipientPhone) => {
    dispatch(addRecipientPhone(recipientPhone));
  }
  const onChangeRecipientName = (recipientName) => {
    dispatch(addRecipientName(recipientName));
  }
  const onChangePackageDescription = (packageDescription) => {
    dispatch(changePackageInfo(packageDescription));
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


  useEffect(()=>{
    setEnableButton(recipientPhone.length > 0 && recipientName.length > 0 && packageDescription.length > 0);
  }, [trip]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Title
        title={"package description"}
        fontIcon='arrow_back'
        headerOptionHandler={() => navigation.goBack()}
        subTitle={"One more step. Enter your package description"}
        subTitleStyle={{ fontSize: normalize(20), lineHeight: normalize(25), width: normalize(240) }}
        containerStyle={{ paddingHorizontal: normalize(18), }} />

      <View style={styles.content}>
        <View>
          <View style={styles.deliveryLocation}>
            <View style={styles.deliveryContent}>
              <Text style={styles.deliveryLocationLabel}>Pickup Location</Text>
              <Text style={styles.deliveryLocationDetails}>{trip.source}</Text>
            </View>

          </View>

          <View style={styles.deliveryLocation}>
            <View style={styles.deliveryContent}>
              <Text style={styles.deliveryLocationLabel} >Delivery Location</Text>
              <Text style={styles.deliveryLocationDetails}>{trip.destination}</Text>
            </View>
          </View>

          <View style={styles.packageContainer}>
            <Text style={styles.packageLabel}>Recipient Phone Number</Text>
            <TextInput
              style={styles.phoneInput}
              value={recipientPhone}
              onChangeText={onChangeRecipientPhone}
              keyboardType='numeric'
              autoFocus />
          </View>
          <View style={styles.packageContainer}>
            <Text style={styles.packageLabel}>Recipient Name:</Text>
            <TextInput
              style={styles.phoneInput}
              value={recipientName}
              onChangeText={onChangeRecipientName}
              autoFocus />
          </View>
          <View style={styles.packageContainer}>
            <Text style={styles.packageLabel}>Delivery Item Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              style={styles.packageInput}
              value={packageDescription}
              onChangeText={onChangePackageDescription}
              autoFocus />
          </View>
        </View>
        <RedButton
          title="Complete moove request"
          buttonStyle={styles.button}
          disabled={!enableButton}
          onPress={onContinue} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  content: {
    paddingHorizontal: normalize(18),
    justifyContent: 'space-between',
    flexGrow: 2,

  },
  packageContainer: {
    zIndex: -500
  },
  packageLabel: {
    marginTop: normalize(15),
    marginBottom: normalize(8),
    paddingLeft: normalize(6),
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
    paddingBottom: normalize(35)
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
    marginVertical: normalize(15),
    alignSelf: "center",
    width: '100%',
  },
})
