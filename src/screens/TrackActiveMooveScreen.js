import * as React from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, ScrollView, StatusBar, Dimensions } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import MapViewDirections from 'react-native-maps-directions';

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

export default function TrackActiveMooveScreen({ navigation }) {

  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip)
  const origin = { latitude: 25.198259699999998, longitude: 55.2590468, };
  const destination = { latitude: 25.1970924, longitude: 55.2790356, };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDl2ismTJL7qQveLJM9UlL-Ai6ixpQXQdw';
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / 320;
  const LATITUDE_DELTA = 0.015;
  const LONGITUDE_DELTA = 0.015;

  StatusBar.setBarStyle("dark-content");
  StatusBar.setBackgroundColor("#fff");
  console.log(trip.sourceCoord);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Title
        showBackButton={true}
        title={"active moove"}
        subTitle={"Champion enroute to pickup location"}
        subTitleStyle={{ fontSize: normalize(26) }}
        containerStyle={{ paddingHorizontal: normalize(18), }} />

      {(!trip || !trip.sourceCoord) ? <ActivityIndicator style={styles.spinner} />
        :
        <>
          <MapView style={styles.map}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }} >
            <Marker
              coordinate={origin}
            />
            <Marker
              coordinate={destination}
            />

            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          </MapView>
        </>
      }

    </ScrollView>
  );
}

