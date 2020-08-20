import React from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { setSourceCoordinates } from '../redux/actions';
import { normalize } from '../normalizeFont';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';

const styles = StyleSheet.create({

  container: {
    // backgroundColor: "#EFEFEF",
    borderRadius: normalize(20),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    marginBottom: normalize(10),
    position: 'relative',
    display: 'flex',
    // justifyContent: 'center'
  },
  label: {
    fontFamily: 'Roboto_500Medium',
    color: '#181818',
    fontSize: normalize(14),
    lineHeight: normalize(16),
    position: 'absolute',
    zIndex: 2,
    top: normalize(15),
    left: normalize(15)
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center'
  },
  input: {
    color: '#545252',
    fontFamily: 'Roboto_400Regular',
    fontSize: normalize(13),
    lineHeight: normalize(15),
  },

})

const AddressField = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <View>
        {props.label && <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>}
      </View>

        <GooglePlacesAutocomplete
          placeholder='enter source address'
          minLength={2}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // const { lat: latitude, lng: longitude } = details.geometry.location;
            // dispatch(setSourceCoordinates({ latitude, longitude }))
            const { lat: latitude, lng: longitude } = details.geometry.location;

            const sourceAddress = data.description;

            dispatch(props.event( sourceAddress, { latitude, longitude }));

          }}
          getDefaultValue={() => props.value}
          styles={{
            listView: {
              zIndex: 500,
              backgroundColor: '#EFEFEF',
              position: 'absolute',
              top: '95%',
              zIndex: 500
            },
            textInputContainer: {
              backgroundColor:'#EFEFEF',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              height: normalize(80),
              display: 'flex',
              borderRadius: normalize(20),
              paddingHorizontal: normalize(10),
              marginBottom: normalize(6),
              // position: 'absolute',
              width: '100%',
            },
            textInput: {
              alignSelf: 'flex-end',
              marginBottom: normalize(8),
              backgroundColor: "#EFEFEF",
              height: normalize(37),
              color: '#545252',
              fontSize: normalize(13),
              paddingLeft: 0,
            },
          }}
          query={{
            key: `${GOOGLE_PLACES_API_KEY}`,
            language: 'en',
          }}
          fetchDetails={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={200}
        />
    </>
  )
}

export default AddressField;