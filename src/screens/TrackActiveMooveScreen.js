import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, ScrollView,Alert, Linking, StatusBar, Text, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';
import { cancelTrip , getRiderLocation } from '../utils/helpers/api';
import { cancelTripRequest,isAppLoading, getRiderCoords } from '../redux/actions';
import PlainButton from '../components/PlainButton';

const styles = StyleSheet.create({
  container: {
  },
  map: {
    height: '80%'
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
    marginHorizontal: normalize(17),
    marginTop:normalize(5),
    marginBottom: normalize(18)
  },
  mapText: {
    color: '#545252',
    fontSize: normalize(13),
    lineHeight: normalize(15),
    textAlign: 'center',
    marginTop: normalize(18),
    fontFamily: 'Roboto_400Regular'
  },
  date:{
    marginTop: normalize(18),
  },
  mooveText:{
    color: '#181818',
    fontSize: normalize(15),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    marginTop: normalize(10),
  }
});

export default function TrackActiveMooveScreen({ navigation , route }) {

  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip);
  const common = useSelector(state => state.common);
  const origin = trip.riderCoords == null ? trip.sourceCoord : trip.riderCoords;
  const destination = trip.destinationCoord;
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / 320;
  const LATITUDE_DELTA = 0.015;
  const LONGITUDE_DELTA = 0.015;
  const tripId = trip.tripDetails.id;
  const riderId = trip.tripDetails.rider_id;
  
  
  // console.log(origin + 'in track');
  async function trackRiderLocation(){
    try{
      const response = await getRiderLocation(riderId,tripId);
      dispatch(getRiderCoords(response.data.data))
      console.log(response.data.data);
    } catch(error){
      // Alert.alert("Opps! hold on", "The rider is not enroute yet");
      console.log(error);
    }
  }
  
  useEffect(()=>{
    var request = setInterval(async ()=> await trackRiderLocation(), 60000)
    console.log(new Date())
    return () => clearInterval(request);
  },[]);

  const onCancelTripRequest = async () => {
    dispatch(isAppLoading(true));
    try{
      dispatch(cancelTripRequest());
      await cancelTrip(tripId,riderId);
     
    }
		catch(error){
      if (error.response && error.response.data.message) {
		      Alert.alert('Opps! sorry, ', error.response.data.message);
		  } else {
		    Alert.alert('An error has occurred', 'Network error, Please try again.');
      } 
    }
    dispatch(isAppLoading(false));
    navigation.push('Home')
  }

  const goHome = () => {
    navigation.navigate("Home")
  }

  StatusBar.setBarStyle("dark-content");
  StatusBar.setBackgroundColor("#fff");

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

            {origin ? <Marker coordinate={origin} />:<></> }
            {destination ? <Marker coordinate={destination} />:<></>}  
            {(origin&&destination)? <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_PLACES_API_KEY}
                strokeWidth={3}
                strokeColor="#CE0303"
              />:<></>
            }
            
              
            </MapView>
            <Text style={styles.mapText}>Your delivery is on its way</Text>
            <Text style={styles.mooveText}>Moove - MV{trip.tripDetails.moove_id}</Text>
            <Text style={styles.mapText}>{trip.tripDetails.created_at}</Text>
          </>
        }

      </View>
        <PlainButton
						title={common.isLoading ? 'Cancelling' : 'Cancel Moove'}
						titleStyle={{color:'#EA5858'}}
						onPress={onCancelTripRequest}
        />
        <PlainButton
						title ='Dashboard'
						titleStyle={{color:'#EA5858'}}
						onPress={goHome}
        />
        <RedButton
						title='Contact Moove Champion'
						buttonStyle={styles.button}
						onPress={() => Linking.openURL(`tel:${trip.riderDetails.riderPhone}`)}
					/>
    </ScrollView>
  );
}

