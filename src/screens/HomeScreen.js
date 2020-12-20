import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Keyboard, ScrollView, StatusBar, Alert } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import SourceAddress from '../components/SourceAddress';
import DeliveryAddress from '../components/DeliveryAddress';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';
import MapViewDirections from 'react-native-maps-directions';

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
  button: {
    marginTop: normalize(33),
    marginBottom: normalize(12),
    width: '100%'
  }
});

function HomeScreen({ navigation, route }) {

  useEffect(() => {
    if (route.params && route.params.logoutUser === true) {
      navigation.navigate('SignIn');
    }

  }, [route.params])

  // const mapRef = useRef();

  const sourceCoord = useSelector(state => state.trip.sourceCoord);
  const destinationCoord = useSelector(state => state.trip.destinationCoord);
  
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const toggleDrawerHandler = () => {
    navigation.openDrawer();
  }

  const onContinue = () => {
    if (!sourceCoord || !destinationCoord) {
      Alert.alert('You are almost there', 'Please ensure that source and destination address are filled', null, { cancelable: true });
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

        <View>
          <View style={styles.p18}>
            <SourceAddress />
          </View>
          <View style={styles.p18}>
            <DeliveryAddress />
          </View>
          <MapView style={styles.map}
            loadingEnabled={true}
            showsUserLocation = {true}
            region={{
              latitude: sourceCoord?.latitude?? 6.5244,
              longitude: sourceCoord?.longitude?? 3.3792,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }} >

            {sourceCoord ? <Marker coordinate={sourceCoord} title="Pickup Location" />:<></>}
            {destinationCoord ? <Marker coordinate={destinationCoord} title="Delivery Location" pinColor="blue" />:<></>}
            {(sourceCoord && destinationCoord) ? <MapViewDirections origin={{...sourceCoord}} destination={{...destinationCoord}} apikey={GOOGLE_PLACES_API_KEY} strokeWidth={3} strokeColor="#CE0303" />:<></>}
          
          </MapView>
        </View>

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