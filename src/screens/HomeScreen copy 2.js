import * as React from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Keyboard, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import AddressField from '../components/AddressField';
import { changeDestinationAddress, changeSourceAddress } from '../redux/actions';

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
});

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
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Title
        title={"start a moove"}
        subTitle={"Your moove champion is a click away"}
        subTitleStyle={{ fontSize: normalize(26) }}
        containerStyle={{ paddingHorizontal: normalize(18), }} />

      {(!trip || !trip.sourceCoord) ? <ActivityIndicator style={styles.spinner} />
        : 
        <>
          <View style={styles.content}>

            <AddressField
              value={trip.source}
              label="Pickup location"
              onChangeText={text => dispatch(changeSourceAddress(text))} />

            <AddressField
              value={trip.destination}
              label="Delivery Address"
              onChangeText={text => dispatch(changeDestinationAddress(text))}
            />

          </View>

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
        </>
      }

      {!isKeyboardVisible &&
        <RedButton
          title="Request a moove"
          buttonStyle={styles.button}
          onPress={onContinue} />
      }

    </ScrollView>
  );
}

export default HomeScreen