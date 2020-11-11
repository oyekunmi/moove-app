import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, ScrollView,Alert, Linking, StatusBar, Text, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';
import { cancelTrip } from '../utils/helpers/api';
import { cancelTripRequest } from '../redux/actions';
import PlainButton from '../components/PlainButton';

const styles = StyleSheet.create({
  container: {
  },
  map: {
    height: '73%'
  },
  spinner: {
    flexGrow: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  button: {
    marginHorizontal: normalize(18)
  },
  mapText: {
    color: '#545252',
    fontSize: normalize(13),
    lineHeight: normalize(15),
    textAlign: 'center',
    marginTop: normalize(20),
    fontFamily: 'Roboto_400Regular'
  },
  mooveText:{
    color: '#545252',
    fontSize: normalize(13),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    marginTop: normalize(10),
  }
});

export default function TrackActiveMooveScreen({ navigation }) {

  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip);
  const origin = trip.sourceCoord;
  const destination = trip.destinationCoord;
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / 320;
  const LATITUDE_DELTA = 0.015;
  const LONGITUDE_DELTA = 0.015;
  const tripId = trip.tripDetails.id;
  const riderId = trip.tripDetails.rider_id;
  
  const onCancelTripRequest = async () => {
    try{
      await cancelTrip(tripId,riderId);
      dispatch(cancelTripRequest())
    }
		catch(error){
		  console.log('in catch')
		  if (error.response) {
		    console.log('i have a response')
		    if(error.response.data.message){
		      console.log('i have an error message :')
		      console.log(error.response.data)
		      Alert.alert('Opps! sorry, ', error.response.data.message);
		    }	
		  } else if (error.request) {
		    console.log(error.request);
		    Alert.alert('An error has occurred', 'Network error, Please try again.');
		  } else {
		    console.log('Error', error.message);
		    Alert.alert('An error has occurred', error.message);
		  }
	
		}
    navigation.push('Home')
  }


  StatusBar.setBarStyle("dark-content");
  StatusBar.setBackgroundColor("#fff");
  console.log(trip.sourceCoord);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

      <View style={styles.content}>

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
                apikey={GOOGLE_PLACES_API_KEY}
                strokeWidth={3}
                strokeColor="#CE0303"
              />
            </MapView>
            <Text style={styles.mapText}>Your delivery is on its way</Text>
            <Text style={styles.mooveText}>Moove - MV{trip.mooveId}</Text>
            <Text style={styles.mapText}>{trip.date}</Text>
          </>
        }

      </View>
        <PlainButton
						title='Cancel'
						titleStyle={{color:'#EA5858'}}
						onPress={onCancelTripRequest}
        />
        <RedButton
						title='Contact Moove Champion'
						buttonStyle={styles.button}
						onPress={() => Linking.openURL(`tel:${trip.riderDetails.riderPhone}`)}
					/>
    </ScrollView>
  );
}

