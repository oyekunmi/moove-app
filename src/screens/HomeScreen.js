import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { View,Image, StyleSheet, Keyboard, ActivityIndicator, ScrollView, StatusBar, Alert } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import AddressField from '../components/AddressField';
import {  changeSourceAddress, changeDestinationAddress } from '../redux/actions';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '81.5%',
    width: '100%',
    minHeight: normalize(230),
  },
  content: {
    justifyContent: 'space-between',
    flex: 2
  },
  spinner: {
    flexGrow: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  p18: {
    paddingHorizontal: normalize(18),
  },
  searchFont: {
    position: 'absolute',
    zIndex: 100,
    left: normalize(32),
    top: normalize(17),
  },
  button:{
    marginTop:normalize(33),
    marginBottom: normalize(12),
    width:'100%'
  }
});

function HomeScreen({ navigation, route }) {

  useEffect(() => {
    if(route.params && route.params.logoutUser === true) {
      navigation.navigate('SignIn');
    }

  }, [route.params])



  const dispatch = useDispatch()
  const mapRef = useRef();

  const trip = useSelector(state => state.trip);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const toggleDrawerHandler = () => {
    // The drawer should be toggled here
    navigation.openDrawer();
    // console.log('Drawer handler');
  }

  const onContinue = () => {
    if (!trip.destination || !trip.source) {
      Alert.alert('You are almost there','Please ensure that source and destination address are filled', null, { cancelable: true });
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

    const sourceAddress = `${name ?? ''}, ${street ?? ''}, ${city ?? ''}, ${country ?? ''}`;
    const sourceCord = { longitude, latitude };

    dispatch(changeSourceAddress( sourceAddress, sourceCord));

  }

   useEffect(() => {
      getLocation();
  }, []);

  const onMapLayout = () => {
    if(trip.sourceCoord){
      const { latitude } = trip.sourceCoord;
      const { longitude } = trip.sourceCoord;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      });
    }
  }

  StatusBar.setBarStyle("dark-content");
  StatusBar.setBackgroundColor("#fff");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
      <Title
        title={"start a moove"}
        fontIcon="side_menu"
        headerOptionHandler={toggleDrawerHandler}
        subTitle={"Your moove champion is one click away"}
        subTitleStyle={{ fontSize: normalize(22) }}
        style={styles.p18}
        containerStyle={styles.p18}
      />

      <View style={styles.content}>

      {(!trip || !trip.sourceCoord) ? <ActivityIndicator style={styles.spinner} />
        :
          <View>
            <View style={styles.p18}>
              <AddressField
                value={trip.source}
                label="You are Here:"
                event={changeSourceAddress}
                placeholder="enter source address"
                />
            </View>

            <View>

              <View style={styles.p18}>
              <Image source={require('./../../assets/search_icon.png')} style={styles.searchFont} />
                {/* <FontAwesome name='search' size={normalize(14)} style={styles.searchFont}  /> */}
                <GooglePlacesAutocomplete
                  placeholder='enter delivery address'
                  minLength={2}
                  onPress={(data, details = null) => {

                    // 'details' is provided when fetchDetails = true
                    const { lat: latitude, lng: longitude } = details.geometry.location;

                    const destinationAddress = data.description;

                    dispatch(changeDestinationAddress(destinationAddress,{ latitude, longitude }));
                  }}
                  getDefaultValue={() => trip.destination }
                  styles={{
                    listView: {
                      backgroundColor: '#EFEFEF',
                      position: 'absolute',
                      top: '100%',
                      zIndex: 500
                    },
                    textInputContainer: {
                      backgroundColor:'#fff',
                      marginBottom: normalize(15),
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      width: '100%'
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
                ref={mapRef}
                onLayout={onMapLayout}
                initialRegion={{
                  latitude: trip.sourceCoord.latitude,
                  longitude: trip.sourceCoord.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                }} >

                {trip.destinationCoord ? <Marker
                  coordinate={trip.destinationCoord}
                  title="Destination"
                  pinColor="blue"
                />:<></>
                }

                {trip.sourceCoord ? <Marker
                  coordinate={trip.sourceCoord}
                  title="Current Location"
                />:<></>
                }

                {(trip.sourceCoord && trip.destinationCoord) ?  <MapViewDirections
                  origin={{...trip.sourceCoord}}
                  destination={{...trip.destinationCoord}}
                  apikey={GOOGLE_PLACES_API_KEY}
                  strokeWidth={3}
                  strokeColor="#CE0303"
                />:<></>
                }
               

              </MapView>
            </View>
          </View>

        </View>
      }

      </View>
    <View style={styles.p18}>
      {!isKeyboardVisible &&
        <RedButton
          title="Request a Moove"
          buttonStyle={styles.button}
          onPress={onContinue} />
      }
    </View>

    </ScrollView>
  );
}

export default HomeScreen