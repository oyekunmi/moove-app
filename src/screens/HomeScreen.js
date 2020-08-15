import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Keyboard, ActivityIndicator, ScrollView, StatusBar, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import AddressField from '../components/AddressField';
import {  changeSourceAddress } from '../redux/actions';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';

const styles = StyleSheet.create({
  map: {
    height: normalize(230)
  },
  spinner: {
    flexGrow: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  p18: {
    paddingHorizontal: normalize(18),
  },
  button: {
    position: 'absolute',
    left: normalize(18),
    right: normalize(18),
    bottom: normalize(10),
  },
  searchFont: {
    paddingVertical: normalize(10),
    color: '#CCCCCC',
    marginRight: normalize(15),
    position: 'absolute',
    zIndex: 100,
    left: normalize(35),
    top: normalize(8),
  }
});



function HomeScreen({ navigation }) {

  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [sourceAddress, setSourceAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('')
  const [sourceCord, setSourceCord] = useState({});
  const [destinationCord, setDestinationCord] = useState({});

  const toggleDrawerHandler = () => {
    // The drawer should be toggled here
    navigation.openDrawer();
    // console.log('Drawer handler');
  }

  const onContinue = () => {
    if (!trip.destination) {
      return;
    }

    navigation.navigate('PackageDescription');
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

  const getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('An error has occurred','Permission to access location was denied', null, { cancelable: true });
    }

    const { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

    const [ { name, street, city, country} ] = await Location.reverseGeocodeAsync({ latitude, longitude });

    const sourceAddress = `${name}, ${street}, ${city}, ${country}`;
    const sourceCord = { longitude, latitude };

    setSourceAddress(sourceAddress);
    setSourceCord(sourceCord);

    dispatch(changeSourceAddress( sourceAddress, sourceCord));

  }

  useEffect(() => {
    getLocation();
  }, []);

  StatusBar.setBarStyle("dark-content");
  StatusBar.setBackgroundColor("#fff");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
      <Title
        title={"start a moove"}
        fontIcon={{name: "bars", color: "#DADADA", size: 20}}
        headerOptionHandler={toggleDrawerHandler}
        subTitle={"Your moove champion is one click away"}
        subTitleStyle={{ fontSize: normalize(26) }}
        containerStyle={{ paddingHorizontal: normalize(18)}} />

      {(!trip || !trip.sourceCoord) ? <ActivityIndicator style={styles.spinner} />
        :
          <View style={styles.content}>
            <View style={styles.p18}>
              <AddressField
                value={sourceAddress}
                label="You are Here:"
                containerStyle={{ height: normalize(71) }}
                onChangeText={setSourceAddress} />

            </View>

            <View>

              <View style={styles.p18}>
                <FontAwesome name='search' size={normalize(14)} style={styles.searchFont}  />
                <GooglePlacesAutocomplete
                  placeholder='enter delivery address'
                  minLength={2}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                  }}
                  styles={{
                    listView: {
                      backgroundColor: '#EFEFEF',
                      position: 'absolute',
                      top: '100%',
                      zIndex: 500
                    },
                    textInputContainer: {
                      backgroundColor:'#fff',
                      marginBottom: normalize(10),
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    description: {
                      fontFamily: 'Roboto_400Regular',
                    },
                    textInput: {
                      backgroundColor: "#EFEFEF",
                      paddingLeft: normalize(30),
                      height: normalize(37),
                      width: normalize(296),
                      color: '#545252',
                      fontSize: 16,
                      borderRadius: normalize(50),
                      fontFamily: 'Roboto_400Regular'
                    },
                  }}
                  query={{
                    key: `${GOOGLE_PLACES_API_KEY}`,
                    language: 'en',
                  }}
                  fetchDetails={true}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={200}
                />
              </View>
              <View>
              <MapView style={styles.map}
                initialRegion={{
                  latitude: trip.sourceCoord.latitude,
                  longitude: trip.sourceCoord.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                }} >
                <Marker
                  coordinate={trip.sourceCoord}
                  title="My location"
                  description="My location 2"
                />

              </MapView>
            </View>
          </View>

        </View>
      }

      {!isKeyboardVisible &&
        <RedButton
          title="Request a Moove"
          buttonStyle={styles.button}
          onPress={onContinue} />
      }

    </ScrollView>
  );
}

export default HomeScreen