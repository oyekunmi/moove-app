import React from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import AddressField from '../components/AddressField';

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
    fontFamily: 'Roboto_900Black',
    fontSize: normalize(13),
    lineHeight: normalize(15)
  },
  costValue: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(44),

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
  locationDetails: {
    height: normalize(146),
    marginBottom: normalize(7),
    borderRadius: normalize(15),
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#1E3040'
  },
  pickUpandDelivery: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: normalize(14)
  },
  pickupAndLocationLabel: {
    fontSize: normalize(14),
    fontFamily: 'Roboto_500Medium',
    color: '#DADADA',
    marginBottom: normalize(10)
  },
  pickUpAndLocationDetails: {
    fontSize: normalize(13),
    color: '#D1D1D1',
    fontFamily: 'Roboto_400Regular',
    lineHeight: normalize(15)
  }
})

export default function ActiveMooveDetailsScreen({ navigation }) {
  const trip = useSelector(state => state.trip)

  const onContinue = () => {
    navigation.navigate("TrackActiveMoove")
  }

  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor("#132535");
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <Title
          showBackButton={true}
          statusBarStyle="light-content"
          title={"active moove"}
          orderId={"Moove - MV100002"}
          fontIcon={{
						name: 'long-arrow-left',
						color: '#ffffff',
						size: 14,
					}}
					headerOptionHandler={() => navigation.goBack()}
          subTitle={"Your moove champion is enroute for pickup"}
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18) }} />

        <View style={styles.content}>

          <View style={styles.costContainer}>
            <Text style={styles.costLabel}>Champion: {"John Boye"} </Text>
            <Text style={styles.costValue}>{"08022233344"}</Text>
            <Text style={styles.costLabel }>Tap to call or text</Text>
          </View>

          <View style={styles.packageContainer}>

          <View style={styles.locationDetails}>
            <View style={styles.pickUpandDelivery}>
              <Text style={styles.pickupAndLocationLabel}>Pick-up Location</Text>
              <Text style={styles.pickUpAndLocationDetails}>Alhaji Masha street, Surulere, Lagos</Text>
            </View>
            <View style={styles.pickUpandDelivery}>
            <Text style={styles.pickupAndLocationLabel} >Delivery Location</Text>
              <Text style={styles.pickUpAndLocationDetails}>43 Saka Tinubu Street, Victoria Island, Lagos</Text>
            </View>
          </View>

          <AddressField
            defaultValue={trip.package}
            label="Delivery item(s) Description"
            editable={false}
            multiline={true}
            textAlignVertical="top"
            labelStyle={{ color: "#FFF", marginBottom: normalize(10) }}
            inputStyle={{ color: "#D1D1D1" }}
            containerStyle={{ backgroundColor: "#1E3040", height: normalize(71) }}
          />
        </View>
          <RedButton title="Track Moove Request" buttonStyle={styles.button} onPress={onContinue} />

        </View>

      </ScrollView>
    </>
  );

}