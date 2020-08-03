import React from 'react';
import AddressField from './AddressField';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  label: {
    color: "#FFF",
  },
  input: {
    color: "#D1D1D1",
  },
  container:{
    backgroundColor: "#1E3040",
  },
})

export default function DeliveryAddress(props) {
  const trip = useSelector(state => state.trip);
  const useDarkContent = props.theme === "dark-content";

  let labelStyle = [styles.label, useDarkContent ? {color: "#000"}: {}]
  let containerStyle = [styles.container, useDarkContent? {backgroundColor: "#efefef"}: {}]
  let inputStyle = [styles.input, useDarkContent? {color: "#000"}: {}]

  if(props.theme){

  }

  return (
    <AddressField
      defaultValue={trip.destination}
      label="Delivery address"
      isEditable={true}
      editable={props.editable??false}
      labelStyle={labelStyle}
      inputStyle={inputStyle}
      containerStyle={containerStyle}
    />
  )
}