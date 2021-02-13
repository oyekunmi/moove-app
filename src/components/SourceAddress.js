import React, {useEffect} from 'react';
import AddressField from './AddressField';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { normalize } from '../normalizeFont';
import { changeSourceAddress } from '../redux/actions';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  label: {
    // color: "#FFF",
  },
  input: {
    color: "#D1D1D1",
  },
  container:{
    backgroundColor: "#1E3040",
    height: normalize(71),
  },
})



export default function SourceAddress(props) {

  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip);

  const useDarkContent = props.theme === "dark-content";
  let labelStyle = [styles.label, useDarkContent ? {color: "#000"}: {}]
  let containerStyle = [styles.container, useDarkContent? {backgroundColor: "#efefef"}: {}]
  let inputStyle = [styles.input, useDarkContent? {color: "#000"}: {}]

  // if(props.theme){

  // }

  const getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();

    console.log(status)

    if (status !== 'granted') {
      Alert.alert('An error has occurred', 'Permission to access location was denied', null, { cancelable: true });
    }

    const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const [ { name, street, city, country} ] = await Location.reverseGeocodeAsync({ ...currentLocation.coords });
    const sourceAddress = `${name ?? ''}, ${street ?? ''}, ${city ?? ''}, ${country ?? ''}`;
    dispatch(changeSourceAddress( sourceAddress, currentLocation.coords));
  }

  
  useEffect(() => {
    if(!trip.source)
      getLocation();
  }, []);

  return (
    <AddressField
      defaultValue={trip.source}
      label="Pickup location"
      placeholder="Enter pickup address"
      editable={props.editable??false}
      labelStyle={labelStyle}
      inputStyle={inputStyle}
      containerStyle={containerStyle}
      event={changeSourceAddress}
    />
  )
}