import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { normalize } from '../normalizeFont';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';

navigator.geolocation = require('react-native-geolocation-service');

const styles = StyleSheet.create({

  container: {
    borderRadius: normalize(20),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    marginBottom: normalize(10),
    position: 'relative',
    display: 'flex',
  },
  label: {
    fontFamily: 'Roboto_500Medium',
    color: '#181818',
    fontSize: normalize(14),
    lineHeight: normalize(16),
    position: 'absolute',
    zIndex: 2,
    top: normalize(15),
    left: normalize(15),
  }
})

const AddressField = (props) => {
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(props.value || props.defaultValue);
  }, [props.value, props.defaultValue]);

  return (
    <>
      <View>
        {props.label && <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>}
      </View>

      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={props.placeholder}
        minLength={2}
        editable={props.editable ?? true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true

          const { lat: latitude, lng: longitude } = details.geometry.location;

          const address = data.description;

          dispatch(props.event(address, { latitude, longitude }));

        }}
        styles={{
          listView: {
            zIndex: 500,
            backgroundColor: '#EFEFEF',
            position: 'absolute',
            top: '95%',
            zIndex: 500,
          },
          textInputContainer: {
            backgroundColor: props.customStyle ? props.customStyle.backgroundColor : '#EFEFEF',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            height: normalize(80),
            display: 'flex',
            borderRadius: normalize(20),
            marginBottom: normalize(6),
            paddingLeft: normalize(8),
            width: '100%',
          },
          textInput: {
            alignSelf: 'flex-end',
            marginBottom: normalize(8),
            backgroundColor: props.customStyle ? props.backgroundColor : '#EFEFEF',
            color: props.customStyle ? props.customStyle.color : '#545252',
            fontSize: normalize(13),
            height: normalize(37),
            paddingLeft: normalize(10),

          },
        }}
        query={{
          key: `${GOOGLE_PLACES_API_KEY}`,
          language: 'en',
          components: 'country:ng',
        }}
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
        // currentLocation={true}
        //currentLocationLabel='Current location'
      />
    </>
  )
}

export default AddressField;