import React from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'; 
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import currency from '../currency';
import AddressField from '../components/AddressField';
import SourceAddress from '../components/SourceAddress';
import DeliveryAddress from '../components/DeliveryAddress';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132535',
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
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
  costContainer: {
    alignItems: "center",
    marginVertical: normalize(20),
  },
  packageContainer: {
    justifyContent: "center", 
    flexGrow:1
  },
  costLabel: {
    color: "#908F8F",
    fontFamily: 'Roboto_700Bold',
    // marginVertical: normalize(5),
  },
  costValue: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(32),

  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(5),
    alignSelf: "center",
    width: '100%',
  },
  cancelButtonStyle: {
    fontFamily: 'Roboto_700Bold',
    color: "#FFF",
  },

  radioButton: {
    borderRadius: normalize(50),
    backgroundColor: "#253A4D",
    color: "#FFF",
    padding: normalize(10),
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
})

export default function ActiveMooveDetailsScreen({ navigation }) {
  const trip = useSelector(state => state.trip)

  const onContinue = () => {
    navigation.navigate("TrackActiveMoove")
  }

  var radio_props = [
    { label: 'CASH', value: 0 },
    { label: 'VISA/MASTERCARD', value: 1 }
  ];

  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor("#132535");
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <Title
          showBackButton={true}
          statusBarStyle="light-content"
          title={"active moove"}
          subTitle={"Your moove champion is enroute for pickup"}
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18) }} />

        <View style={styles.content}>

          <View style={styles.costContainer}>
            <Text style={styles.costLabel}> Bayo Dejo </Text>
            <Text style={styles.costValue}>08022233344</Text>
            <Text style={styles.costLabel }>Tap to call</Text>
          </View>

          <View style={styles.packageContainer}>

          <SourceAddress />

          <DeliveryAddress />
          
          <AddressField
            defaultValue={trip.package}
            label="Delivery item(s) description"
            editable={false}
            multiline={true}
            // numberOfLines={5}
            textAlignVertical="top"
            labelStyle={{ color: "#FFF" }}
            inputStyle={{ color: "#D1D1D1" }}
            containerStyle={{ backgroundColor: "#1E3040" }}
          />
        </View>
          <RedButton title="Track moove" buttonStyle={styles.button} onPress={onContinue} />

        </View>

      </ScrollView>
    </>
  );

}