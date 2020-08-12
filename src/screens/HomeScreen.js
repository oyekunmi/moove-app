import * as React from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Keyboard, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import AddressField from '../components/AddressField';
import {  changeSourceAddress } from '../redux/actions';

const styles = StyleSheet.create({
  container: {
  },
  map: {
    flexGrow: 1,
  },
  spinner: {
    flexGrow: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  content: {
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
    left: normalize(17),
    top: normalize(8)
  }
});

const toggleDrawerHandler = () => {
  // The drawer should be toggled here
  console.log('Drawer handler');
}

function HomeScreen({ navigation }) {

  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip)
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const onContinue = () => {
    if (!trip.destination) {
      return;
    }
    navigation.navigate('PackageDescription')
  }

  React.useEffect(() => {

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

  React.useEffect(() => {

    let getLocation = (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
      }
      console.log("getting location");

      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }).then(locationData => {
        Location.reverseGeocodeAsync({ latitude: locationData.coords.latitude, longitude: locationData.coords.longitude }).then(locationAddress => {
          const geoAddress1 = locationAddress[0];
          dispatch(changeSourceAddress(`${geoAddress1.name}, ${geoAddress1.street}, ${geoAddress1.city}, ${geoAddress1.country}`, locationData.coords));
        })
      });
    });

    if (!trip || !trip.source || !trip.sourceCoord) {
      getLocation();
    }

  }, [trip]);


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
        <>
          <View style={styles.content}>

            <AddressField
              value={trip.source}
              label="You are Here:"
              isEditable={true}
              containerStyle={{ height: normalize(71) }}
              onChangeText={text => dispatch(changeSourceAddress(text))} />

            <View>
              <FontAwesome name='search' size={normalize(14)} style={styles.searchFont}  />
             <GooglePlacesAutocomplete
              placeholder='enter delivery address'
              minLength={2}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
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
                key: 'AIzaSyDl2ismTJL7qQveLJM9UlL-Ai6ixpQXQdw',
                language: 'en',
              }}
              fetchDetails={true}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={200}
            />
            </View>

          </View>
          <View style={{ height: '40%'}}>
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
        </>
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