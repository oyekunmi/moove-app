import React from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar, ScrollView, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132535',
    paddingTop: normalize(30)
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
  phoneContainer: {
    alignItems: "center",
    marginTop: normalize(20),
    marginBottom: normalize(30),
  },
  packageContainer: {
    flexGrow:1
  },
  nameLabel: {
    color: "#908F8F",
    fontFamily: 'Roboto_900Black',
    fontSize: normalize(15),
    lineHeight: normalize(15)
  },
  telLabel: {
    color: '#918F8F',
    fontSize: normalize(13),
    fontFamily: 'Roboto_400Regular',
    lineHeight: normalize(15),
  },
  phone: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(44),
    fontWeight: 'bold',
    paddingTop: normalize(10)
  },
  button: {
    alignSelf: "center",
    width: '100%',
  },
  cancelButtonStyle: {
    fontFamily: 'Roboto_700Bold',
    color: "#FFF",
  },

  locationDetails: {
    height: normalize(155),
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
    paddingHorizontal: normalize(14),
    paddingTop: normalize(30),
    paddingBottom:normalize(35)
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
  },
  DeliveryItemDescription: {
    height: normalize(71),
    backgroundColor: '#1E3040',
    borderRadius: normalize(15),
    paddingTop: normalize(10),
    paddingBottom:normalize(35)
  },
  packageDescriptionLabel: {
    color: '#DADADA',
    fontSize: normalize(14),
    fontFamily: 'Roboto_500Medium',
    paddingHorizontal: normalize(14),
    fontWeight: 'bold',
  },
  packageDescriptionInput: {
    marginHorizontal: normalize(14),
    color: '#D1D1D1',
    fontSize: normalize(13),
    fontWeight: 'normal',
  },
  mb9: {
    marginBottom: normalize(9),
  }
})

export default function ActiveMooveDetailsScreen({ navigation }) {
  const trip = useSelector(state => state.trip);
  const auth = useSelector(state => state.auth);
  const riderName = trip.riderDetails.riderName;
  const riderPhone = trip.riderDetails.riderPhone;
  const mooveId = trip.mooveId;
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
          subTitle={"Your moove champion is enroute"}
          subTitleStyle={{ fontSize: normalize(22), paddingTop:normalize(10) }}
          titleStyle={{paddingTop:normalize(10)}}
          containerStyle={{ paddingHorizontal: normalize(18) }} />

        <View style={styles.content}>

          <View style={styles.phoneContainer}>
            <Text style={styles.nameLabel}>Champion: {riderName} </Text>
            <Text style={styles.phone}>{riderPhone}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${auth.phone}`)}>
              <Text style={styles.telLabel }>tap to call or text</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.packageContainer, styles.mb9]}>

          <View style={[styles.locationDetails, styles.mb9]}>
            <View style={styles.pickUpandDelivery}>
              <Text style={styles.pickupAndLocationLabel}>Pick-up Location</Text>
              <Text style={styles.pickUpAndLocationDetails}>{trip.source}</Text>
            </View>
            <View style={styles.pickUpandDelivery}>
            <Text style={styles.pickupAndLocationLabel} >Delivery Location</Text>
            <Text style={styles.pickUpAndLocationDetails}>{trip.destination}</Text>
            </View>
          </View>


          <View style={styles.DeliveryItemDescription}>
            <Text style={styles.packageDescriptionLabel}>Delivery Item(s) Description</Text>
            <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.packageDescriptionInput}
                value={trip.package}
                editable={false} />
          </View>
        </View>

          <RedButton
            title="Track Moove Request"
            buttonStyle={styles.button}
            onPress={onContinue}
          />

        </View>

      </ScrollView>
    </>
  );

}