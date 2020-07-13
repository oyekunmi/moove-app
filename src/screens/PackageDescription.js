import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, Button, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { normalize } from '../normalizeFont';
import { signOut, changePackageInfo } from '../redux/actions';
import AddressField from '../components/AddressField';
import RedButton from '../components/RedButton';
import Title from '../components/Title';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    backgroundColor: '#132535',
    flexGrow: 1,
  
  },
  packageContainer: {
  },
  label: {
    marginVertical: normalize(10),
    paddingHorizontal: normalize(15),
    fontFamily: 'Roboto_700Bold',
    color: "#FFF",
  },
  packageInput: {
    backgroundColor: "#e6e6e6",
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(20),
    alignSelf: "center",
    width: '100%',
  },
})

export default function PackageDescription({ navigation }) {
  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip)

  const onContinue = () => {
    if (!trip.package) {

      return;
    }
    dispatch(signOut())
  }

  return (
    <>
      <ScrollView ver style={styles.container} contentContainerStyle={{flexGrow:1}}>

        <Title
          showBackButton={true}
          title={"package description"}
          subTitle={"One more step. Enter your package description"}
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18), marginTop: normalize(10), }} />

        <View style={styles.content}>

          <AddressField
            defaultValue={trip.source}
            label="Pickup location"
            editable={false}
            labelStyle={{color: "#FFF"}}
            inputStyle={{color: "#D1D1D1"}}
            containerStyle={{backgroundColor:"#1E3040"}}
          />

          <AddressField
            defaultValue={trip.destination}
            label="Delivery address"
            editable={false} 
            labelStyle={{color: "#FFF"}}
            inputStyle={{color: "#D1D1D1"}}
            containerStyle={{backgroundColor:"#1E3040"}}
          />

          <View style={styles.packageContainer}>
            <Text style={styles.label}>Package Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={10}
              style={styles.packageInput}
              value={trip.package}
              onChangeText={text => dispatch(changePackageInfo(text))}
              autoFocus />
          </View>

          <RedButton
            title="Complete moove request"
            buttonStyle={styles.button}
            onPress={onContinue} />

        </View>

      </ScrollView>

    </>
  );

}