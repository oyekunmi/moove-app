import * as React from 'react';
import { Button, View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/actions';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import RedButton from '../components/RedButton';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-"
  },
  map: {
    flex: 4,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  spinner: {
    flex: 4,
    alignSelf: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: normalize(18),
    marginTop: normalize(20),
  },
  source: {
    backgroundColor: "#e6e6e6",
    borderRadius: normalize(20),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    marginBottom: normalize(10),
  },
  sourceTitle: {
    fontFamily: 'Roboto_700Bold',
  },
  contentInput: {
    // backgroundColor: 'red',
    // borderRadius: normalize(20),
    // height: normalize(40),
    // fontSize: normalize(14),
    // paddingHorizontal: normalize(10),
    // marginVertical: normalize(5),

  },
  button: {
    position: 'absolute',
    left: normalize(18),
    right: normalize(18),
    bottom: normalize(10),
    width: '90%',
  },
})

function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const [location, setLocation] = React.useState(null);
  const [sourceAddress, setSourceAddress] = React.useState("");
  const [deliveryAddress, setDeliveryAddress] = React.useState("");
  const [geoAddress, setGeoAddress] = React.useState(null);

  React.useEffect(() => {
    console.log("run on load");
    
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }).then(locationData=>{
        setLocation(locationData)
        Location.reverseGeocodeAsync({ latitude: locationData.coords.latitude, longitude: locationData.coords.longitude }).then(locationAddress=>{
          setGeoAddress(locationAddress[0]);
          const geoAddress1 = locationAddress[0];
          setSourceAddress(`${geoAddress1.name}, ${geoAddress1.street}, ${geoAddress1.city}, ${geoAddress1.country}`);
        })
      }); 
    })();

  }, []); 

  console.log("aa" + sourceAddress);

  return (
    <View style={styles.container}>
      <Title
        title={"start a moove"}
        subTitle={"Your moove champion is a click away"}
        subTitleStyle={{ fontSize: normalize(26) }}
        containerStyle={{ paddingHorizontal: normalize(18), }} />

      {(!location || !geoAddress) ? <ActivityIndicator style={styles.spinner} />
        :
        <>
          <View style={styles.content}>
            <View style={styles.source}>
              <Text style={styles.sourceTitle}>Pickup location</Text>
              <TextInput
                style={styles.contentInput}
                value={sourceAddress}
                onChangeText={setSourceAddress}
              />
            </View>
            <View style={styles.source}>
              <Text style={styles.sourceTitle}>Delivery Address</Text>
              <TextInput
                style={styles.contentInput}
                value={deliveryAddress}
                onChangeText={setDeliveryAddress}
                autoFocus
              />
            </View>
          </View>
          <MapView style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }} >
            <Marker
              coordinate={location.coords}
              title="My location"
              description="My location 2"
            />
          </MapView>
        </>}

      <RedButton
        title="Request a moove"
        buttonStyle={styles.button}
        // onPress={() => dispatch(signOut())} />
        onPress={() => navigation.navigate('PackageDescription') } />

    </View>
  );
}

export default HomeScreen